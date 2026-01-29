from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import uuid
from db import db, cursor

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_photo():
    title = request.form.get("title")
    image = request.files.get("image")

    if not title or not image:
        return jsonify({"error": "Title and image required"}), 400

    if not allowed_file(image.filename):
        return jsonify({"error": "Invalid file type"}), 400

    ext = image.filename.rsplit(".", 1)[1]
    unique_name = f"{uuid.uuid4()}.{ext}"
    filename = secure_filename(unique_name)

    image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    cursor.execute(
        "INSERT INTO photos (title, image) VALUES (%s, %s)",
        (title, filename)
    )
    db.commit()

    return jsonify({"message": "Photo uploaded successfully"})

@app.route("/photos", methods=["GET"])
def get_photos():
    cursor.execute("SELECT * FROM photos ORDER BY id DESC")
    return jsonify(cursor.fetchall())

@app.route("/images/<filename>")
def serve_image(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_photo(id):
    cursor.execute("SELECT image FROM photos WHERE id=%s", (id,))
    photo = cursor.fetchone()

    if photo:
        image_path = os.path.join(app.config["UPLOAD_FOLDER"], photo["image"])
        if os.path.exists(image_path):
            os.remove(image_path)

    cursor.execute("DELETE FROM photos WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Photo deleted"})

if __name__ == "__main__":
    app.run(debug=True)

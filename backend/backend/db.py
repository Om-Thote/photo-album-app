import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",   # change if needed
    database="photo_album"
)

cursor = db.cursor(dictionary=True)

import { useEffect, useState } from "react";
import api from "./api";

interface Photo {
  id: number;
  title: string;
  image: string;
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const fetchPhotos = async () => {
    const res = await api.get<Photo[]>("/photos");
    setPhotos(res.data);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Title and image required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    await api.post("/upload", formData);
    setTitle("");
    setImage(null);
    fetchPhotos();
  };

  const deletePhoto = async (id: number) => {
    await api.delete(`/delete/${id}`);
    fetchPhotos();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        📸 Photo Album
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="
          max-w-xl mx-auto bg-white p-4 rounded shadow 
          flex flex-col sm:flex-row gap-3 mb-8
        "
      >
        <input
          type="text"
          placeholder="Photo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full sm:flex-1"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded w-full sm:w-auto"
        />

        <button
          type="submit"
          className="
            bg-blue-600 text-white px-4 py-2 rounded
            hover:bg-blue-700 transition
            w-full sm:w-auto
          "
        >
          Upload
        </button>
      </form>

      {/* Gallery */}
      <div className="
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      ">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded shadow overflow-hidden"
          >
            <img
              src={`http://localhost:5000/images/${photo.image}`}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-3 flex flex-col gap-2">
              <h3 className="font-semibold text-center truncate">
                {photo.title}
              </h3>

              <button
                onClick={() => deletePhoto(photo.id)}
                className="
                  text-red-600 border border-red-500
                  rounded py-1 hover:bg-red-50
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

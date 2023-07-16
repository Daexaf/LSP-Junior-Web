import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/utils";
import { useNavigate, useParams } from "react-router-dom";

const EditArtikel = ({ artikelId }) => {
  const { id } = useParams();
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getArtikel();
  }, []);

  const getArtikel = () => {
    axios
      .get(API_URL + `/artikel/${id}`)
      .then((res) => {
        const { judul, content } = res.data.artikelData;
        setJudul(judul);
        setContent(content);
        setLoading(false);
        //   console.log(judul, "ini res");
        //   console.log(content, "ini contentnya");
      })
      .catch((error) => {
        console.error("Terjadi kesalahan dalam mengambil artikel:", error);
        setLoading(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    let updatedGambar =
      typeof gambar === "string" ? gambar.replace(/\\/g, "\\\\") : gambar;

    const formData = new FormData();
    formData.append("gambar", updatedGambar);
    formData.append("judul", judul);
    formData.append("content", content);

    console.log(updatedGambar, "updated gambar");

    axios
      .put(API_URL + `/artikel/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Berhasil memperbarui artikel
        console.log("Artikel berhasil diperbarui:", res.data);
      })
      .catch((error) => {
        // Menangani error jika terjadi kesalahan saat memperbarui artikel
        console.error("Terjadi kesalahan saat memperbarui artikel:", error);
      });
    // navigate("/home");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <section>
          <div className="w-full bg-sky-500 text-black flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold text-slate-950 p-10 bg-yellow-500">
              Edit Artikel
            </h1>
            <div className="max-w-2xl bg-white rounded-lg overflow-hidden shadow-md w-full">
              {" "}
              {/* Ubah max-w-xl menjadi max-w-2xl */}
              <form onSubmit={handleUpdate} className="p-4">
                <div className="mb-4">
                  <label htmlFor="judul" className="font-bold">
                    Judul Artikel:
                  </label>
                  <input
                    type="text"
                    id="judul"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                    className="bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="gambar" className="font-bold">
                    Gambar Artikel:
                  </label>
                  <input
                    type="file"
                    id="gambar"
                    onChange={(e) => setGambar(e.target.files[0])}
                    className="bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="font-bold">
                    Content Artikel:
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1 w-full h-48"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update Artikel
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditArtikel;

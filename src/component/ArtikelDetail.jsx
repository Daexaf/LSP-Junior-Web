// Import library dan model
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/utils";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

// Komponen ArtikelDetail
const ArtikelDetail = (props) => {
  const [data, setData] = useState();
  const [gambar, setGambar] = useState();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [id_A, setId_A] = useState();
  const { id } = useParams();
  const [komentarData, setKomentarData] = useState([]);
  const [role, setRole] = useState("");

  // Fungsi useEffect untuk mendapatkan data artikel dan komentar dari server saat komponen ini dipasang
  useEffect(() => {
    getArtikel();
    fetchKomentar();
    setRole(localStorage.getItem("role"));
  }, []);

  const isAdmin = localStorage.getItem("role") === "admin";
  // Fungsi untuk mendapatkan data komentar dari server menggunakan axios
  const fetchKomentar = () => {
    axios
      .get(API_URL + `/komentars/${id}`)
      .then((res) => {
        const komentarData = res.data.komentarData;
        setKomentarData(komentarData);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan dalam mengambil komentar:", error);
      });
  };

  // Fungsi untuk mendapatkan data artikel dari server menggunakan axios
  const getArtikel = () => {
    axios.get(API_URL + `/artikel/${id}`).then((res) => {
      console.log(res);
      const ambilData = res.data.artikelData;
      const ambilGambar = res.data.artikelData.gambar;
      setData(ambilData);
      setId_A(ambilData.id);
      setGambar(API_URL + "/" + ambilGambar.replace(/\\/g, "/"));
    });
  };
  // Fungsi untuk mengubah data gambar menjadi URL yang valid
  const imageUrl = gambar ? decodeURIComponent(gambar) : "";
  const id_artikel = id_A;

  // Fungsi untuk menangani submit form komentar
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      id_artikel: id_artikel,
      nama,
      email,
      comment,
    };

    axios
      .post(API_URL + "/komentars", commentData)
      .then((res) => {
        console.log("Komentar berhasil dikirim:", res.data);
        setNama("");
        setEmail("");
        setComment("");

        fetchKomentar();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengirim komentar:", error);
      });
  };

  //fungsi hapus komentar
  const handleDeleteComment = (komentarId) => {
    axios
      .delete(API_URL + `/komentars/${komentarId}`)
      .then((res) => {
        console.log("Komentar berhasil dihapus:", res.data);
        // Jika penghapusan berhasil, Anda dapat memperbarui daftar komentar dengan mengambil ulang data dari server
        fetchKomentar();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus komentar:", error);
      });
  };

  // Render tampilan komponen
  return (
    <>
      <Navbar />
      <div className="h-full flex flex-col mt-10">
        {data ? (
          <section>
            <div className="w-full bg-sky-500 text-black flex flex-col justify-center items-center">
              <h1 className="text-5xl font-bold text-slate-950 p-10 bg-yellow-500">
                {data?.judul}
              </h1>
              <div className="img">
                <img
                  className="max-w-sm rounded-lg shadow-2xl mb-10"
                  src={imageUrl}
                  alt={data.judul}
                />
              </div>
              <p className="py-6 text-xl text-slate-950">{data?.content}</p>
            </div>

            <div className="w-full bg-green-300 text-black flex flex-col items-center pt-8 h-full">
              {!isAdmin && (
                <div>
                  {showForm ? (
                    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-md p-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="nama" className="font-bold">
                            Nama:
                          </label>
                          <input
                            type="text"
                            id="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                            className="bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="email" className="font-bold">
                            Email:
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="komentar" className="font-bold">
                            Komentar:
                          </label>
                          <textarea
                            id="komentar"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            className="bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Kirim Komentar
                        </button>
                      </form>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Tambah Komentar
                    </button>
                  )}
                </div>
              )}

              <h2 className="text-2xl font-bold mt-8">Komentar</h2>
              <div className="mt-4 space-y-4">
                {komentarData?.map((komentar, index) => (
                  <div
                    key={komentar.id}
                    className={`bg-white rounded-lg shadow-md p-4 text-xl ${
                      index !== komentarData.length - 1 ? "mb-4" : ""
                    }`}
                  >
                    <p className="font-bold text-xl">{komentar.nama}</p>
                    <p className="text-gray-500 text-xl">{komentar.email}</p>
                    <p className="text-xl">
                      {komentar.comment === "undefined" ? "" : komentar.comment}
                    </p>
                    {isAdmin && ( // Hanya tampilkan tombol Hapus jika admin yang login
                      <button
                        className="text-red-600 font-medium mt-2"
                        onClick={() => handleDeleteComment(komentar.id)}
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ArtikelDetail;

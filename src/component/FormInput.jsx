// Import library dan komponen
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../utils/utils";

// Komponen FormInput
const FormInput = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    judul: "",
    content: "",
    gambar: "",
  });
  console.log(content, "ini isi kontennya");

  // Fungsi untuk mengirim data artikel ke server
  const handleInput = () => {
    const formData = new FormData();
    formData.append("judul", content.judul);
    formData.append("content", content.content);
    formData.append("gambar", content.gambar);

    axios
      .post(API_URL + "/input", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/home");
    window.location.reload();
  };

  // Render form input artikel
  return (
    <div className="container p-10">
      <h2 className="text-center text-3xl">Halaman Input Artikel</h2>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Masukkan Judul Artikel
        </label>
        <input
          type="text"
          id="judul"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => {
            setContent({ ...content, judul: e.target.value });
          }}
        />
      </div>

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Isi Artikel
      </label>
      <textarea
        id="message"
        rows="4"
        className="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="tuliskan isi artikel disini"
        onChange={(e) => {
          setContent({ ...content, content: e.target.value });
        }}
      ></textarea>

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        onChange={(e) => {
          setContent({ ...content, gambar: e.target.files[0] });
        }}
      />
      <p className="mt-1 text-sm text-gray-500 mb-5" id="file_input_help">
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p>
      <button
        type="submit"
        className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          navigate("/Home");
        }}
      >
        Kembali
      </button>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleInput}
      >
        Submit
      </button>
    </div>
  );
};

export default FormInput;

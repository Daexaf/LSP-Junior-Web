import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils/utils";
import axios from "axios";

export default function Content() {
  const [role, setRole] = useState();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    getData();
  }, []);

  const getData = () => {
    axios.get(API_URL + "/artikel").then((res) => {
      console.log(res);
      const data = res.data.artikelData;
      setData(data);
    });
  };

  const filteredData = data.filter((element) =>
    element.judul.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <h1 className="flex justify-center text-5xl p-5 bg-primary text-5xl font-bold text-slate-950">
        Cari Artikel
      </h1>
      <form className="flex items-center p-5 bg-primary justify-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-50" id="item-list">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari Artikel"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      {filteredData.length > 0 ? (
        filteredData.map((element, index) => {
          const formattedGambar = element.gambar.replace(/\\/g, "/");
          const imagePath = formattedGambar.replace(/^\//, ""); // Remove the leading slash
          return (
            <div className="hero min-h-max bg-primary " key={index}>
              {/* {console.log(element.judul, "ini judul")} */}
              <div className="hero-content flex-col md:flex-row bg-sky-500 mb-5 rounded-md  w-full">
                <img
                  src={`${API_URL}/${imagePath}`}
                  className="max-w-sm rounded-lg shadow-2xl"
                  alt={element.gambar}
                />
                <div>
                  <h1 className="text-5xl font-bold text-slate-950">
                    {element.judul}
                  </h1>
                  <p className="py-6 text-slate-950">{element.content}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      navigate(`/Artikel/${element.id}`);
                    }}
                  >
                    Read More
                  </button>
                  {role === "admin" && (
                    <button
                      className="btn btn-success ml-3"
                      onClick={() => {
                        navigate(`/Edit/${element.id}`);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>tidak ada artikel ditemukan</p>
      )}
    </>
  );
}

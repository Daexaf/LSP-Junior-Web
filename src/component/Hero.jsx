import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <>
      <div className="hero min-h-screen bg-slate-100">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="assets/images/lib.jpg"
            className="max-w-xl rounded-lg shadow-2xl"
            alt="test"
          />
          <div>
            {role === "admin" ? (
              <h1 className="text-5xl font-bold text-slate-950">
                Selamat datang di Halaman Utama Admin JEWEPE
              </h1>
            ) : (
              <h1 className="text-5xl font-bold text-slate-950">
                Selamat datang di Halaman Utama JEWEPE
              </h1>
            )}

            <p className="py-6 text-slate-950">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            {role === "admin" && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/Input");
                }}
              >
                Buat Artikel Baru
              </button>
            )}
            <button className="btn btn-primary ml-5">Cari Artikel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

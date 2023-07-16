import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import FormInput from "./component/FormInput";
import ArtikelDetail from "./component/ArtikelDetail";
import EditArtikel from "./component/EditArtikel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Home/" element={<Home />} />
        <Route path="Artikel/:id" element={<ArtikelDetail />} />
        <Route path="Edit/:id" element={<EditArtikel />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Input" element={<FormInput />} />
      </Routes>
    </Router>
  );
};

export default App;

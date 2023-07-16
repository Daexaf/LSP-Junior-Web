import React, { Fragment } from "react";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import Content from "../component/Content";
import Footer from "../component/Footer";
import { useParams } from "react-router-dom";

const Home = () => {
  let id = useParams();
  console.log(id, "ini id home");
  return (
    <Fragment>
      <Navbar />
      <Hero />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default Home;

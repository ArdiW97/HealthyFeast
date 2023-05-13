import React from "react";
import About from "../../components/About/About";
import Banner from "../../components/Banner/Banner";
import Carousel from "../../components/Carousel/Carousel";
import Top from "../../components/Top/Top";

const Home = () => {
  return (
    <>
      <Banner />
      <Carousel />
      <Top />
      <About />
    </>
  );
};

export default Home;

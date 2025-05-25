import React from "react";
import { Banner } from "../components/Atoms/Banner";
import { Projects } from "../components/Atoms/Projects";
import { Contact } from "../components/Atoms/Contact";
import { Footer } from "../components/Atoms/Footer";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;

import Head from "next/head";
import type { NextPage } from "next";

import HomeHero from "components/home/homeHero/HomeHero";
import Tparticles from "components/home/tParticles/Tparticles";
import AboutMe from "components/home/aboutMe/AboutMe";
import ContactMe from "components/home/contactMe/ContactMe";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sugam Baskota | Web Developer</title>
      </Head>
      <Tparticles />
      <HomeHero />
      <AboutMe />
      <ContactMe />
    </div>
  );
};

export default Home;

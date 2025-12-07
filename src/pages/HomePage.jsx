// src/pages/HomePage.jsx

import React from 'react';
import Hero from '../components/Hero/Hero'; 
import Stats from '../components/Stats/Stats';
import About from '../components/About/About';
import Offer from '../components/Offer/Offer';

function HomePage() {
  return (
    <>
        <Hero />
        <Stats />
        <About />
        <Offer />
    </>
  );
}

export default HomePage;
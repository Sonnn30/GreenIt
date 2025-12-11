import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Stat from './components/Stats/Stats.jsx';
import About from './components/About/About.jsx';
import Offer from './components/Offer/Offer.jsx';

// Pages
import CameraPage from './pages/camera/Camera.jsx';
import ScanResultPage from './pages/result/ScanResult.jsx';

// Function for the Home Page Layout
function HomePageLayout() {
  return(
    <>
      <NavBar />
      <Hero/>
      <Stat />
      <About/>
      <Offer/>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the Home Page */}
        <Route path="/" element={<HomePageLayout />} /> 
        
        {/* Routes for other pages */}
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/scan-result" element={<ScanResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import Stat from './components/Stats/Stats.jsx'
import About from './components/About/About.jsx'
import Offer from './components/Offer/Offer.jsx'

import CameraPage from './pages/camera/Camera.jsx';
import ScanResultPage from './pages/result/ScanResult.jsx';

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
        <Route path="/" element={<HomePageLayout />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/scan-result" element={<ScanResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

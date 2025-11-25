import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import NavBar from './components/NavBar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import Stat from './components/Stats/Stats.jsx'
import About from './components/About/About.jsx'
import Offer from './components/Offer/Offer.jsx'

function App() {
  return (
    <>
      <NavBar />
      <Hero/>
      <Stat />
      <About/>
      <Offer/>
    </>
  )
}

export default App

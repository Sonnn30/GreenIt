import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import NavBar from './components/NavBar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'

function App() {
  return (
    <>
      <NavBar />
      <Hero/>
    </>
  )
}

export default App

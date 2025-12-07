import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <NavBar />

      <main className="content">
        <Outlet />
      </main>
      
    </div>
  );
}

export default App;
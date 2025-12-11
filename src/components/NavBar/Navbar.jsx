import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom'; 
import './NavBar.css';
import logoGreenIt from '../../assets/GreenItLogo.png';
import profileImage from '../../assets/userLogo.png'; 

function NavBar(){
    const [isScrolled, setIsScrolled] = useState(false);
    
    // 1. State untuk Menu Mobile
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    return(
        <nav className={`navbar ${isScrolled || menuOpen ? 'scrolled' : ''}`}>
            <div className="nav-left">
                <Link to="/">
                    <img src={logoGreenIt} alt="Logo" className="logo-pic"/>
                </Link>
            </div>
            
            <div className={`navbar-mid ${menuOpen ? "open" : ""}`}>
                <ul className="nav-links">
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? "active-link" : ""}
                            onClick={() => setMenuOpen(false)} // Tutup menu saat diklik
                        >
                            Home
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink 
                            to="/scan-history" 
                            className={({ isActive }) => isActive ? "active-link" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            Scan History
                        </NavLink>
                    </li>

                    <li>
                        <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
                    </li>
                </ul>
            </div>
            
            <div className="navbar-right">
                <img src={profileImage} alt="Profile" className="profile-pic"/>
                
                <button className="username-button desktop-only">
                    <span className="username">nama user</span>
                    <span className="dropdown-icon">▾</span>
                </button>
  
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? "✕" : "☰"}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
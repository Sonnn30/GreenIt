import React from "react";
import './NavBar.css';
import logoGreenIt from '../../assets/GreenItLogo.png';
import logoUser from '../../assets/userLogo.png';

function NavBar(){
    return(
        <nav className="navbar">
            <div className="nav-left">
                <img src={logoGreenIt} alt="Logo" className="logo-pic"/>
            </div>
            <div className="navbar-mid">
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Tips</a></li>
                    <li><a href="/">Bins</a></li>
                    <li><a href="/">About</a></li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={logoUser} alt="Profile" className="profile-pic"/>
                <button className="username-button">
                    <span className="username">nama user</span>
                    <span className="dropdown-icon">▾</span>
                </button>
            </div>
        </nav>
    );
}

export default NavBar
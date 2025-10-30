import React, { useState, useEffect } from "react"; // 1. Impor useState dan useEffect
import './NavBar.css';
import logoGreenIt from '../../assets/GreenItLogo.png';
import profileImage from '../../assets/userLogo.png'; // Pastikan path profil benar

function NavBar(){
    // state untuk melacak status scroll
    const [isScrolled, setIsScrolled] = useState(false);

    // useEffect untuk menambahkan event listener saat scroll
    useEffect(() => {
        // Fungsi ini akan dijalankan setiap kali user scroll
        const handleScroll = () => {
            // jika posisi scroll vertikal (window.scrollY) > 10px, set isScrolled jadi true
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // tambahkan event listener saat komponen pertama kali dirender
        window.addEventListener('scroll', handleScroll);

        // hapus event listener saat komponen dihancurkan (unmount)
        // untuk mencegah memory leak
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // array kosong [] berarti efek ini hanya berjalan sekali (saat mount)

    // tambahkan class 'scrolled' secara kondisional
    return(
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
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
                <img src={profileImage} alt="Profile" className="profile-pic"/>
                <button className="username-button">
                    <span className="username">nama user</span>
                    <span className="dropdown-icon">▾</span>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
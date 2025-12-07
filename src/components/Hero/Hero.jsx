import React from "react";
import './Hero.css';
import { Link } from 'react-router-dom';
import recycleImage from '../../assets/recycle.png'; // Pastikan path benar
import heroImage from '../../assets/heroimage.png'; // Pastikan path benar

function Hero(){
    return(
        <section id="home" className="hero-section">
            <div className="hero-text">
                <h1>Classify Your Trash</h1>
                <h2>Improve Our Future</h2>
                
                <p className="hero-description">
                    {/* Typo fixed: propre -> proper, landfil -> landfill */}
                    Did you know that proper waste sorting
                    can reduce landfill waste by up to 60%
                </p>
                
                <Link to="/scan-result" className="scan-button">
                    <span className="scan-icon">&#x26F6;</span> 
                    Scan Now
                </Link>

                <div className="cta-box">
                    <img src={recycleImage} alt="Recycle" className="cta-icon" />
                    <div className="cta-text">
                        <p><strong>Ready to make a difference?</strong></p>
                        <p>You can contribute to share your idea to recycles trash now</p>
                        <Link to="/tips" className="cta-link">Share Tips Now</Link>
                    </div>
                </div>
            </div>
            
            <div className="hero-image-container">
                <img src={heroImage} alt="Classify Trash" />
            </div>
        </section>
    );
}
export default Hero;
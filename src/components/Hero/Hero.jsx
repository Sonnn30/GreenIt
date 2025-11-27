import React from "react"
import { useNavigate } from 'react-router-dom'
import './Hero.css'
import recycleImage from '../../assets/recycle.png'
import heroImage from '../../assets/heroimage.png'

function Hero(){

    const navigate = useNavigate();

    return(
        <section className="hero-section">

            <div className="hero-text">
                <h1>Classify Your Trash</h1>
                <h2>Improve Our Future</h2>
                <p className="hero-description">
                    Did you know that propre waste sorting
                    can reduce landfil waste by up to 60%
                </p>
                <button className="scan-button" onClick={() => navigate('/camera')}>
                    <span className="scan-icon">&#x26F6;</span> 
                    Scan Now
                </button>

                <div className="cta-box">
                    <img src= {recycleImage} alt="Recycle" className="cta-icon" />
                    <div className="cta-text">
                        <p><strong>Ready to make a difference?</strong></p>
                        <p>You can contribute to share your idea to recycles trash now</p>
                        <a href="/tips" className="cta-link">Share Tips Now</a>
                    </div>
                </div>
            </div>
            <div className="hero-image-container">
                <img src={heroImage} alt="Classify Trash" />
            </div>
        </section>
    );
}
export default Hero
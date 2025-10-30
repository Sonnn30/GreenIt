import React from "react";
import "./About.css";

import aboutIcon from "../../assets/about.png";
import missionIcon from "../../assets/mission.png";
import jungleBg from "../../assets/junglebg.png";

function About(){
    return(
        <section 
            className="about-section"
            style={{ backgroundImage: `url(${jungleBg})` }}
        >
            <h2 className="section-title">About Us</h2>
            <p className="about-intro">
                At GreenIt, we are committed to simplifying waste sorting through AI
                technology. Our goal is to inspire sustainable habits and make waste
                management more accessible to everyone.
            </p>

            <div className="about-cards-container">


                <div className="about-card align-left">
                    <img src={aboutIcon} alt="About Green It" className="card-icon"/>
                    <div className="card-text">
                        <h3>About GreenIt</h3>
                        <p>
                            GreenIt is an Assistant is an AI-powered platform designed to help individuals
                            identify, sort, and manage waste more effectively. With our smart tools, users can
                            easily determine the type of waste they're disposing of and whether it can be
                            recycled or not — all with just a photo.
                        </p>
                    </div>
                </div>

                <div className="about-card align-right">
                    <img src={missionIcon} alt="Our Mission" className="card-icon"/>
                    <div className="card-text">
                        <h3>Our Mission</h3>
                        <p>
                            To reduce landfill waste and greenhouse gas emissions by providing individuals and
                            communities with smart, accessible tools to better understand, sort, and manage
                            their waste. Through education, technology, and practical insights, we aim to
                            encourage responsible habits and promote a culture of sustainability.
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    )
}
export default About

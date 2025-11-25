import React from "react";
import "./Offer.css";

import offerBg from "../../assets/offerBg.jpg"
import iconDetection from "../../assets/aiIcon.png"
import iconRecycle from "../../assets/recycleIcon.png"
import iconTips from "../../assets/tipsIcon.png"
import iconForum from "../../assets/forumIcon.png"
import iconLocator from "../../assets/locationIcon.png"
import iconTracker from "../../assets/trackerIcon.png"

function Offer(){
    return(
        <section 
            className="offer-section"
            style={{ backgroundImage: `url(${offerBg})`}}
        >
            <div className="offer-content">
                <h2 className="section-title"> What We Offer</h2>

                <p className="offer-intro">
                    Our features help you identify, manage, and reduce waste with the power of AI and community support.
                </p>
                <div className="offer-grid">

                    <div className="feature-card">
                        <img src={iconDetection} alt="AI Detection" className="feature-icon"/>
                        <div className="feature-text">
                            <h3>AI Detection</h3>
                            <p>Classifies waste from uploaded photos</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <img src={iconRecycle} alt="AI Detection" className="feature-icon"/>
                        <div className="feature-text">
                            <h3>Recycle Guide</h3>
                            <p>Suggests how to recycle or dispose item</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <img src={iconTips} alt="AI Detection" className="feature-icon"/>
                        <div className="feature-text">
                            <h3>Home Tips</h3>
                            <p>Simple waste management tips</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <img src={iconForum} alt="AI Detection" className="feature-icon"/>
                        <div className="feature-text">
                            <h3>Community Forum</h3>
                            <p>Share ideas, images, or videos</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <img src={iconLocator} alt="AI Detection" className="feature-icon"/>
                        <div className="feature-text">
                            <h3>Drop-off Locator</h3>
                            <p>Find nearby recycling spots</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <img src={iconTracker} alt="AI Detection" className="feature-icon"/>
                        <div className="feature-text">
                            <h3>Impact Tracker</h3>
                            <p>See how much waste you've saved</p>
                        </div>
                    </div>
                    
                </div>
            </div>

        </section>
    );
}
export default Offer;
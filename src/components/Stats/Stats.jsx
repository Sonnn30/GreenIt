import React from "react";
import "./Stats.css"

function Stats(){
    return(
        <section className="stats-section">
            <div className="stats-container">
                
                <div className="stat-item">
                    <h2 className="stat-value">98,5%</h2>
                    <p className="stat-description">AI detection accuracy</p>
                </div>

                <div className="stat-item">
                    <h2 className="stat-value">&lt; 2 Second</h2>
                    <p className="stat-description">Average time to classify</p>
                </div>

                <div className="stat-item">
                    <h2 className="stat-value">98,5%</h2>
                    <p className="stat-description">cuts greenhouse gases</p>
                </div>

            </div>
        </section>
    )
}
export default Stats
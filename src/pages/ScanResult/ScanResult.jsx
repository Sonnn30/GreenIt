import React, { useState } from 'react';
import './ScanResult.css';
import scannedImage from '../../assets/heroimage.png'; 

function ScanResultPage() {
  // State untuk mengelola accordion mana yang terbuka
  // null = tertutup semua
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    // Jika diklik lagi, tutup. Jika beda, buka yang baru.
    setOpenSection(openSection === index ? null : index);
  };

  // Data untuk menu accordion
  const accordionData = [
    {
      title: 'Details',
      content: 'This item is identified as a PET (Polyethylene Terephthalate) plastic bottle. It is widely used for liquid containers.'
    },
    {
      title: 'Disposal Options',
      content: 'Empty the liquid content. Crush the bottle to save space. Place it in the Yellow Bin or take it to a reverse vending machine.'
    },
    {
      title: 'Reuse Suggestions',
      content: 'Wash thoroughly and refill with bulk soap or detergent. Can also be cut to create small plant pots or organizers.'
    }
  ];

  return (
    <div className="scan-page">
      <div className="scan-container">
        <div className="scan-info">
          <h1 className="scan-title">Plastic</h1>
          <div className="scan-status">
            <span className="status-text">Recyclable</span>
          </div>
          <div className="scan-instruction">
            <span className="bin-icon">🗑️</span> 
            <p>Discard in: <span className="highlight-yellow">yellow bin</span></p>
          </div>
          <p className="scan-description">
            We've analyzed your item — here's how you can recycle and reuse it responsibly.
          </p>

          <div className="scan-accordion">
            {accordionData.map((item, index) => (
              <div key={index} className="accordion-item">
                <button 
                  className="accordion-header" 
                  onClick={() => toggleSection(index)}
                >
                  {item.title}
                  <span className="accordion-icon">
                    {openSection === index ? '−' : '+'}
                  </span>
                </button>
                <div className={`accordion-content ${openSection === index ? 'show' : ''}`}>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="scan-image-wrapper">
          <img src={scannedImage} alt="Scanned Object" />
        </div>

      </div>
    </div>
  );
}

export default ScanResultPage;
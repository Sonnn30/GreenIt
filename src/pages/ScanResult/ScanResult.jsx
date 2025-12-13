import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ScanResult.css';

/*
  UI mapping based on prediction class
  (acts like frontend config, not backend data)
*/

const CLASS_UI_MAP = { // make sure the name match
  "e-waste": {
    title: "E-Waste",
    recyclable: true,
    bin: "e-waste collection point",
    description:
      "Electronic waste contains valuable materials but must be handled carefully.",
    accordionData: [
      {
        title: "Details",
        content:
          "E-waste includes discarded electronics such as phones, chargers, and circuit boards."
      },
      {
        title: "Disposal Options",
        content:
          "Do not throw into regular bins. Take it to certified e-waste recycling centers."
      }
    ]
  },

  "glass": {
    title: "Glass",
    recyclable: true,
    bin: "green bin",
    description:
      "Glass can be recycled endlessly without degrading quality.",
    accordionData: [
      {
        title: "Details",
        content:
          "Glass is made from sand and is fully recyclable."
      },
      {
        title: "Disposal Options",
        content:
          "Remove lids and place glass items into the green bin."
      }
    ]
  },

  "organic waste": {
    title: "Organic Waste",
    recyclable: true,
    bin: "compost / organic bin",
    description:
      "Organic waste can be composted and returned to the soil.",
    accordionData: [
      {
        title: "Details",
        content:
          "Includes food scraps, leaves, and biodegradable materials."
      },
      {
        title: "Disposal Options",
        content:
          "Place in compost bins or organic waste collection."
      }
    ]
  },

  "textiles": {
    title: "Textiles",
    recyclable: true,
    bin: "textile donation or recycling",
    description:
      "Textiles can often be reused or recycled instead of discarded.",
    accordionData: [
      {
        title: "Details",
        content:
          "Includes clothes, fabrics, and wearable materials."
      },
      {
        title: "Disposal Options",
        content:
          "Donate usable items or take damaged textiles to recycling centers."
      }
    ]
  },

  "cardboard": {
    title: "Cardboard",
    recyclable: true,
    bin: "paper / cardboard bin",
    description:
      "Cardboard is highly recyclable and widely accepted.",
    accordionData: [
      {
        title: "Details",
        content:
          "Commonly used for packaging and shipping."
      },
      {
        title: "Disposal Options",
        content:
          "Flatten boxes and place them in the paper recycling bin."
      }
    ]
  },

  "metal": {
    title: "Metal",
    recyclable: true,
    bin: "metal recycling bin",
    description:
      "Metal can be recycled repeatedly without losing quality.",
    accordionData: [
      {
        title: "Details",
        content:
          "Includes cans, tins, and metal containers."
      },
      {
        title: "Disposal Options",
        content:
          "Clean and place in metal recycling bins."
      }
    ]
  },

  "paper": {
    title: "Paper",
    recyclable: true,
    bin: "paper recycling bin",
    description:
      "Paper is recyclable and helps reduce deforestation.",
    accordionData: [
      {
        title: "Details",
        content:
          "Includes newspapers, magazines, and office paper."
      },
      {
        title: "Disposal Options",
        content:
          "Ensure paper is clean and dry before recycling."
      }
    ]
  },

  "plastic": {
    title: "Plastic",
    recyclable: true,
    bin: "yellow bin",
    description:
      "Plastic waste should be sorted properly to avoid pollution.",
    accordionData: [
      {
        title: "Details",
        content:
          "Plastic items are commonly used for packaging and containers."
      },
      {
        title: "Disposal Options",
        content:
          "Clean and place plastic in the yellow recycling bin."
      },
      {
        title: "Reuse Suggestions",
        content:
          "Reuse containers or convert them into household items."
      }
    ]
  },

  "shoes": {
    title: "Shoes",
    recyclable: false,
    bin: "donation or general waste",
    description:
      "Shoes are often difficult to recycle due to mixed materials.",
    accordionData: [
      {
        title: "Details",
        content:
          "Shoes are made from multiple materials such as rubber, fabric, and glue."
      },
      {
        title: "Disposal Options",
        content:
          "Donate if usable; otherwise dispose as general waste."
      }
    ]
  },

  "trash": {
    title: "Trash",
    recyclable: false,
    bin: "general waste",
    description:
      "This item cannot be recycled and should be disposed responsibly.",
    accordionData: [
      {
        title: "Details",
        content:
          "Non-recyclable waste should not be mixed with recyclables."
      }
    ]
  }
};


function ScanResultPage() {
  // Hook to get data passed from camera page
  const location = useLocation();
  const { prediction, capturedImage } = location.state || {};

  // State untuk mengelola accordion mana yang terbuka
  // null = tertutup semua
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    // Jika diklik lagi, tutup. Jika beda, buka yang baru.
    setOpenSection(openSection === index ? null : index);
  };

  // Handle direct access without scan data
  if (!prediction || !capturedImage) {
    return (
      <div className="scan-page">
        <h1>No Scan Data Found</h1>
        <Link to="/camera">Go back to Camera</Link>
      </div>
    );
  }

  // Normalize class name and get UI data
  const classKey = prediction.class_name.toLowerCase();
  const uiData = CLASS_UI_MAP[classKey] || CLASS_UI_MAP.trash;

  return (
    <div className="scan-page">
      <div className="scan-container">
        <div className="scan-info">
          <h1 className="scan-title">{uiData.title}</h1>

          <div className="scan-status">
            <span className="status-text">
              {uiData.recyclable ? 'Recyclable' : 'Not Recyclable'}
            </span>
          </div>

          <div className="scan-instruction">
            <span className="bin-icon">🗑️</span>
            <p>
              Discard in:{' '}
              <span className="highlight-yellow">{uiData.bin}</span>
            </p>
          </div>

          <p className="scan-description">
            {uiData.description}
          </p>

          <div className="scan-accordion">
            {uiData.accordionData.map((item, index) => (
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

                <div
                  className={`accordion-content ${
                    openSection === index ? 'show' : ''
                  }`}
                >
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/camera">
            <button className="scan-again-btn">
              Scan Another Item
            </button>
          </Link>
        </div>

        <div className="scan-image-wrapper">
          <img src={capturedImage} alt="Scanned Object" />
        </div>
      </div>
    </div>
  );
}

export default ScanResultPage;

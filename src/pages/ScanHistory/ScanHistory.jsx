import React from 'react';
import './ScanHistory.css';

import trashimg from '../../assets/heroimage.png'
import redBinImg from '../../assets/redtrash.png';
import blueBinImg from '../../assets/bluetrash.png';
import yellowBinImg from '../../assets/yellowtrash.png';

const ScanHistory = () => {
  
  // const historyData = [
  //   { id: 1, name: 'Bottle Shampoo', isRecyclable: true, binColor: 'yellow', img: trashimg},
  //   { id: 2, name: 'Cardboard', isRecyclable: true, binColor: 'blue', img: trashimg },
  //   { id: 3, name: 'Syringe', isRecyclable: false, binColor: 'red', img: trashimg },
  //   { id: 4, name: 'Bottle Shampoo', isRecyclable: true, binColor: 'yellow', img: trashimg},
  // ];

  const historyData = JSON.parse(localStorage.getItem('scanHistory')) || [];


  const getBinIcon = (color) => {
    switch (color) {
      case 'red': return redBinImg;
      case 'blue': return blueBinImg;
      case 'yellow': return yellowBinImg;
      default: return redBinImg; 
    }
  };

  const getBinColor = (bin) => {
    if (bin.includes('yellow')) return 'yellow';
    if (bin.includes('green') || bin.includes('blue')) return 'blue';
    return 'red';
  };


  return (
    <div className="scan-history-container">
      <div className="history-header">
        <h1>My Scan History</h1>
        <hr />
      </div>

      <div className="filter-section">
        <span className="filter-label">filter by</span>
        <button className="filter-btn">Category ▼</button>
        <button className="filter-btn">Material ▼</button>
        <button className="filter-btn">Bins ▼</button>
        <button className="filter-result">Filter 3 x</button>
      </div>

      <div className="history-grid">
        {historyData.map((item) => (
          <div key={item.id} className="history-card">
            <img src={item.image} alt={item.className} className="card-image" />
            
            <div className="card-details">
              <div className="card-row card-title-row">
                <span className="card-title">{item.className}</span>
                <img 
                  src={getBinIcon(getBinColor(item.bin))}
                  alt={`${item.binColor} bin marker`} 
                  className="bin-icon-marker"
                />
              </div>
              
              <div className="card-row">
                <span className={`status-text ${item.recyclable ? 'recyclable' : 'not-recyclable'}`}>
                  {item.recyclable ? '♻ Recyclable' : '🚫 Not Recyclable'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
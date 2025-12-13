import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Impor Layout
import App from './App.jsx';

// Impor Halaman-halaman (Pages)
import HomePage from './pages/HomePage.jsx';
import ScanResultPage from './pages/ScanResult/ScanResult.jsx'; // Jika page ini ada
import ScanHistory from './pages/ScanHistory/ScanHistory.jsx';   // <-- 1. TAMBAHKAN INI
import CameraPage from './pages/Camera/Camera.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/', 
        element: <HomePage />,
      },
      {
        path: 'scan-result', 
        element: <ScanResultPage />,
      },
      {
        path: 'scan-history',    
        element: <ScanHistory />,
      },
      {
        path: 'camera',
        element: <CameraPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
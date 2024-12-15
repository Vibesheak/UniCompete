import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Disable concurrent mode by passing the option in createRoot
const root = ReactDOM.createRoot(document.getElementById('root'), { concurrent: false });
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optionally, you can keep the reportWebVitals if you want to track performance
reportWebVitals();

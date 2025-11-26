import { createRoot } from 'react-dom/client'; // Importing es6 module
import React from 'react';
import App from './App'; // Import App component
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'; // Few Bootstrap Components need this file
import 'font-awesome/css/font-awesome.min.css';



createRoot(document.getElementById('root')).render(
  <App />
)
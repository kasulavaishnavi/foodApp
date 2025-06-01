import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter  } from 'react-router-dom'
import ItemConetxtProvider from './context/itemsContext/itemsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
  <ItemConetxtProvider>
    <App />
  </ItemConetxtProvider>
  </BrowserRouter>
);


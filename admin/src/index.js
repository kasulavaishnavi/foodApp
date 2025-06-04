import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { TableProvider } from './Context/TableContext';
import { DashboardProvider } from './Context/DashBoardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <DashboardProvider>
 <TableProvider>
    <App />

  </TableProvider>

  </DashboardProvider>
 
  </BrowserRouter>
);

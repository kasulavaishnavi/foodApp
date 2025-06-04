import React from 'react';
import Dashboard from './components/Dashboard/DashBoard';
import './App.css';
import Tables from './pages/Tables/Tables';
import { Route, Routes,useLocation } from 'react-router-dom'
import Ordercarts from './pages/Ordercarts/Ordercarts';
import MenuItems from "./pages/MenuItems/MenuItems"
import SideBar from './components/SideBar/SideBar';
import { TableProvider } from './Context/TableContext';


const App = () => {
  
  return (
    <div className="app">
      <TableProvider>
        
      </TableProvider>
      <SideBar/>
       <Routes>
        <Route path='/' element = {<Dashboard/>} />
        <Route path='/Tables' element = {<Tables/>} />
        <Route path='/Ordercarts' element = {<Ordercarts />} />
        <Route path='/MenuItems' element = {<MenuItems/>} />
        

      </Routes>
    </div>
  );
};

export default App;
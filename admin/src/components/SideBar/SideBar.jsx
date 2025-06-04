import React from 'react'
import "./SideBar.css"
import { NavLink } from 'react-router-dom';

const SideBar = () => {

  return (
       <header id="header" className="header">

         <div className="menuItem1">
          <div className="iconCircle1">
            {/* <i className="fas fa-grip"></i> */}
          </div>
        </div>
                  <div className="menu">
        <div  className="menuItem" >
          <NavLink to="/" className="iconCircle">
            <i className="fas fa-grip"></i>
          </NavLink>
        </div>
        <div  className="menuItem">
          <NavLink to="/Tables" className="iconCircle">
            <i className="fa-solid fa-chair"></i>
          </NavLink>
        </div>
        <div  className="menuItem">
          <NavLink  to="/Ordercarts" className="iconCircle">
            <i class="fa-solid fa-book"></i>
          </NavLink>
        </div>

        <div  className="menuItem">
          <NavLink to="/MenuItems" className="iconCircle" >
            <i className="fa-solid fa-chart-simple"></i>
          </NavLink>
        </div>
      </div>

      </header>
  )
}

export default SideBar
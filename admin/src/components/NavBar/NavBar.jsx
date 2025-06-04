import React from 'react';
import './NavBar.css';

const NavBar = ({ onFilterClick, selectedFilter }) => {
  return (
    <div className='NavBar'>
    <div className="navbar">
      <div className="filter-container" onClick={onFilterClick}>
        <label htmlFor="filter">Filter</label>
        <div className="dropdown-arrow"><i class="fas fa-chevron-down"></i></div>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
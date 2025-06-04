import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../NavBar/NavBar';
import Analytics from '../Analytics/Analytics';
import SummaryOrder from '../SummaryOrder/SummaryOrder';
import Revenue from '../Charts/Revenue';
import Chef from '../Chef/chef';
import './Dashboard.css';
import TablesStatus from '../Table/TableStatus';

const Dashboard = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Filter...');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedFilterComponent, setSelectedFilterComponent] = useState(null);
  const overlayRef = useRef(null);

  //tables state for the toggle component
  const [tables, setTables] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      name: `Table ${String(i + 1).padStart(2, "0")}`,
      chairs: "03",
      status: Math.random() > 0.5 ? "available" : "reserved",
    }))
  );

  const handleFilterClick = () => {
    setIsOverlayOpen(true);
  };

  const handleOptionClick = (option) => {
    setSelectedFilter(option);
    setIsOverlayOpen(false);
    setIsFilterActive(true);

    switch (option) {
      case 'Order Summary':
        setSelectedFilterComponent(<SummaryOrder />);
        break;
      case 'Revenue':
        setSelectedFilterComponent(<Revenue/>);
        break;
      case 'Tables':
        setSelectedFilterComponent(
          <TablesStatus tables={tables} setTables={setTables} />
        );
        break;
      default:
        setSelectedFilterComponent(null);
        setIsFilterActive(false);
        break;
    }
  };

  const handleClickOutside = (event) => {
    if (isOverlayOpen && overlayRef.current && !overlayRef.current.contains(event.target)) {
      setIsOverlayOpen(false);
      setSelectedFilter('Filter...');
    }
    if (
      isFilterActive &&
      !event.target.closest('.selectedFilter') &&
      !event.target.closest('.filter-container')
    ) {
      setIsFilterActive(false);
      setSelectedFilterComponent(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOverlayOpen, isFilterActive]);

  return (
    <div className="dashboardContainer">
      <div className={`dashboardContent ${isFilterActive ? 'blurred' : ''}`}>
        <NavBar onFilterClick={handleFilterClick} selectedFilter={selectedFilter}/>
        <div className='analyticsBox'>
          <div className="analyticSection">
            <h1>Analytics</h1>
            <Analytics/>
          </div>

          
          <div className="widgetsGrid">
            <SummaryOrder />
            <Revenue />
            <TablesStatus tables={tables} setTables={setTables} />
          </div>

          <Chef />
        </div>
      </div>

      {isOverlayOpen && (
        <div className="filterOverlay" ref={overlayRef}>
          <div className="filter-options">
            <button onClick={() => handleOptionClick('Order Summary')}>Order Summary</button>
            <button onClick={() => handleOptionClick('Revenue')}>Revenue</button>
            <button onClick={() => handleOptionClick('Tables')}>Tables</button>
          </div>
        </div>
      )}

      {selectedFilterComponent && (
        <div className="selectedFilter">
          {selectedFilterComponent}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

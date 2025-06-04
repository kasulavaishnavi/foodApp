// src/components/TablesStatus/TablesStatus.jsx
import React, { useContext } from 'react';
import { TableContext } from "../../Context/TableContext"; // Corrected path: 'context' (lowercase)
import './TablesStatus.css'; // <--- UNCOMMENT THIS LINE

const TablesStatus = () => {
  const { tables, setTables } = useContext(TableContext);

  if (!tables || !Array.isArray(tables)) {
    return <div className="p-4 text-gray-600">Loading tables...</div>;
  }

  const toggleStatus = (id) => {
    const updatedTables = tables.map((table) =>
      table.id === id
        ? {
            ...table,
            status: table.status === 'available' ? 'reserved' : 'available',
          }
        : table
    );
    setTables(updatedTables);
  };;

  const availableTablesCount = tables.filter(t => t.status === 'available').length;
  const unavailableTablesCount = tables.filter(t => t.status === 'reserved').length;

  return (
    <div className="tables-status-card">
      <div className="card-header">
        <h3>Tables</h3>
        <div className="legend">
          <div className="legend-item available"></div> Available
          <div className="legend-item unavailable"></div> Unavailable
        </div>
      </div>
      <div className="tables-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => toggleStatus(table.id)}
            className={`table ${table.status === 'available' ? 'available-bg' : 'unavailable-bg'} cursor-pointer`}
          >
            Table<br />{String(table.name).replace('Table ', '').padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesStatus;
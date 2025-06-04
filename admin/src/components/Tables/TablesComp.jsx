import React from 'react';

const TablesWithStatusOnly = ({ tables, setTables }) => {
  // Toggle status handler (available <-> reserved)
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
  };

  // Delete table handler with reindexing and name update
  // const handleDeleteTable = (idToDelete) => {
  //   const filteredTables = tables.filter((table) => table.id !== idToDelete);
  //   const reindexedTables = filteredTables.map((table, index) => ({
  //     ...table,
  //     id: index + 1,
  //     name: `Table ${String(index + 1).padStart(2, '0')}`,
  //   }));
  //   setTables(reindexedTables);
  // };

  return (
    <div>
      <h2>Tables Status</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tables.length === 0 && <li>No tables available.</li>}
        {tables.map(({ id, name, chairs, status }) => (
          <li
            key={id}
            style={{
              padding: '1px',
              marginBottom: '1px',
              backgroundColor: status === 'available' ? '#d4edda' : '#f8d7da',
              borderRadius: '1px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{name}</strong> - Chairs: {chairs} - Status:{' '}
              <span style={{ fontWeight: '100' }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <div>
              <button onClick={() => toggleStatus(id)} style={{ marginRight: '8px' }}>
                {status === 'available' ? 'Reserve' : 'Make Available'}
              </button>
              {/* <button onClick={() => handleDeleteTable(id)}>Delete</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TablesWithStatusOnly;

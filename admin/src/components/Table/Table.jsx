// src/components/Tables/Tables.jsx
import React, { useState } from "react";

// Tables component for adding and deleting tables
// It receives 'tables' and 'setTables' as props from its parent (TablesPage)
const Table = ({ tables = [], setTables }) => {
  // State for new table input fields
  const [newTable, setNewTable] = useState({ chairs: "03" });

  // State to control the visibility of the add table form
  const [showForm, setShowForm] = useState(false);

  // Function to handle creating a new table
  const handleCreateTable = () => {
    // Generate a unique ID for the new table
    // Using Date.now() for simplicity, in a real app, you might use UUIDs or backend-generated IDs
    const newId = Date.now();
    const newTableData = {
      id: newId,
      // Name the new table based on the current number of tables
      name: `Table ${String(tables.length + 1).padStart(2, "0")}`,
      chairs: newTable.chairs, // Chairs from the form input
      status: "available", // New tables are always available by default
    };

    // Use the setTables function received via props to update the parent's state
    // This creates a new array to ensure React detects the state change
    setTables((prevTables) => [...prevTables, newTableData]);

    setShowForm(false); // Hide the form after creating the table
    setNewTable({ chairs: "03" }); // Reset the form fields to default
  };

  // Function to handle deleting a table by its ID
  const handleDeleteTable = (idToDelete) => {
    // Use the setTables function received via props to update the parent's state
    // Filter out the table with the matching ID to create a new array
    setTables((prevTables) => prevTables.filter((table) => table.id !== idToDelete));
  };

  return (
    <div className="TableContainer">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tables (Add/Delete)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Map through tables and render a card for each */}
        {tables.map((table) => (
          <div
            key={table.id} // Unique key for each table item
            className="relative bg-blue-100 p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105"
          >
            <div className="text-lg font-semibold text-blue-800">{table.name}</div>
            <small className="text-gray-600">🪑 {table.chairs}</small>
            {/* Delete button for each table */}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => handleDeleteTable(table.id)}
              title="Delete table"
            >
              ❌
            </button>
          </div>
        ))}

        {/* Card to trigger showing the add new table form */}
        <div
          className="bg-gray-200 p-4 rounded-xl shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-transform transform hover:scale-105"
          onClick={() => setShowForm(true)}
        >
          <div className="text-4xl font-light text-gray-600">+</div>
        </div>
      </div>

      {/* Form for adding a new table, shown conditionally */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Create New Table</h3>
            <label className="block mb-4">
              <span className="text-gray-700">Chairs:</span>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={newTable.chairs}
                onChange={(e) =>
                  setNewTable({ ...newTable, chairs: e.target.value })
                }
              >
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
              </select>
            </label>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleCreateTable}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
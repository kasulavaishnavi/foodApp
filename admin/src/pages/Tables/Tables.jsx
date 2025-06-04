// src/components/Tables/Tables.jsx
import React, { useState, useContext } from "react";
import { TableContext } from "../../Context/TableContext";
import "./Tables.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faTrash,faChair
} from "@fortawesome/free-solid-svg-icons";

const Tables = () => {
  const { tables, setTables } = useContext(TableContext);

  const [newTable, setNewTable] = useState({ chairs: "03" });
  const [showForm, setShowForm] = useState(false);

  const handleCreateTable = () => {
    const newId = Date.now();
    const newTableData = {
      id: newId,
      // Name the new table based on the current number of tables
      name: `Table ${String(tables.length + 1).padStart(2, "0")}`,
      chairs: newTable.chairs,
      status: "available",
    };
    // Add the new table
    const updatedTables = [...tables, newTableData];
    // Re-index all table names after adding
    const reindexedTables = updatedTables.map((table, index) => ({
      ...table,
      name: `Table ${String(index + 1).padStart(2, "0")}`,
    }));
    setTables(reindexedTables);

    setShowForm(false);
    setNewTable({ chairs: "01" });
  };

  // Function to handle deleting a table by its ID
  const handleDeleteTable = (idToDelete) => {
    // 1. Filter out the table to be deleted
    const filteredTables = tables.filter((table) => table.id !== idToDelete);

    // 2. Re-index the names of the remaining tables
    const reindexedTables = filteredTables.map((table, index) => ({
      ...table,
      name: `Table ${String(index + 1).padStart(2, "0")}`, // Assign new sequential name
    }));

    // 3. Update the global state with the re-indexed tables
    setTables(reindexedTables);
  };

  return (

    <div className="Main">
  <div className="searchBar">
    <input type="text" />
  </div>
    <div className="TableContainer">
      <h2 className="TableHeading">Tables</h2>
      <div className="TablesGrid">
        {tables.map((table) => (
          <div
            key={table.id}
            className="SingleTable"
          >
                 <button
              className="TableBtn"
              onClick={() => handleDeleteTable(table.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="TableId">{table.name}</div>
            <small className="ChairIcon"><FontAwesomeIcon icon={faChair} /> {table.chairs}</small>
       
          </div>
        ))}

        <div
          className= "TableForm"
          onClick={() => setShowForm(true)}
        >
          <div>+</div>
        </div>
      </div>

      {showForm && (
        <div className="ShowForm">
          <div className="FormModal">
            <h3 className="FormHeading">Create New Table</h3>
            <label >
              <span className="Formlabel">Chairs:</span>
              <input type="number"
                className="FormInput"
                value={newTable.chairs}
                onChange={(e) =>
                  setNewTable({ ...newTable, chairs: e.target.value })
                }
              />
             
            </label>
            <div className="FormCancelCreate">
              <button
                className="FormCancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="FormCreate"
                onClick={handleCreateTable}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      </div>
  );
};

export default Tables;
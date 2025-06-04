import React, { useState } from "react";
import Tables from "../../pages/Tables";
import TablesWithStatusOnly from "../Tables/TablesComp";

const TablesPage = () => {
  const [tables, setTables] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      name: `Table ${String(i + 1).padStart(2, "0")}`,
      chairs: "03",
      status: Math.random() > 0.5 ? "available" : "reserved",
    }))
  );

  return (
    <div className="p-4 space-y-8 font-inter">
      <Tables tables={tables} setTables={setTables} />
      <hr className="border-t-2 border-gray-200 my-8" />
      <TablesWithStatusOnly tables={tables} setTables={setTables} />
    </div>
  );
};

export default TablesPage;

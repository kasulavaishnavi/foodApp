import React, { useContext } from "react";
import "./Analytics.css";
import { DashboardContext } from "../../Context/DashBoardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faIdBadge,
  faIndianRupeeSign,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";

const AnalyticsCards = () => {
  const { totalRevenue, totalClients, totalOrders } =
    useContext(DashboardContext);
  return (
    <div className="analytics-cards">

      <div className="card rev">
        <div className="icon">
        <FontAwesomeIcon icon={faBowlFood} />
      </div>
      <div className="value val">
        04
        <div className="name">TOTAL CHEF</div>
      </div>
      </div>

      <div className="card rev">
        <div className="icon">
          <FontAwesomeIcon icon={faIndianRupeeSign} />
        </div>
        <div className="value val">
          {totalRevenue}
          <div className="name">Total Revenue</div>
        </div>
      </div>

      <div className="card rev">
         <div className="icon">
        <FontAwesomeIcon icon={faIdBadge} />
      </div>
      <div className="value val">
        {totalOrders}
        <div className="name">Total Orders</div>
      </div>
      </div>

      <div className="card rev">
        <div className="icon">
        <FontAwesomeIcon icon={faUsers} />
      </div>
      <div className="value val">
        {totalClients}
        <div className="name">Total Clients</div>
      </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;

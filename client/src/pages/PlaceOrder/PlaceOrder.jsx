import React, { useEffect, useState } from 'react';
import "./PlaceOrder.css";
import {Link} from "react-router-dom";

const PlaceOrder = () => {
  

  return (
    <div className="place-order-container">
      <img
        src={require("../../assests/confirmed.jpg")}
        className= "confirmed"
        alt='Order Confirmed'
      />
      <p>Your order is confirmed <br/> please wait until it comes</p>
      <Link to ="/cart"><button className='next' >back</button></Link>
    </div>
  );
};

export default PlaceOrder;
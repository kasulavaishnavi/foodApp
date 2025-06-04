import React, { useContext,  } from "react";
import "./ItemDisplay.css";
import { ItemContext } from "../../context/itemsContext/itemsContext";
import ItemCounter from "../Counter/ItemCounter";

const ItemDisplay = ({category}) => {
  const url = "https://foodapp-backend-h4kc.onrender.com";
  const { food_list, filteredFoodList } = useContext(ItemContext);

  // Determine which list to display: filtered results or category-based
  const itemsToDisplay = filteredFoodList || food_list.filter(item => category === "All" || item.category === category);

  // Determine the heading
  const headingText = filteredFoodList ? 'Search Results' : category;
  return (
    <div className="heading">
      <h1>{headingText}</h1>
     <div className="item-display" id="item-display">
        {itemsToDisplay.map(item => (
          <div key={item._id} className="item-card">
            <img src={url+"/images/"+item.image} alt={item.name} className="item-img" />
            <div className="item-info">
              <h3>{item.name}</h3>
              <h5>₹{item.price} <ItemCounter id={item._id} /></h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDisplay;

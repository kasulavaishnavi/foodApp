import React,{useState, useContext} from "react";
import "./Searchbar.css";
import { assets } from "../../assests/assets";
import { ItemContext } from '../../context/itemsContext/itemsContext';

const Searchbar = () => {
   const [searchTerm, setSearchTerm] = useState("");
  const {  handleSearch } = useContext(ItemContext);

    const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search Term:", event.target.value);
    handleSearch(event.target.value); // Perform search on each input change
  };
  return (
    <div>
      <div className="top-title">
        <h3>Good Evening</h3>
        <p>Place your order here</p>
      </div>
      <div className="search-bar">
        <img src={assets.search_icon} alt="" className="search" />
        <input type="text" placeholder="Search"
        value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch(searchTerm);
            }
          }} />
      </div>

    </div>

  );
};

export default Searchbar;

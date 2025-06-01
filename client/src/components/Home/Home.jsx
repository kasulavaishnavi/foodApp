import React, { useContext, useState,useEffect } from 'react'
import Searchbar from '../searchbar/Searchbar'
import Menu from '../menu/Menu'
import ItemDisplay from '../ItemDisplay/ItemDisplay';
import { ItemContext } from '../../context/itemsContext/itemsContext';
import "./Home.css"
import { Link } from 'react-router-dom';


const Home = () => {
  const [selectedItem, setSelectedItem] = useState("Coffee");
   const [previousSelectedItem, setPreviousSelectedItem] = useState("Coffee");
  const {cart, filteredFoodList, food_list ,clearSearch} = useContext(ItemContext);
    const handleCategoryChange = (category) => {
    setSelectedItem(category);
 };
     const isCartNotEmpty = Object.keys(cart).length > 0;
    //  const itemsToDisplay = filteredFoodList ? filteredFoodList : food_list.filter(item => item.category === selectedItem);
//  console.log("filteredFoodList in Home:", filteredFoodList);
  // console.log("itemsToDisplay in Home:", itemsToDisplay);

    useEffect(() => {
   if (selectedItem !== previousSelectedItem) {
      clearSearch();
      setPreviousSelectedItem(selectedItem);
    }
  }, [selectedItem, previousSelectedItem, clearSearch]);
  return (
      <>
    <div className='home'>
        <Searchbar/>
        <Menu onCategoryClick={handleCategoryChange} activeCategory={selectedItem} />
 {/* Conditionally render based on whether a search has results */}

        <ItemDisplay category={selectedItem} /> {/* Pass the selected category */}
    </div>
    <div className='next-button'>
   {isCartNotEmpty && <Link to="/cart"><button className='next' >Next</button></Link>}

    </div>
    
    
    
    </>
  )
}

export default Home
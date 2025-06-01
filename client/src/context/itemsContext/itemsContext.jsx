import { createContext, useState } from "react";
import { food_list } from "../../assests/assets";

export const ItemContext = createContext(null);
const ItemConetxtProvider = (props) => {
  const [cart, setCart] = useState({});
  const [filteredFoodList, setFilteredFoodList] = useState(null);

  const itemsToCart = (itemId) => {
    if (!cart[itemId]) {
      setCart((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const newCart = { ...prev }; // Create a copy of the previous cart
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1; // Decrement if count is > 1
      } else {
        delete newCart[itemId]; // Remove the item entirely if count is 1 (making it 0)
      }
      return newCart; // Return the updated cart
    });
  };

  // useEffect(()=>{
  // console.log(cart)
  // },[cart]);

  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        let iteminfo = food_list.find((prod) => prod._id === item);
        totalAmount += iteminfo.price * cart[item];
      }
    }
    return totalAmount;
  };

  const handleSearch = (term) => {
    console.log("Search Term Received in Context:", term);
  console.log("Original food_list:", food_list);
    if (!food_list) {
      setFilteredFoodList(null); // Clear filtered list if no food_list
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    const filteredItems = food_list.filter((foodItem) =>
      foodItem.name.toLowerCase().includes(lowercasedTerm)
    );
    console.log("Filtered Items:", filteredItems);
  setFilteredFoodList(filteredItems);
  console.log("filteredFoodList after set:", filteredFoodList);
  };

    const clearSearch = () => {
    setFilteredFoodList(null);
  };


  const contextValue = {
    food_list,
    cart,
    setCart,
    itemsToCart,
    removeFromCart,
    totalCartAmount,
    filteredFoodList, // Expose the filtered list
    setFilteredFoodList, // Expose the function to update the filtered list (though handleSearch is better)
    handleSearch,
    clearSearch, 
  };
  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemConetxtProvider;

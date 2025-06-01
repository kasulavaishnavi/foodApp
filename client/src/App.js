import React from 'react'
import Home from './components/Home/Home'
import { Route, Routes,useLocation } from 'react-router-dom'
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Cart from './pages/cart/Cart'
import Searchbar from './components/searchbar/Searchbar'



const  App = () => {
  return (
    <>
    <div className='app'>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/placeorder' element = {<PlaceOrder/>} />
      </Routes>
    </div>
    </>
    
  )
}

export default App
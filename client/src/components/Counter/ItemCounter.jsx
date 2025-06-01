import React, { useContext, } from 'react'
import "./ItemCounter.css"
import { ItemContext} from '../../context/itemsContext/itemsContext';

const ItemCounter = ({id}) => {
    // const [itemCount, setItemCount] = useState(0);
    const {cart,itemsToCart,removeFromCart} = useContext(ItemContext);
          const currentCount = cart[id] || 0;

  return (
    <>
  
    <div className='food-item'>
{currentCount === 0 ? <div className='add' onClick={()=>itemsToCart(id)}><p>+</p></div> 
: (<div className='control'> 
    <div onClick={()=>removeFromCart(id)} className='addremove' ><p>-</p></div>
<p>{currentCount }</p>
<div onClick={()=>itemsToCart(id)} className='addremove' ><p>+</p></div>

</div> 
)}

        
    </div>

      </>
  )
}

export default ItemCounter
import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      <div class="hover-background"></div>
      <div className="product-card">
      <Link to={`/product/${props.id}`}><div className='product-image'> <img onClick={window.scrollTo(0, 0)} src={props.image}  alt="" /></div></Link>
      <div className="title"><p>{props.name}</p></div>
      <div className="item-prices">
        <div className="item-price-new">
          ₹ {props.new_price}
        </div>
        <div className="item-price-old">
          ₹ {props.old_price}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Item

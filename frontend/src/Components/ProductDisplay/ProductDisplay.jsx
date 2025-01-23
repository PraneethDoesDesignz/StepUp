import React, { useContext } from 'react'
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>                                    
      <div className="container">
        <div className="slider">
          <img src={product.image} alt="" />
        </div>
        <div className="slider">
          <img src={product.image} alt="" />
        </div>
        <div className="slider">
          <img src={product.image} alt="" />
        </div>
        <div className="slider">
          <img src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">₹{product.old_price}</div>
            <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        </div>
            <div className="productdisplay-right-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, voluptatibus iusto error quod ad maxime dolore harum labore saepe aut inventore obcaecati magni suscipit voluptatem in et vitae. Eligendi, deserunt!
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                  <div><button>S</button></div>
                  <div><button>M</button></div>
                  <div><button>L</button></div>
                  <div><button>XL</button></div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category: </span>Women, T-Shirt, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags: </span>Modern, Latest</p>
            </div>
      </div>
    </div>
  )
}


export default ProductDisplay

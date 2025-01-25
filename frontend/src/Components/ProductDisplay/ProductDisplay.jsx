import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(null);

    // ✅ Define the missing function
    const handleSizeSelection = (size) => {
        setSelectedSize(size);
        console.log("Selected Size:", size);
    };

    const handleAddToCart = (item, size) => {
        if (!size) {
            alert("Please select a size before adding to cart.");
            return;
        }
        addToCart(item.id, size); 
    };

    return (
      <div className="productdisplay">
        <div className="container">
          {[...Array(4)].map((_, index) => (
            <div className="slider" key={index}>
              <img src={product.image} alt={`Product View ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-stars">
            {[...Array(4)].map((_, index) => (
              <img key={index} src={star_icon} alt="Star" />
            ))}
            <img src={star_dull_icon} alt="Star" />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ₹{product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ₹{product.new_price}
            </div>
          </div>
          <div className="productdisplay-right-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            voluptatibus iusto error quod ad maxime dolore harum labore saepe
            aut inventore obcaecati magni suscipit voluptatem in et vitae.
            Eligendi, deserunt!
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
            <div className="productdisplay-right-sizes">
  {["S", "M", "L", "XL", "XXL"].map((size) => (
    <button
      key={size}
      className={selectedSize === size ? "selected" : ""}
      onClick={() => handleSizeSelection(size)}
    >
      {size}
    </button>
  ))}
</div>

            </div>

            {/* ✅ Ensure size is selected before adding to cart */}
            <button className="addToCartbtn" onClick={() => handleAddToCart(product, selectedSize)}>
              Add to Cart
            </button>

            <p className="productdisplay-right-category">
              <span>Category: </span>Women, T-Shirt, Crop Top
            </p>
            <p className="productdisplay-right-category">
              <span>Tags: </span>Modern, Latest
            </p>
          </div>
        </div>
      </div>
    );
};

export default ProductDisplay;

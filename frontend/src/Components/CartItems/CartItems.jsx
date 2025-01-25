// CartItems.js
import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Navigate to the checkout page while passing cartItems
        navigate('/checkout', { state: { cartItems } });
    };

    const backtoHome = () => {
        navigate('/');
    };

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {Object.keys(cartItems).map((id) => {
                const item = all_product.find((product) => product.id === Number(id));
                if (!item) return null;

                const sizes = cartItems[id];
                return Object.keys(sizes).map((size) => {
                    const quantity = sizes[size];

                    if (quantity > 0) {
                        return (
                            <div key={`${id}-${size}`}>
                                <div className="cartitems-format cartitems-format-main">
                                    <img src={item.image} alt="" className="cartitems-product-icon" />
                                    <p>{item.name}</p>
                                    <p>₹{item.new_price}</p>
                                    <p>{size}</p>
                                    <button className="cartitems-quantity">{quantity}</button>
                                    <p>₹{item.new_price * quantity}</p>
                                    <img
                                        className="cartitems-remove-icon"
                                        src={remove_icon}
                                        onClick={() => removeFromCart(id, size)}
                                        alt="remove icon"
                                    />
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                });
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <button onClick={handleCheckout}>Proceed To Checkout</button>
                    <button onClick={backtoHome}>Back To Home</button>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
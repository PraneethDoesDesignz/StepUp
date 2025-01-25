import React, { useContext } from "react";
import "./Checkout.css";
import { ShopContext } from "../../Context/ShopContext";

const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);

  const subtotal = getTotalCartAmount(); // Get the cart subtotal
  const shippingFee = subtotal > 0 ? 50 : 0; // Conditional shipping fee
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + shippingFee + tax;

  return (
    <div className="container">
      <div className="checkout-container">
        {/* Shipping Information */}
        <div className="form-container">
          <form className="form">
            <div className="section">
              <h2 className="section-title">Shipping Information</h2>
              <div className="input-item">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" required />
              </div>
              <div className="input-item">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>
              <div className="input-item">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" required />
              </div>
              <div className="input-group-2">
                <div className="input-item">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" required />
                </div>
                <div className="input-item">
                  <label htmlFor="zip">ZIP Code</label>
                  <input type="text" id="zip" required />
                </div>
              </div>
              <div className="input-item">
                <label htmlFor="country">Country</label>
                <select id="country" required>
                  <option value="">Select a country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="summary-container">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-item">
            <p>Subtotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <p>Shipping Fee</p>
            <p>₹{shippingFee.toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <p>Tax (10%)</p>
            <p>₹{tax.toFixed(2)}</p>
          </div>
          <div className="total">
            <p>Total</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <button className="submit-button">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

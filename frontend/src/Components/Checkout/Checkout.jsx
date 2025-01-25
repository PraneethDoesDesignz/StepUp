import React, { useState, useContext } from "react";
import "./Checkout.css";
import { ShopContext } from "../../Context/ShopContext";

const countries = [
  { code: "us", name: "United States" },
  { code: "ca", name: "Canada" },
  { code: "uk", name: "United Kingdom" },
  { code: "in", name: "India" },
  { code: "au", name: "Australia" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "jp", name: "Japan" },
  { code: "cn", name: "China" },
  { code: "br", name: "Brazil" },
  { code: "it", name: "Italy" },
  { code: "mx", name: "Mexico" },
  { code: "es", name: "Spain" },
  // Add more countries as necessary
];

const Checkout = () => {
  const { all_product, getTotalCartAmount, cartItems, clearCart } = useContext(ShopContext);

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const subtotal = getTotalCartAmount();
  const shippingFee = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  const handlePlaceOrder = async () => {
    const { fullName, email, address, city, zip, country } = form;

    if (!fullName || !email || !address || !city || !zip || !country) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please provide a valid email address.");
      return;
    }

    const orderDetails = {
      items: Object.keys(cartItems)
        .map((id) => {
          const item = all_product.find((product) => product.id === Number(id));
          if (!item) return null;

          const sizes = cartItems[id];
          return Object.keys(sizes)
            .map((size) => {
              const quantity = sizes[size];
              if (quantity > 0) {
                return {
                  productId: item.id,
                  quantity,
                  size,
                };
              }
              return null;
            })
            .filter((item) => item !== null);
        })
        .flat(),
      totalAmount: total,
      shippingAddress: { fullName, email, address, city, zip, country },
    };

    console.log("Order Details:", orderDetails);

    switch (paymentMethod) {
      case "razorpay":
        handleRazorpayPayment(orderDetails);
        break;
      case "paypal":
        handlePayPalPayment(orderDetails);
        break;
      case "upi":
        handleUPIPayment(orderDetails);
        break;
      default:
        alert("Please select a payment method.");
        break;
    }
  };

  const handleRazorpayPayment = async (orderDetails) => {
    try {
      const response = await fetch("http://localhost:3000/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: orderDetails.totalAmount * 100 }), // Convert to paise
      });

      const { id: orderId, currency } = await response.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        amount: orderDetails.totalAmount * 100,
        currency,
        name: "Your Shop Name",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          alert("Payment Successful!");
          clearCart();
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: "1234567890",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error with Razorpay:", error);
      alert("Razorpay payment failed. Please try again.");
    }
  };

  const handlePayPalPayment = (orderDetails) => {
    alert("Redirecting to PayPal for payment...");
    // Add PayPal integration logic here
  };

  const handleUPIPayment = (orderDetails) => {
    alert("Redirecting to UPI app for payment...");
    // Add UPI integration logic here
  };

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
                <input
                  type="text"
                  id="fullName"
                  value={form.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={form.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group-2">
                <div className="input-item">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={form.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="zip">ZIP Code</label>
                  <input
                    type="text"
                    id="zip"
                    value={form.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="input-item">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  value={form.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
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

          {/* Payment Options */}
          <h2 className="section-title">Select Payment Method</h2>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Razorpay
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
          </div>

          <button className="submit-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

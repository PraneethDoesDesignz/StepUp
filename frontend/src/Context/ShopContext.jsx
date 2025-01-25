import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    return {}; // Start with an empty cart object
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        // Fetch all products
        fetch("http://localhost:3000/allproducts")
            .then((response) => response.json())
            .then((data) => setAll_Product(data));

        // Fetch cart data if authenticated
        if (localStorage.getItem("auth-token")) {
            fetch("http://localhost:3000/getcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, []);

    const addToCart = (itemId, size) => {
        if (!size) {
            alert("Size is required to add an item to the cart.");
            return;
        }

        console.log("Adding to Cart:", { itemId, size });

        // Update local state
        setCartItems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [size]: (prev[itemId]?.[size] || 0) + 1,
            },
        }));

        // Update backend
        if (localStorage.getItem("auth-token")) {
            fetch("http://localhost:3000/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId, size }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    };

    const removeFromCart = (itemId, size) => {
        if (!cartItems[itemId] || !cartItems[itemId][size]) {
            return; // If the item or size doesn't exist in the cart, do nothing
        }

        console.log("Removing from Cart:", { itemId, size });

        // Update local state
        setCartItems((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[itemId][size] -= 1;

            // If quantity for this size reaches 0, remove the size entry
            if (updatedCart[itemId][size] === 0) {
                delete updatedCart[itemId][size];
            }

            // If no sizes are left for this item, remove the item entry
            if (Object.keys(updatedCart[itemId]).length === 0) {
                delete updatedCart[itemId];
            }

            return updatedCart;
        });

        // Update backend
        if (localStorage.getItem("auth-token")) {
            fetch("http://localhost:3000/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId, size }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const sizes = cartItems[itemId];
            for (const size in sizes) {
                const itemInfo = all_product.find(
                    (product) => product.id === Number(itemId)
                );
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * sizes[size];
                }
            }
        }

        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItemCount = 0;
        
        if (!cartItems || typeof cartItems !== "object") return 0; // Handle undefined/null cases
    
        for (const item in cartItems) {
            if (cartItems[item] && typeof cartItems[item] === "object") {
                totalItemCount += Object.values(cartItems[item]).reduce((sum, quantity) => sum + (quantity || 0), 0);
            }
        }
        
        return totalItemCount;
    };
    
    

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

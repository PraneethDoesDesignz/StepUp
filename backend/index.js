const port = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://praneethtasp:Forbidden@cluster0.o5h7i.mongodb.net/StepUp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

// Creating Upload Endpoint for Images
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// User Schema
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'  // This refers to the Order model
    }],
    date: { type: Date, default: Date.now },
});


// Order Schema
const Order = mongoose.model('Order', {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    items: [{
        productId: { type: Number, required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Product Schema
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please Authenticate Using Valid Token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Please Authenticate Using Valid Token" });
    }
};

// Creating Endpoint to Place an Order
app.post('/placeorder', fetchUser, async (req, res) => {
    console.log("Request Body:", req.body); // Log the request body

    const { items, totalAmount, shippingAddress } = req.body;

    // Ensure items are provided
    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: "No items provided" });
    }

    // Create a new order
    const order = new Order({
        userId: req.user.id,
        items: items, // Ensure items from the request body are passed here
        totalAmount: totalAmount,
        shippingAddress: shippingAddress,
    });

    try {
        // Save the order
        await order.save();
        console.log("Order saved:", order); // Log the saved order

        // Update the user's orders array to include this new order
        await Users.findByIdAndUpdate(req.user.id, {
            $push: { orders: order._id }  // Push the order ID to the user's orders array
        });

        res.json({ success: true, message: "Order placed successfully", orderId: order._id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Example: Fetching Orders for a User
app.get('/myorders', fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).populate('orders'); // Populate the orders with order data
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ orders: user.orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Creating API to add products
app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})



// Creating API to delete Products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
    
})

// Creating API to display all Products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
    
})


// Creating Endpoint for Registering User
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Email Already Exists!" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Creating Endpoint For User Login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Password Incorrect!" });
        }
    } else {
        res.json({ success: false, errors: "Incorrect Email ID" });
    }
});

// Creating Endpoint for New Collection Data
app.get('/newcollections', async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
})

//Creating Endpoint for Popular in Women
app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular In Women Fetched");
    res.send(popular_in_women);
})
//Creating Endpoint for Related Products
app.get('/relatedproducts', async(req,res)=>{
    let products = await Product.find({category:"kids"});
    let related_women = products.slice(0,4);
    console.log("Related For Women Fetched");
    res.send(related_women);
})


//Creating Endpoint for Cart Data
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        let { itemId, size } = req.body;

        // Ensure cartData exists
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = {};
        }

        // Increase quantity for the selected size
        userData.cartData[itemId][size] = (userData.cartData[itemId][size] || 0) + 1;

        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Creating Endpoint To Remove From Cart Data
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        let { itemId, size } = req.body;

        if (userData.cartData[itemId] && userData.cartData[itemId][size] > 0) {
            userData.cartData[itemId][size] -= 1;
        }

        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Creating Endpoint to get Cart Data
app.post('/getcart',fetchUser, async (req,res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);    
})

// Creating Endpoint to Fetch Cart Products with Size Data
app.post('/cartproducts', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        if (!userData || !userData.cartData) {
            return res.status(404).json({ error: "User cart not found" });
        }

        let cart = userData.cartData;

        // Extract product IDs that have at least one non-zero size quantity
        let productIds = Object.keys(cart).filter(id =>
            typeof cart[id] === "object" && Object.values(cart[id]).some(qty => qty > 0)
        ).map(Number);

        if (productIds.length === 0) {
            return res.json([]); // No products in cart
        }

        let productsInCart = await Product.find({ id: { $in: productIds } });

        // Attach sizes & quantities to each product
        let cartWithSizes = productsInCart.map(product => ({
            ...product.toObject(),
            sizes: cart[product.id] || {}  // Attach sizes from cart
        }));

        res.json(cartWithSizes);
    } catch (error) {
        console.error("Error fetching cart products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port " +port)
    }
    else{
        console.log("Error:"+error)
    }
})
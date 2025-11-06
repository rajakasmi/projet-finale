const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRouter');
const orderRoutes = require('./routes/orderRoute');
const categoryRoutes = require('./routes/categoryRoutes');


// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes );
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/uploads", express.static("uploads"));




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


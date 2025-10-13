const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const { auth } = require('./middlewares/authRole');
const validateToken = require('./middlewares/validateToken');
const productRoutes = require('./routes/productRouter');


// Middleware pour les routes utilisateur


// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes ,validateToken ,auth );
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


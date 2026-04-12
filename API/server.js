const express = require('express');
const cors = require("cors");
const app = express();
const port = 4001;
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');

app.use(express.json())

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use(categoryRoutes);
app.use(productRoutes);
app.use(blogRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use(orderRoutes);
app.use(orderDetailRoutes);

app.listen(port, () => {
    console.log(`Server chạy tại: http://localhost:${port}`);
})
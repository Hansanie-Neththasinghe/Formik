const express = require("express");
const productRouter = require("../src/routes/productRoutes");
const userRouter = require("../src/routes/userRoutes");
const app = express();
const cors = require("cors");

app.use(cors({origin: "http://localhost:5173"}))

//middleware
app.use(express.json());

//routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/user",userRouter);

module.exports = app;
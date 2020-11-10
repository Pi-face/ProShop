import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//Calls all the variables in .env
dotenv.config();

//Connects The MongoDB Database.
connectDB();

//Initialises Express
const app = express();
//allows access to the json in the body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API IS Running....");
});

//utilises the productRoutes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

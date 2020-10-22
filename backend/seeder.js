import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

//since this is a seperate script from the server dotenv and connectDB need to be called again.

dotenv.config();

//and initialized
connectDB();

//created a function that is going to import the Data.
const importData = async () => {
  try {
    //imported the Current models below and deleted them
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //created a variable and inserted the users data into the model
    const createdUsers = await User.insertMany(users);

    //created a variable for a user that is an admin an grabbed the first user from the array with the id value.
    const adminUser = createdUsers[0]._id;

    //created a variable for sample products map through it and returned an object with the spread operator.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //Then inserted into the Product Model the sampleProducts array
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
    //passing in a 1 exits with failure.
  }
};

const destroyData = async () => {
  try {
    //imported the Current models below and deleted them
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
    //passing in a 1 exits with failure.
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

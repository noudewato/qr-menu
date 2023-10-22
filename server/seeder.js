const dotenv = require("dotenv");
const mongoose = require('mongoose');
const products = require("./data/products");
const users = require("./data/users");
const connectDB = require("./config/db");
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require("./models/orderModel");

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProduct = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProduct)

        console.log('Data Imported');
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1);
    }
}

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const express = require("express")
// const mongoose = require('mongoose')
// const cors = require("cors")
// const UsersModel = require('./models/users')

const app = express();
const PORT = process.env.PORT || 3001;
// app.use(express.json())
// app.use(cors())

// const uri = process.env.MONGO_URI

// mongoose.connect(uri)

app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// app.post("/signin", (req, res) => {
//     const {email, password} = req.body
//     UsersModel.findOne({email: email})
//     .then(user => {
//         if(user) {
//             if(user.password === password) {
//                 res.json("Success")
//             } else {
//                 res.json("Password is incorrect")
//             }
//         } else {
//             res.json("No record existed")
//         }
//     })
// })

// app.post('/signup', (req, res) => {
//     UsersModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

app.listen(PORT, () => {
  console.log("Server is running");
  connectMongoDB();
});

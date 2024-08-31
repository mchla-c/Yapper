import authRoutes from "./routes/auth.routes.js"

import dotenv from 'dotenv'
import express from "express"
import connectMongoDB from "./db/connectMongoDB.js"

dotenv.config()

// const express = require("express")
// const mongoose = require('mongoose')
// const cors = require("cors")
// const UsersModel = require('./models/users')

const app = express()
const PORT = process.env.PORT || 3001
// app.use(express.json())
// app.use(cors())

// const uri = process.env.MONGO_URI

// mongoose.connect(uri)

app.use("/api/auth", authRoutes);

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
    console.log("Server is running")
    connectMongoDB();
})
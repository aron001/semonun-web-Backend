const express = require('express')
const dotenv =require('dotenv')
const {errorHandler}=require('./middleware/errorMiddleware')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoutes")
const eventRoutes = require("./routes/eventRoutes")
const profileRoutes = require("./routes/profileRoutes")
const subscribeRoutes = require("./routes/subscribeRoutes")
const catagoryRoutes = require("./routes/catagoryRoutes")

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('./models/userModel')
dotenv.config();

mongoose.connect(process.env.MONGO_URI,()=>console.log('database connected'));
const router = express.Router()


const app=express()

app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/subscribe", subscribeRoutes)
app.use("/api/catagory", catagoryRoutes)
app.use("/api/events", eventRoutes)

app.use(errorHandler)

app.listen(3000,()=>{
  console.log("backend server is running on port 3000")
})


//app.listen(port,()=> console.log(`server started on port ${port}`))


//forgot password

  
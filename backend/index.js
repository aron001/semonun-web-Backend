const express = require('express')
const dotenv =require('dotenv').config()
const {errorHandler}=require('./middleware/errorMiddleware')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoutes")
const profileRoutes = require("./routes/profileRoutes")
const subscribeRoutes = require("./routes/subscribeRoutes")
const catagoryRoutes = require("./routes/catagoryRoutes")

const eventRoutes = require("./routes/eventRoutes")
//const connectDB=require('./config/db')
//const port= process.env.Port || 5000

//connectDB()



const app=express()

app.use(express.json())
//app.use(express.urlencoded({extended:false}))

//app.use('/api/users', require('./routes/userRoutes'))
//app.use('/api/createevents', require('./routes/eventRoutes'));
app.use("/api/users", userRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/subscribe", subscribeRoutes)
app.use("/api/catagory", catagoryRoutes)
app.use("/api/events", eventRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const MONGOOSE_URL = "mongodb://localhost:27017/semonunWeb"

mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true})
.then(()=> app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
}))
.catch(err=>{
    console.log(err)
})


//app.listen(port,()=> console.log(`server started on port ${port}`))
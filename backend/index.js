const express = require('express')
const dotenv =require('dotenv')
const {errorHandler}=require('./middleware/errorMiddleware')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoutes")
const profileRoutes = require("./routes/profileRoutes")
const subscribeRoutes = require("./routes/subscribeRoutes")
const catagoryRoutes = require("./routes/catagoryRoutes")

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('./models/userModel')


const router = express.Router()


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


//forgot password
app.post("/forgot-password",async(req,res)=>{

    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = process.env.JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aronhunde20@gmail.com",
          pass: "41390824",
        },
      });
  
      var mailOptions = {
        from: "aronhunde20@gmail.com@gmail.com",
        to: "danielnigatu07@gmail.com",
        subject: "Password Reset",
        text: link,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(link);
    } catch (error) {}
  
    
    }
  
  );
  
  app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  });
  
  
  app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
  
      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });
  
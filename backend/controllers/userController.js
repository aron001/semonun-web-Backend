const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Custemerprofile = require('../models/custemerprofileModel')
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {  role,email,password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error ('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
  
    email,
    role,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      role:user.role,
      email: user.email,
  
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
    
      email: user.email,
      role:user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


//custemer profile
const CustemerProfile = asyncHandler(async (req, res) => {
 const puser= req.user.id
const userprofileExit = await Custemerprofile.findOne({ puser })

  if (userprofileExit) {
    res.status(400)
    throw new Error('User profile already exists')
  }
  // Create user
  const custemerprofile = await Custemerprofile.create({
    
    user: req.user.id,
    hobby:req.body.hobby,
    address:req.body.address,
    phoneno:req.body.phoneno,
    fullname:req.body.fullname
  })

  res.status(200).json(custemerprofile)
})


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  CustemerProfile,
}
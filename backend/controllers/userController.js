const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Custemerprofile = require('../models/custemerprofileModel')
const Enduserprofile = require('../models/enduserprofileModel')
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
  // Create custemer profile
  const custemerprofile = await Custemerprofile.create({
    
    user: req.user.id,
    hobby:req.body.hobby,
    address:req.body.address,
    phoneno:req.body.phoneno,
    fullname:req.body.fullname
  })

  res.status(200).json(custemerprofile)
})
//get custemer profile
const getCustemerprofiles = asyncHandler(async (req, res) => {
  const custemerprofiles = await Custemerprofile.find({ user: req.user.id })

  res.status(200).json(custemerprofiles)
})

//update custemer profile
const updateCustemerprofile = asyncHandler(async (req, res) => {
  const custemerprofile = await Custemerprofile.findById(req.params.id)

  if (!custemerprofile) {
    res.status(400)
    throw new Error('custemer profile not found')
  }

  const user = await User.findById(req.user.id)
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (custemerprofile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedCustemerprofile = await Custemerprofile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedCustemerprofile)
})


//enduser profile
const EnduserProfile = asyncHandler(async (req, res) => {
  const puser= req.user.id
 const userprofileExit = await Enduserprofile.findOne({ puser })
 
   if (userprofileExit) {
     res.status(400)
     throw new Error('User profile already exists')
   }
   // Create end user profile
   const enduserprofile = await Enduserprofile.create({
     
     user: req.user.id,
     hobby:req.body.hobby,
     address:req.body.address,
     phoneno:req.body.phoneno,
     fullname:req.body.fullname,
     favor:req.body.favor,
   })
 
   res.status(200).json(enduserprofile)
 })


//Update end user profile
const updateEnduserprofile = asyncHandler(async (req, res) => {
  const enduserprofile = await Enduserprofile.findById(req.params.id)

  if (!enduserprofile) {
    res.status(400)
    throw new Error('Enduser profile not found')
  }

  const user = await User.findById(req.user.id)
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (enduserprofile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedEnduserprofile = await Enduserprofile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedEnduserprofile)
})

//get end user profile
const getEnduserprofiles = asyncHandler(async (req, res) => {
  const enduserprofiles = await Enduserprofile.find({ user: req.user.id })

  res.status(200).json(enduserprofiles)
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
  getCustemerprofiles,
  updateCustemerprofile,
  EnduserProfile,
  updateEnduserprofile,
  getEnduserprofiles
}
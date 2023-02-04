const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { isCustemer} = require('../middleware/authMiddleware')
const {
    CustemerProfile,
  } = require('../controllers/userController')

router.post('/cusprofile', protect,isCustemer,CustemerProfile)



module.exports = router
const express = require('express')
const router = express.Router()
const { protect, isEnduser } = require('../middleware/authMiddleware')
const { isCustemer} = require('../middleware/authMiddleware')
const {
    CustemerProfile,
    EnduserProfile,
    updateEnduserprofile,
    getEnduserprofiles,
    getCustemerprofiles,
    updateCustemerprofile
  } = require('../controllers/userController')

router.post('/cusprofile', protect,isCustemer,CustemerProfile)
router.get('/mycusprofile', protect,isCustemer, getCustemerprofiles)
router.put('/updatecusprofile/:id',protect,isCustemer,updateCustemerprofile)

router.post('/endprofile', protect,isEnduser,EnduserProfile)
router.put('/updateendprofile/:id',protect,isEnduser,updateEnduserprofile)
router.get('/myendprofile', protect,isEnduser, getEnduserprofiles)
module.exports = router
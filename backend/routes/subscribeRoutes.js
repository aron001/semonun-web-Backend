const express = require('express')
const router = express.Router()
const { protect, isEnduser } = require('../middleware/authMiddleware')

const {subscribe,unsubscribe}= require('../controllers/subscribeController')

router.put('/:id',protect,isEnduser,subscribe)
router.put('/:id/unsubscribe',protect,isEnduser,unsubscribe)

module.exports = router
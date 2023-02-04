const express = require('express')
const router = express.Router()
const {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController')

const { protect } = require('../middleware/authMiddleware')
const { isCustemer } = require('../middleware/authMiddleware')
router.route('/').get(protect, isCustemer,getEvents).post(protect, isCustemer,setEvent)
router.route('/:id').delete(protect,isCustemer, deleteEvent).put(protect, isCustemer,updateEvent)

module.exports = router
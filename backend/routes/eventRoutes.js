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
router.get('/myevent',protect,isCustemer,getEvents)
router.post('/createevent',protect, isCustemer,setEvent)
router.put('/updateevent/:id', protect, isCustemer,updateEvent)
router.delete('/deleteevent/:id',protect,isCustemer, deleteEvent)

module.exports = router
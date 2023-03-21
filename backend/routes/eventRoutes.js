const express = require('express')
const router = express.Router()
const {
  getEvents,
  
  setEvent,
  updateEvent,
  deleteEvent,
  fetchallevents,
  countallevents
} = require('../controllers/eventController')

const { protect ,isEnduser,isAdmin} = require('../middleware/authMiddleware')
const { isCustemer } = require('../middleware/authMiddleware')
router.get('/myevent',protect,isCustemer,getEvents)
//router.get('/timelinevents',protect,isEnduser,gettimelineevents)
router.get('/fetchallevents',fetchallevents)
router.post('/createevent',protect, isCustemer,setEvent)
router.put('/updateevent/:id', protect, isCustemer,updateEvent)
router.delete('/deleteevent/:id',protect,isCustemer, deleteEvent)
router.get('/countallevents',protect,isAdmin,countallevents)
module.exports = router
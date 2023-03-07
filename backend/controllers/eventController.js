const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')
const User = require('../models/userModel')


const getallEvents = asyncHandler(async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    
    const userEvent = await Event.find({ userId: currentUser._id});
    if (custemerprofile.user.toString() !== currentUser) {
      res.status(401)
      throw new Error('User not authorized')
    }
    const subscribedcustomerEvents = await Promise.all(
        currentUser.subscribed.map((friendId) => {
            return Event.find({ user: friendId });
        })
    );
    res.json(userEvent.concat(...subscribedcustomerEvents))
} catch (err){
    res.status(500).json(err);
}
})


// @desc    Get events
// @route   GET /api/events
// @access  Private

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id })

  res.status(200).json(events)
})

// @desc    Set event
// @route   POST /api/events
// @access  Private
const setEvent = asyncHandler(async (req, res) => {
  if (!req.body.eventname||!req.body.start||!req.body.end||!req.body.coverpicture||!req.body.location||!req.body.noofticket) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const event = await Event.create({
    
    user: req.user.id,
    start: req.body.start,
    end: req.body.end,
    catagory: req.body.catagory,
    coverpicture: req.body.coverpicture,
    tag: req.body.tag,
    location:req.body.location,
    phoneno:req.body.phoneno,
    eventname:req.body.eventname,
    noofticket:req.body.noofticket,
    tiketprice:req.body.ticketprice,
    priviouspicture:req.body.priviouspicture

  })

  res.status(200).json(event)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(400)
    throw new Error('Event not found')
  }

  const user = await User.findById(req.user.id)
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedEvent)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(400)
    throw new Error('Event not found')
  }

  const user = await User.findById(req.user.id)
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  } 

  await event.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
  getallEvents
}
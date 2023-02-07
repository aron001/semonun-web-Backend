const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')

//get all events that have created
const getallevents = asyncHandler(async (req, res) => {
    const events = await Event.find()
  
    res.status(200).json(events)
  })

  // search event based on catagory and event name
  const searchevent = asyncHandler(async (req, res) => {
    const events = await Event.find(
        {
            "$or":[
                {eventname:{$regex:req.params.key}},
                {catagory:{$regex:req.params.key}}
            ]
        }
    )
    res.send(events);
  })

//get event by film catagory 
  const filmevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"film"})
    if (!events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })

  //get event by music catagory

  const musicevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"music"})
    if (events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })

  //get event by exhibition catagory
  const exhibitionevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"exhibition"})
    if (!events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })
  //get events by fashion catagory
  const fashionevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"fashion"})
    if (!events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })

  // get events by craft
  const craftevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"craft"})
    if (!events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })

  //get event by catagory sport events

  const sportevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"sport"})
    if (!events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })

  //get seminars

  const seminarevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"seminar"})
    if (!events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })

  //art events

  const artevents = asyncHandler(async (req, res) => {
   
    const events = await Event.find ({catagory:"art"})
    if (!events) {
        res.status(400)
        throw new Error('Event not found')
      }
    res.status(200).json(events)
  })

//business events

const businessevents = asyncHandler(async (req, res) => {
   
  const events = await Event.find ({catagory:"business"})
  if (!events) {
      res.status(400)
      throw new Error('Event not found')
    }
  res.status(200).json(events)
})

//party events fetch

const partyevents = asyncHandler(async (req, res) => {
   
  const events = await Event.find ({catagory:"party"})
  if (!events) {
      res.status(400)
      throw new Error('Event not found')
    }
  res.status(200).json(events)
})

//free events fetch 
const freeevents = asyncHandler(async (req, res) => {
   
  const events = await Event.find ({ticketprice:"free"})
  if (!events) {
      res.status(400)
      throw new Error('Event not found')
    }
  res.status(200).json(events)
})
module.exports = {
    getallevents,
    searchevent,
    filmevents,
    musicevents,
    exhibitionevents,
    fashionevents,
    craftevents,
    sportevents,
    seminarevents,
    artevents,
    businessevents,
    partyevents,
    freeevents
  }
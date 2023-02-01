const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
   
    eventname: {
      type: String,
      required: [true, 'Please add event name'],
    },
    catagory: {
      type: String,
      required: [false, 'Please add event catagory'],
    },
    description: {
      type: String,
      required: [false, 'Please add a description'],
    },
    start: {
      type: String,
      required: [true, 'Please add event start date'],
    },
    end: {
      type: String,
      required: [true, 'Please add end date'],
    },
    coverpicture: {
      type: String,
      required: [true, 'Please add an image'],
    },
    location: {
      type: String,
      required: [true, 'Please add adress'],
    },
    phoneno: {
      type: String,
      required: [true, 'Please add a phone no'],
    },
    tag: {
      type: String,
      required: [false, 'Please add a tag'],
    },
    previouspicture: {
      type: String,
      required: [false, 'Please add a tag'],
    },
    noofticket: {
      type: String,
      required: [true, 'Please add a tag'],
    },
    ticketprice: {
      type: String,
      required: [false, 'Please add a tag'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Events = mongoose.model('Events', EventsSchema);
module.exports = Events;
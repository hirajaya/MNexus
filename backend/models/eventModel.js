import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const eventSchema = new mongoose.Schema({
  EID: {
    type: String,
    required: true,
    unique: true,
  },
  eventname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  seatCount: {
    type: Number,
    required: true,
  },
  eventGenre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reservedSeats: {
    type: [Number],
    default: [],
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

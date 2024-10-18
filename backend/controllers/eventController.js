import Event from '../models/eventModel.js';
import mongoose from 'mongoose';

const generateEID = async () => {
  let EID;
  let event;
  do {
    const randomDigits = Math.floor(100 + Math.random() * 900);
    EID = `E${randomDigits}`;
    event = await Event.findOne({ EID });
  } while (event);
  return EID;
};

export const createEvent = async (req, res) => {
  try {
    const { eventname, date, venue, seatCount, eventGenre, description, ticketPrice } = req.body;

    const EID = await generateEID();

    const newEvent = new Event({
      EID,
      eventname,
      date,
      venue,
      seatCount,
      eventGenre,
      description,
      ticketPrice,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventByID = async (req, res) => {
  try {
    const event = await Event.findOne({ EID: req.params.eid });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { EID: req.params.eid },
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ EID: req.params.eid });
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reserveSeats = async (req, res) => {
    const { eventId, seats } = req.body;
  
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const alreadyReserved = seats.some((seat) => event.reservedSeats.includes(seat));
  
      if (alreadyReserved) {
        return res.status(400).json({ message: 'Some seats are already reserved' });
      }

      event.reservedSeats = [...event.reservedSeats, ...seats];
  
      await event.save();
      res.status(200).json({ message: 'Seats reserved successfully', reservedSeats: event.reservedSeats });
    } catch (error) {
      res.status(500).json({ message: 'Error reserving seats', error });
    }
  };
  

import Venue from '../models/venueModel.js'

const createVenue = async (req, res) => {
    try {
        const { name, address, seatCount } = req.body;
        const venue = new Venue({
            name,
            address,
            seatCount
        });

        const savedVenue = await venue.save();
        res.status(201).json(savedVenue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOneVenue = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createVenue,
    getOneVenue,
    getAllVenues
};

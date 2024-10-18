import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    seatCount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Venue = mongoose.model('Venue', venueSchema);

export default Venue

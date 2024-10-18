import mongoose from 'mongoose';

const paySchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  selectedSeats: {
    type: [Number], 
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const Pay = mongoose.model('Pay', paySchema);

export default Pay;

import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema(
  {
    product1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    product2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    promotionType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deduction:{
      type: Number,
      required: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion;

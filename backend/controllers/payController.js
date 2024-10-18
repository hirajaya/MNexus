import Pay from '../models/payModel.js';
import asyncHandler from 'express-async-handler';

export const createPay = asyncHandler(async (req, res) => {
  const { eventName, selectedSeats, totalCost, cardNumber, expirationDate, cvv } = req.body;

  const newPay = new Pay({
    eventName,
    selectedSeats,
    totalCost,
    cardNumber,
    expirationDate,
    cvv,
  });

  await newPay.save();

  res.status(201).json({ message: 'Payment saved successfully!' });
});

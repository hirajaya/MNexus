import Payment from "../models/paymentModel.js";

const createPayment = async (req, res) => {
  const { driverID, name, email, phone, numberOfDeliveries, perCost } = req.body;

  try {
    const totalAmount = perCost * numberOfDeliveries;

    const newPayment = new Payment({
      driverID,
      name,
      email,
      phone,
      numberOfDeliveries,
      perCost,
      totalAmount
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({ message: 'Payment recorded successfully', payment: savedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error recording payment', error: error.message });
  }
};

const getPaymentsByDriverId = async (req, res) => {
    try {
      const { driverID } = req.params;
      const payments = await Payment.find({ driverID });
      if (!payments.length) {
        return res.status(404).json({ message: 'No payment details found for this driver' });
      }
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { perCost, totalAmount, numberOfDeliveries } = req.body;
  
    try {
      const payment = await Payment.findById(id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      payment.perCost = perCost || payment.perCost;
      payment.totalAmount = totalAmount || payment.totalAmount;
      payment.numberOfDeliveries = numberOfDeliveries || payment.numberOfDeliveries;
  
      const updatedPayment = await payment.save();
      res.json(updatedPayment);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};
  

const deletePayment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const payment = await Payment.findById(id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      await payment.remove();
      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

export {
  createPayment, getPaymentsByDriverId, updatePayment, deletePayment
};

import mongoose from 'mongoose';

const deliveryPayrollSchema = new mongoose.Schema(
  {
    DriverID: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: 'Driver', 
    },
    month: { 
      type: String,
      required: true 
    },
    netPayment: { 
      type: Number, 
      required: true 
    }
  },
  { timestamps: true }
);

const DeliveryPayroll = mongoose.model("DeliveryPayroll", deliveryPayrollSchema);
export default DeliveryPayroll;

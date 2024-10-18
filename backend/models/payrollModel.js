import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema({
  AID: { type: String, required: true },
  artistname: { type: String, required: true },
  total_merchandise_sales: { type: Number, required: true },
  total_album_sales: { type: Number, required: true },
  total_ticket_sales: { type: Number, required: true },
  total_sales: { type: Number, required: true },
  payroll_amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Payroll= mongoose.model('Payroll', PayrollSchema);

export default Payroll
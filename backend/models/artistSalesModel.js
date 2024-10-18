import mongoose from "mongoose";

const ArtistSalesSchema = new mongoose.Schema({
  artistname: { type: String, required: true },
  AID: { type: String, required: true, unique: true },
  contact_number: { type: String, required: true },
  email: { type: String, required: true },
  merchandise_count: { type: Number, required: true },
  album_count: { type: Number, required: true },
  ticket_count: { type: Number, required: true },
  merchandise_sales: { type: Number, required: true },
  album_sales: { type: Number, required: true },
  ticket_sales: { type: Number, required: true }
});

const ArtistSales = mongoose.model('ArtistSales', ArtistSalesSchema);

export default ArtistSales

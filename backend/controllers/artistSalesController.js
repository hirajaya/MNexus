import ArtistSales from "../models/artistSalesModel.js";

const createArtistSales = async (req, res) => {
  try {
    const { artistname, AID, contact_number, email, merchandise_count, album_count, ticket_count, merchandise_sales, album_sales, ticket_sales } = req.body;

    const newArtistSales = new ArtistSales({
      artistname,
      AID,
      contact_number,
      email,
      merchandise_count,
      album_count,
      ticket_count,
      merchandise_sales,
      album_sales,
      ticket_sales
    });

    await newArtistSales.save();

    return res.status(201).json({ message: 'Artist sales data created successfully', newArtistSales });
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const getArtistSales = async (req, res) => {
  try {
    const { AID } = req.params;
    const artist = await ArtistSales.findOne({ AID });
    
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    return res.status(200).json(artist);
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export { createArtistSales, getArtistSales };

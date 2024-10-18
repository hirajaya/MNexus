import ArtistSales from '../models/artistSalesModel.js';
import Payroll from '../models/payrollModel.js';

const calculatePayroll = async (req, res) => {
  try {
    const { AID } = req.body;
    const artist = await ArtistSales.findOne({ AID });

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const totalMerchandiseSales = artist.merchandise_sales;
    const totalAlbumSales = artist.album_sales;
    const totalTicketSales = artist.ticket_sales;
    const totalSales = totalMerchandiseSales + totalAlbumSales + totalTicketSales;
    const payrollPercentage = 0.1;
    const payrollAmount = totalSales * payrollPercentage;

    const payroll = new Payroll({
      AID: artist.AID,
      artistname: artist.artistname,
      total_merchandise_sales: totalMerchandiseSales,
      total_album_sales: totalAlbumSales,
      total_ticket_sales: totalTicketSales,
      total_sales: totalSales,
      payroll_amount: payrollAmount
    });

    await payroll.save();

    return res.status(201).json({
      message: 'Payroll calculated and saved successfully',
      payroll
    });

  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const getAllPayrollDetails = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    return res.status(200).json(payrolls);
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const getPayrollByAID = async (req, res) => {
  try {
    const { AID } = req.params;
    const payroll = await Payroll.findOne({ AID });

    if (!payroll) {
      return res.status(404).json({ error: 'Payroll not found' });
    }

    return res.status(200).json(payroll);
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const updatePayroll = async (req, res) => {
  try {
    const { AID } = req.params;
    const updatedData = req.body;

    const payroll = await Payroll.findOneAndUpdate({ AID }, updatedData, { new: true });

    if (!payroll) {
      return res.status(404).json({ error: 'Payroll not found' });
    }

    return res.status(200).json({
      message: 'Payroll updated successfully',
      payroll
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const deletePayroll = async (req, res) => {
  try {
    const { AID } = req.params;

    const payroll = await Payroll.findOneAndDelete({ AID });

    if (!payroll) {
      return res.status(404).json({ error: 'Payroll not found' });
    }

    return res.status(200).json({ message: 'Payroll deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export { calculatePayroll, getAllPayrollDetails, getPayrollByAID, updatePayroll, deletePayroll };

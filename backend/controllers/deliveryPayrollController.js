import DeliveryPayroll from '../models/deliveryPayrollModel.js'; 

export const createPayroll = async (req, res) => {
  try {
    const { DriverID, month, netPayment } = req.body;
    const payroll = new DeliveryPayroll({ DriverID, month, netPayment });
    await payroll.save();
    res.status(201).json({ message: 'Payroll record created successfully', payroll });
  } catch (error) {
    console.error('Error creating payroll record:', error);
    res.status(500).json({ message: 'Error creating payroll record', error });
  }
};

export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await DeliveryPayroll.find()
      .populate('DriverID', 'name email'); 
    res.status(200).json(payrolls);
  } catch (error) {
    console.error('Error fetching payroll records:', error);
    res.status(500).json({ message: 'Error fetching payroll records', error });
  }
};


export const getPayrollById = async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await DeliveryPayroll.findById(id).populate('DriverID', 'name email');
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }
    res.status(200).json(payroll);
  } catch (error) {
    console.error('Error fetching payroll record:', error);
    res.status(500).json({ message: 'Error fetching payroll record', error });
  }
};

export const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, netPayment } = req.body;
    const updatedPayroll = await DeliveryPayroll.findByIdAndUpdate(
      id,
      { month, netPayment },
      { new: true }
    );
    if (!updatedPayroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }
    res.status(200).json({ message: 'Payroll record updated successfully', updatedPayroll });
  } catch (error) {
    console.error('Error updating payroll record:', error);
    res.status(500).json({ message: 'Error updating payroll record', error });
  }
};

export const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayroll = await DeliveryPayroll.findByIdAndDelete(id);
    if (!deletedPayroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }
    res.status(200).json({ message: 'Payroll record deleted successfully' });
  } catch (error) {
    console.error('Error deleting payroll record:', error);
    res.status(500).json({ message: 'Error deleting payroll record', error });
  }
};

import Driver from '../models/driverModel.js';

const generateDriverID = async () => {
  const randomId = Math.floor(1000 + Math.random() * 900); 
  const driverID = `D${randomId}`; 
  const exists = await Driver.findOne({ DriverID: driverID });
  
  if (exists) {
    return generateDriverID(); 
  }
  
  return driverID;
};
const addDriver = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const DriverID = await generateDriverID(); 
    const newDriver = new Driver({ name, email, phone, DriverID });
    
    await newDriver.save();
    res.status(201).json({ message: 'Driver added successfully', newDriver });
  } catch (error) {
    res.status(500).json({ message: 'Error adding driver', error });
  }
};

const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, numberOfDeliveries } = req.body;

  try {
    const updatedDriver = await Driver.findByIdAndUpdate(id, {
      name, email, phone, numberOfDeliveries
    }, { new: true });
    
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    
    res.status(200).json({ message: 'Driver updated successfully', updatedDriver });
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver', error });
  }
};

const getDriverByID = async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await Driver.findById(id);
    
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving driver', error });
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving drivers', error });
  }
};

const deleteDriver = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);
    
    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    
    res.status(200).json({ message: 'Driver deleted successfully', deletedDriver });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error });
  }
};

export {addDriver,updateDriver,getAllDrivers,getDriverByID,deleteDriver}

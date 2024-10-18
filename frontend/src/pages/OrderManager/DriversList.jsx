import React, { useState } from 'react';
import { useGetAllDriversQuery, useUpdateDriverMutation, useDeleteDriverMutation, useAddDriverMutation } from '../../redux/features/drivers/driverApiSlice';
import { FaEdit, FaTrashAlt, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

const DriversList = () => {
  const { data: drivers, error, isLoading } = useGetAllDriversQuery();
  const [updateDriver] = useUpdateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();
  const [addDriver] = useAddDriverMutation();

  const [editingDriverId, setEditingDriverId] = useState(null);
  const [editableDriver, setEditableDriver] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfDeliveries: '',
  });

  const [showAddDriverForm, setShowAddDriverForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfDeliveries: '',
  });

  const handleEditClick = (driver) => {
    setEditingDriverId(driver._id);
    setEditableDriver({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      numberOfDeliveries: driver.numberOfDeliveries,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableDriver({
      ...editableDriver,
      [name]: value,
    });
  };

  const handleSaveClick = async (id) => {
    try {
      await updateDriver({ id, updatedDriver: editableDriver }).unwrap();
      setEditingDriverId(null);
    } catch (error) {
      console.error('Failed to update driver:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      try {
        await deleteDriver(id).unwrap();
      } catch (error) {
        console.error('Failed to delete driver:', error);
      }
    }
  };

  const handleAddDriverChange = (e) => {
    const { name, value } = e.target;
    setNewDriver({
      ...newDriver,
      [name]: value,
    });
  };

  const handleAddDriverSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDriver(newDriver).unwrap();
      setNewDriver({
        name: '',
        email: '',
        phone: '',
        numberOfDeliveries: '',
      });
      setShowAddDriverForm(false); 
    } catch (error) {
      console.error('Failed to add driver:', error);
    }
  };

  if (isLoading) return <p>Loading drivers...</p>;
  if (error) return <p>Error fetching drivers</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Drivers List</h2>
      <button 
        className="bg-black text-white px-4 py-2 rounded-lg mb-4" 
        onClick={() => setShowAddDriverForm(true)}
      >
        <FaPlus className="inline mr-2" /> Add Driver
      </button>
      
      {showAddDriverForm && (
        <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
          <h3 className="text-xl font-semibold mb-4">Add New Driver</h3>
          <form onSubmit={handleAddDriverSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newDriver.name}
              onChange={handleAddDriverChange}
              className="border p-2 mb-2 w-full rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newDriver.email}
              onChange={handleAddDriverChange}
              className="border p-2 mb-2 w-full rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newDriver.phone}
              onChange={handleAddDriverChange}
              className="border p-2 mb-2 w-full rounded"
              required
            />
            <input
              type="number"
              name="numberOfDeliveries"
              placeholder="Number of Deliveries"
              value={newDriver.numberOfDeliveries}
              onChange={handleAddDriverChange}
              className="border p-2 mb-4 w-full rounded"
              required
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg mr-2">
              Add Driver
            </button>
            <button 
              type="button" 
              className="bg-red-500 text-white px-4 py-2 rounded-lg" 
              onClick={() => setShowAddDriverForm(false)}
            >
              <FaTimes className="inline mr-2" /> Cancel
            </button>
          </form>
        </div>
      )}

      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-pink-500 text-white">
            <th className="px-4 py-2 border text-center">Name</th>
            <th className="px-4 py-2 border text-center">Email</th>
            <th className="px-4 py-2 border text-center">Phone</th>
            <th className="px-4 py-2 border text-center">Number of Deliveries</th>
            <th className="px-4 py-2 border text-center">Driver ID</th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers?.map((driver) => (
            <tr key={driver._id} className="text-center">
              {editingDriverId === driver._id ? (
                <>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      name="name"
                      value={editableDriver.name}
                      onChange={handleInputChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      name="email"
                      value={editableDriver.email}
                      onChange={handleInputChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      name="phone"
                      value={editableDriver.phone}
                      onChange={handleInputChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="number"
                      name="numberOfDeliveries"
                      value={editableDriver.numberOfDeliveries}
                      onChange={handleInputChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="px-4 py-2 border">{driver.DriverID}</td>
                  <td className="px-4 py-2 border">
                    <div className="inline-flex items-center space-x-3">
                      <FaSave
                        className="text-black text-xl cursor-pointer"
                        onClick={() => handleSaveClick(driver._id)}
                      />
                      <FaTimes
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={() => setEditingDriverId(null)}
                      />
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 border">{driver.name}</td>
                  <td className="px-4 py-2 border">{driver.email}</td>
                  <td className="px-4 py-2 border">{driver.phone}</td>
                  <td className="px-4 py-2 border">{driver.numberOfDeliveries}</td>
                  <td className="px-4 py-2 border">{driver.DriverID}</td>
                  <td className="px-4 py-2 border">
                    <div className="inline-flex items-center space-x-3">
                      <FaEdit
                        className="text-blue-500 text-xl cursor-pointer"
                        onClick={() => handleEditClick(driver)}
                      />
                      <FaTrashAlt
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={() => handleDeleteClick(driver._id)}
                      />
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriversList;

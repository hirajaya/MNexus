import React, { useState } from 'react';
import { useGetAllDriversQuery } from '../../redux/features/drivers/driverApiSlice';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; 

const DriverPayroll = () => {
  const { data: drivers, error, isLoading } = useGetAllDriversQuery();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [perCost, setPerCost] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState([]);

  if (isLoading) return <p>Loading drivers...</p>;
  if (error) return <p>Error fetching drivers</p>;

  const handleAddPayment = (driver) => {
    setSelectedDriver(driver);
    setPerCost(driver.perCost || 0); 
    setShowPaymentForm(true);
  };

  const handleShowSlip = async (driver) => {
    try {
      const response = await fetch(`/api/payments/${driver.DriverID}`);
      if (response.ok) {
        const data = await response.json();
        setPaymentDetails(data);
        toast.success('Payment details fetched successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Error fetching payment details: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const totalPayment = perCost * selectedDriver.numberOfDeliveries;

    const paymentData = {
      driverID: selectedDriver.DriverID,
      name: selectedDriver.name,
      email: selectedDriver.email,
      phone: selectedDriver.phone,
      numberOfDeliveries: selectedDriver.numberOfDeliveries,
      perCost,
      totalAmount: totalPayment,
    };

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        toast.success(`Payment of Rs. ${totalPayment} submitted for ${selectedDriver.name}`);
        setShowPaymentForm(false);
      } else {
        const errorData = await response.json();
        toast.error(`Failed to submit payment: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Error submitting payment: ${error.message}`);
    }
  };

  const handleDeleteDriver = async (driverID) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          console.log(`Driver ${driverID} deleted.`);
          toast.success('Payement Slip has been deleted successfully.');
        } catch (error) {
          toast.error(`Failed to delete driver: ${error.message}`);
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center">Drivers</h2>

      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-pink-500 text-white">
            <th className="px-4 py-2 border text-center">Name</th>
            <th className="px-4 py-2 border text-center">Email</th>
            <th className="px-4 py-2 border text-center">Phone</th>
            <th className="px-4 py-2 border text-center">Number of Deliveries</th>
            <th className="px-4 py-2 border text-center">Driver ID</th>
            <th className="px-4 py-2 border text-center"></th>
          </tr>
        </thead>
        <tbody>
          {drivers?.map((driver) => (
            <tr key={driver._id} className="text-center">
              <td className="px-4 py-2 border">{driver.name}</td>
              <td className="px-4 py-2 border">{driver.email}</td>
              <td className="px-4 py-2 border">{driver.phone}</td>
              <td className="px-4 py-2 border">{driver.numberOfDeliveries}</td>
              <td className="px-4 py-2 border">{driver.DriverID}</td>
              <td className="px-4 py-2 border">
                <div className="flex justify-center">
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    onClick={() => handleAddPayment(driver)}
                  >
                    Pay
                  </button>
                  <button 
                    className="bg-black text-white px-4 py-2 rounded-lg mr-2"
                    onClick={() => handleShowSlip(driver)}
                  >
                    Slip
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                    onClick={() => handleAddPayment(driver)}
                  >
                    <FiEdit /> 
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleDeleteDriver(driver.DriverID)}
                  >
                    <FiTrash /> 
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPaymentForm && selectedDriver && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Payment for {selectedDriver.name}</h3>
              <form onSubmit={handleSubmitPayment}>
                <div className="mb-4">
                  <label className="block mb-2">Email:</label>
                  <input
                    type="email"
                    value={selectedDriver.email}
                    readOnly
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Phone:</label>
                  <input
                    type="text"
                    value={selectedDriver.phone}
                    readOnly
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Number of Deliveries:</label>
                  <input
                    type="number"
                    value={selectedDriver.numberOfDeliveries}
                    readOnly
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Per Cost:</label>
                  <input
                    type="number"
                    value={perCost}
                    onChange={(e) => setPerCost(e.target.value)}
                    required
                    className="border px-3 py-2 rounded w-full"
                    placeholder="Enter per cost"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg"
                >
                  Submit Payment
                </button>
                <button
                  type="button"
                  className="bg-black text-white px-4 py-2 rounded-lg ml-2"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {paymentDetails.length > 0 && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-pink-500">Payment Details</h2><br />
              <ul>
                {paymentDetails.map((payment) => (
                  <li key={payment._id} className="mb-2">
                    <strong>Driver: </strong>{payment.name}<br/><br/>
                    <strong>Number of Deliveries: </strong>{payment.numberOfDeliveries}<br/><br/>
                    <strong>Amount: </strong>{payment.totalAmount}<br/><br/>
                  </li>
                ))}
              </ul>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg"
                onClick={() => setPaymentDetails([])}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverPayroll;

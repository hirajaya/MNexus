import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PayrollForm = () => {
  const [AID, setAID] = useState('');
  const [artistDetails, setArtistDetails] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const fetchArtistDetails = async () => {
    try {
      const response = await axios.get(`/api/artistsales/${AID}`);
      setArtistDetails(response.data);
      setError('');
    } catch (err) {
      setError('Artist not found');
      setArtistDetails(null);
    }
  };

  const calculatePayroll = async () => {
    try {
      await axios.post('/api/payroll/calculate', { AID });
      toast.success('Payment slip has been generated');
      setSuccess('');
    } catch (err) {
      setError('Error calculating payroll');
      setSuccess('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchArtistDetails();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />

      <div className="absolute flex justify-center items-center w-full top-0 py-4">
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          onClick={() => navigate('/admin/payroll-table')}
        >
          View Payroll Table
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Artist Payment</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Artist AID:</label>
            <input
              type="text"
              value={AID}
              onChange={(e) => setAID(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter Artist AID"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Fetch Artist Details
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {artistDetails && (
          <div className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Artist Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {artistDetails.artistname}</p>
                <p><strong>Contact:</strong> {artistDetails.contact_number}</p>
                <p><strong>Email:</strong> {artistDetails.email}</p>
              </div>
              <div>
                <p><strong>Merch Sales:</strong> {artistDetails.merchandise_sales}</p>
                <p><strong>Album Sales:</strong> {artistDetails.album_sales}</p>
                <p><strong>Ticket Sales:</strong> {artistDetails.ticket_sales}</p>
              </div>
            </div>
            <button
              onClick={calculatePayroll}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md mt-4 transition duration-300 ease-in-out"
            >
              Calculate Payroll
            </button>
          </div>
        )}

        {success && <p className="text-green-500 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default PayrollForm;

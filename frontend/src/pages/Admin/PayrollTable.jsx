import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { FiSend } from 'react-icons/fi';

const PayrollTable = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    total_merchandise_sales: '',
    total_album_sales: '',
    total_ticket_sales: '',
    payroll_amount: '',
  });

  useEffect(() => {
    fetchPayrollDetails();
  }, []);

  const fetchPayrollDetails = async () => {
    try {
      const response = await axios.get('/api/payroll/all');
      setPayrolls(response.data);
    } catch (error) {
      console.error('Error fetching payroll details:', error);
    }
  };

  const handleDelete = async (AID) => {
    try {
      await axios.delete(`/api/payroll/${AID}`);
      setPayrolls(payrolls.filter((payroll) => payroll.AID !== AID));
    } catch (error) {
      console.error('Error deleting payroll:', error);
    }
  };

  const handleEditClick = (payroll) => {
    setIsEditing(payroll.AID);
    setEditFormData({
      total_merchandise_sales: payroll.total_merchandise_sales,
      total_album_sales: payroll.total_album_sales,
      total_ticket_sales: payroll.total_ticket_sales,
      payroll_amount: payroll.payroll_amount,
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveEdit = async (AID) => {
    try {
      await axios.put(`/api/payroll/${AID}`, editFormData);
      setPayrolls(
        payrolls.map((payroll) =>
          payroll.AID === AID ? { ...payroll, ...editFormData } : payroll
        )
      );
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating payroll:', error);
    }
  };

  const generatePDF = (payroll) => {
    const doc = new jsPDF();
    doc.text(`Payroll Slip for ${payroll.artistname}`, 10, 10);
    doc.text(`Artist AID: ${payroll.AID}`, 10, 20);
    doc.text(`Merchandise Sales: ${payroll.total_merchandise_sales}`, 10, 30);
    doc.text(`Album Sales: ${payroll.total_album_sales}`, 10, 40);
    doc.text(`Ticket Sales: ${payroll.total_ticket_sales}`, 10, 50);
    doc.text(`Payroll Amount: ${payroll.payroll_amount}`, 10, 60);

    const pdfBlob = doc.output('blob');

    doc.save(`Payroll_Slip_${payroll.AID}.pdf`);

    forwardPDFToArtistProfile(pdfBlob, payroll.AID);
  };

  const forwardPDFToArtistProfile = async (pdfBlob, AID) => {
    const formData = new FormData();
    formData.append('file', pdfBlob, `Payroll_Slip_${AID}.pdf`);

    try {
      await axios.post(`/api/artist/${AID}/upload-pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('PDF successfully forwarded to the artist profile.');
    } catch (error) {
      console.error('Error forwarding PDF to artist profile:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Payroll Details</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="py-2 px-4 border-b align-middle">Artist AID</th>
            <th className="py-2 px-4 border-b align-middle">Artist Name</th>
            <th className="py-2 px-4 border-b align-middle">Merch Sales</th>
            <th className="py-2 px-4 border-b align-middle">Album Sales</th>
            <th className="py-2 px-4 border-b align-middle">Ticket Sales</th>
            <th className="py-2 px-4 border-b align-middle">Payroll Amount</th>
            <th className="py-2 px-4 border-b align-middle"></th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll.AID} className="text-center">
              {isEditing === payroll.AID ? (
                <>
                  <td className="py-2 px-4 border-b align-middle">{payroll.AID}</td>
                  <td className="py-2 px-4 border-b align-middle">{payroll.artistname}</td>
                  <td className="py-2 px-4 border-b align-middle">
                    <input
                      type="number"
                      name="total_merchandise_sales"
                      value={editFormData.total_merchandise_sales}
                      onChange={handleEditFormChange}
                      className="border px-2 py-1 rounded-md w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    <input
                      type="number"
                      name="total_album_sales"
                      value={editFormData.total_album_sales}
                      onChange={handleEditFormChange}
                      className="border px-2 py-1 rounded-md w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    <input
                      type="number"
                      name="total_ticket_sales"
                      value={editFormData.total_ticket_sales}
                      onChange={handleEditFormChange}
                      className="border px-2 py-1 rounded-md w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    <input
                      type="number"
                      name="payroll_amount"
                      value={editFormData.payroll_amount}
                      onChange={handleEditFormChange}
                      className="border px-2 py-1 rounded-md w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                      onClick={() => handleSaveEdit(payroll.AID)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-md"
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b align-middle">{payroll.AID}</td>
                  <td className="py-2 px-4 border-b align-middle">{payroll.artistname}</td>
                  <td className="py-2 px-4 border-b align-middle">{payroll.total_merchandise_sales}</td>
                  <td className="py-2 px-4 border-b align-middle">{payroll.total_album_sales}</td>
                  <td className="py-2 px-4 border-b align-middle">{payroll.total_ticket_sales}</td>
                  <td className="py-2 px-4 border-b align-middle">{payroll.payroll_amount}</td>
                  <td className="py-2 px-4 border-b align-middle">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                      onClick={() => handleEditClick(payroll)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                      onClick={() => handleDelete(payroll.AID)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                      onClick={() => generatePDF(payroll)}
                    >
                      Generate PDF
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-md"
                      onClick={() => forwardPDFToArtistProfile(payroll.AID)}
                    >
                      <FiSend /> 
                    </button>
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

export default PayrollTable;

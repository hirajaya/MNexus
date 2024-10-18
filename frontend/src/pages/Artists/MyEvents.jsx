import React, { useState } from 'react';
import {
  useGetAllEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from '../../redux/features/event/eventApiSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MyEvents = () => {
  const { data: events, isLoading, isError, error } = useGetAllEventsQuery();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [editEventId, setEditEventId] = useState(null);
  const [formData, setFormData] = useState({
    eventname: '',
    date: '',
    venue: '',
    seatCount: '',
    eventGenre: '',
    description: '',
    ticketPrice: '',
  });

  const handleEdit = (event) => {
    setEditEventId(event.EID);
    setFormData({
      eventname: event.eventname,
      date: new Date(event.date).toISOString().split('T')[0],
      venue: event.venue,
      seatCount: event.seatCount,
      eventGenre: event.eventGenre,
      description: event.description,
      ticketPrice: event.ticketPrice,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({ EID: editEventId, updatedData: formData }).unwrap(); 
      setEditEventId(null); 
      toast.success('Event updated successfully'); 
    } catch (err) {
      toast.error('Failed to update the event'); 
      console.error('Failed to update the event: ', err);
    }
  };

  const handleDelete = async (EID) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(EID).unwrap();
        toast.success('Event deleted successfully'); 
      } catch (err) {
        toast.error('Failed to delete the event'); 
        console.error('Failed to delete the event: ', err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const exportPDF = () => {
    const input = document.getElementById('event-table');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = 290;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('ticket-sales.pdf');
    });
  };

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Error: {error?.data?.message || 'Failed to load events'}</p>;

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">My Events</h1>


      <button
        onClick={exportPDF}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ticket Sales
      </button>

      <table id="event-table" className="w-3/4 bg-white border text-center">
        <thead>
          <tr className="bg-pink-100 border-b">
            <th className="py-2 px-4">Event Name</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Venue</th>
            <th className="py-2 px-4">Seats</th>
            <th className="py-2 px-4">Reserved Seats</th>
            <th className="py-2 px-4">Genre</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.EID} className="border-b">
              <td className="py-2 px-4">{event.eventname}</td>
              <td className="py-2 px-4">{new Date(event.date).toLocaleDateString()}</td>
              <td className="py-2 px-4">{event.venue}</td>
              <td className="py-2 px-4">{event.seatCount}</td>
              <td className="py-2 px-4">{event.reservedSeats || 0}</td>
              <td className="py-2 px-4">{event.eventGenre}</td>
              <td className="py-2 px-4">Rs. {event.ticketPrice}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="bg-black text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.EID)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editEventId && (
        <form
          onSubmit={handleUpdate}
          className="mt-6 p-4 border rounded bg-gray-100 w-3/4 flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label className="block text-gray-700">Event Name</label>
              <input
                type="text"
                name="eventname"
                value={formData.eventname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Seat Count</label>
              <input
                type="number"
                name="seatCount"
                value={formData.seatCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Genre</label>
              <input
                type="text"
                name="eventGenre"
                value={formData.eventGenre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Ticket Price</label>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-pink-500 text-white px-4 py-2 rounded">
            Update Event
          </button>
        </form>
      )}
    </div>
  );
};

export default MyEvents;

import React, { useState } from 'react';
import { useCreateEventMutation } from '../../redux/features/event/eventApiSlice';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    eventname: '',
    date: '',
    venue: '',
    seatCount: '',
    eventGenre: '',
    description: '',
    ticketPrice: '',
  });
  const [createEvent, { isLoading, isSuccess, isError, error }] = useCreateEventMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData).unwrap();
      alert('Event created successfully!');
      setFormData({
        eventname: '',
        date: '',
        venue: '',
        seatCount: '',
        eventGenre: '',
        description: '',
        ticketPrice: '',
      });
    } catch (err) {
      console.error('Failed to create event: ', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Event Name</label>
            <input
              type="text"
              name="eventname"
              value={formData.eventname}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Seat Count</label>
            <input
              type="number"
              name="seatCount"
              value={formData.seatCount}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Event Genre</label>
            <input
              type="text"
              name="eventGenre"
              value={formData.eventGenre}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500 h-32"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Ticket Price</label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg transition-all duration-300 ${
              isLoading ? 'bg-purple-500 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Event'}
          </button>

          {isSuccess && <p className="mt-4 text-green-600 font-semibold text-center">Event created successfully!</p>}
          {isError && (
            <p className="mt-4 text-red-600 font-semibold text-center">Error: {error?.data?.message || 'Failed to create event'}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;

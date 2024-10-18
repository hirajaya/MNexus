import React, { useState, useEffect } from 'react';
import { useGetAllEventsQuery } from './redux/features/event/eventApiSlice.js';
import { FaTicketAlt } from 'react-icons/fa';
import axios from 'axios';

const EventTicketing = () => {
  const { data: events, isLoading, isError, error } = useGetAllEventsQuery();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [updatedEvents, setUpdatedEvents] = useState([]);

  useEffect(() => {
    if (selectedEvent) {
      setReservedSeats(selectedEvent.reservedSeats || []);
      setSelectedSeats([]);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (events) {
      setUpdatedEvents(events);
    }
  }, [events]);

  const closeModal = () => {
    setSelectedEvent(null); // Close the modal by resetting selectedEvent
    setSelectedSeats([]); // Reset selected seats when modal is closed
    setShowPaymentForm(false); // Close the payment form if open
  };

  const toggleSeatSelection = (seatIndex) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIndex));
    } else {
      setSelectedSeats([...selectedSeats, seatIndex]);
    }
  };

  const handleConfirm = async () => {
    const cost = selectedSeats.length * selectedEvent.ticketPrice;
    setTotalCost(cost);

    try {
      const response = await axios.post('/api/events/reserve-seats', {
        eventId: selectedEvent._id,
        seats: selectedSeats,
      });

      setReservedSeats([...reservedSeats, ...selectedSeats]);

      const updatedEventList = updatedEvents.map((event) => {
        if (event._id === selectedEvent._id) {
          return { ...event, seatCount: event.seatCount - selectedSeats.length };
        }
        return event;
      });
      setUpdatedEvents(updatedEventList);

      setShowPaymentForm(true);
    } catch (error) {
      alert('Failed to reserve seats: ' + error.response.data.message);
    }
  };

  if (isLoading) {
    return <p className="text-center text-lg">Loading events...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600">Error fetching events: {error?.data?.message || 'An error occurred'}</p>;
  }

  return (
    <div className="py-8 px-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold mb-10 text-gray-800">All Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl">
        {updatedEvents.map((event) => (
          <div
            key={event.EID}
            className="relative bg-white p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <FaTicketAlt className="absolute top-4 right-4 text-pink-500 text-4xl" />
            <h2 className="text-3xl font-semibold text-pink-600 mb-6">{event.eventname}</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Sales Till:</span>
                <span className="text-gray-600">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Venue:</span>
                <span className="text-gray-600">{event.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Genre:</span>
                <span className="text-gray-600">{event.eventGenre}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Ticket Price:</span>
                <span className="text-gray-600">Rs. {event.ticketPrice}</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-gray-700 text-base">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedEvent.eventname} - Seat Selection</h2>
            <p className="mb-6 text-gray-700">Please select your seats:</p>
            <div className="grid grid-cols-10 gap-2 mb-6">
              {[...Array(selectedEvent.seatCount).keys()].map((seatIndex) => (
                <div
                  key={seatIndex}
                  className={`w-6 h-6 rounded cursor-pointer ${
                    reservedSeats.includes(seatIndex)
                      ? 'bg-red-500'
                      : selectedSeats.includes(seatIndex)
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  onClick={() => !reservedSeats.includes(seatIndex) && toggleSeatSelection(seatIndex)}
                />
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={closeModal}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment</h2>
            <p className="mb-6 text-gray-700">Total cost: Rs. {totalCost}</p>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="1234 5678 9101 1121"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="123"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={closeModal}>
                  Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
                  Pay Rs. {totalCost}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTicketing;

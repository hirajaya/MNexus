import { useState } from 'react';
import { useCreateOfferMutation } from '../../redux/features/offers/offerApiSlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SalesMenu from './SalesMenu.jsx';

const Offer = ({ refetchOffers }) => {
  const [offername, setOffername] = useState('');
  const [offertype, setOffertype] = useState('');
  const [offermonth, setOffermonth] = useState('');
  const [offercode, setOffercode] = useState('');
  const [offeramount, setOfferamount] = useState('');
  const [offerdescription, setOfferdescription] = useState('');
  const navigate = useNavigate();

  const [createOffer, { isLoading: creatingOffer }] = useCreateOfferMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offername || !offertype || !offermonth || !offercode || !offeramount || !offerdescription) {
      toast.error("All fields are required.");
      return;
    }

    const offerData = {
      offername,
      offertype,
      offermonth,
      offercode,
      offeramount,
      offerdescription,
    };

    try {
      const { data } = await createOffer(offerData);
      if (data && !data.error) {
        toast.success("Offer created successfully!");
        refetchOffers();
        navigate("/salesM/alloffers");
      }
    } catch (error) {
      console.error("Offer creation error:", error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="p-3 md:w-3/4">
        <h2 className="text-2xl mb-4">Create Offer</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="offername" className="block mb-1">Offer Name</label>
            <input
              type="text"
              value={offername}
              onChange={(e) => setOffername(e.target.value)}
              required
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="offertype" className="block mb-1">Offer Type</label>
            <input
              type="text"
              value={offertype}
              onChange={(e) => setOffertype(e.target.value)}
              required
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="offermonth" className="block mb-1">Offer Month</label>
            <select
              value={offermonth}
              onChange={(e) => setOffermonth(e.target.value)}
              required
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            >
              <option value="" disabled>Select a month</option>
              {[
                'January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
                <label htmlFor="offercode" className="block mb-1">Offer Code</label>
                <input
                  type="text"
                  value={offercode}
                  onChange={(e) => {
                    const formattedValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    setOffercode(formattedValue);
                  }}
                  required
                  className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
                />
                {!offercode && <p className="text-red-500">Please input the offer code or PIN!</p>}
                {offercode && !/^[A-Z0-9]+$/.test(offercode) && (
                  <p className="text-red-500">Offer code or PIN must be alphanumeric and uppercase letters only!</p>
                )}
          </div>

          <div className="mb-4">
            <label htmlFor="offeramount" className="block mb-1">Offer Amount</label>
            <input
              type="number"
              value={offeramount}
              onChange={(e) => setOfferamount(e.target.value)}
              required
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="offerdescription" className="block mb-1">Offer Description</label>
            <input
              type="text"
              value={offerdescription}
              onChange={(e) => setOfferdescription(e.target.value)}
              required
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <button
            type="submit"
            className={`py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white ${creatingOffer ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={creatingOffer}
          >
            {creatingOffer ? 'Creating...' : 'Create Offer'}
          </button>
        </form>
      </div>
      <SalesMenu />
    </div>
  );
};

export default Offer;

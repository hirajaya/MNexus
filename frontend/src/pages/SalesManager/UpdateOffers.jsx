import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOfferByIdQuery, useUpdateOfferMutation } from "../../redux/features/offers/offerApiSlice.js";
import { toast } from "react-toastify";
import SalesMenu from './SalesMenu.jsx'; 

const UpdateOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: offer, isLoading, isError } = useGetOfferByIdQuery(id);
  const [updateOffer, { isLoading: updatingOffer }] = useUpdateOfferMutation();
  
  const [offername, setOffername] = useState("");
  const [offertype, setOffertype] = useState("");
  const [offermonth, setOffermonth] = useState("");
  const [offercode, setOffercode] = useState("");
  const [offeramount, setOfferamount] = useState("");
  const [offerdescription, setOfferdescription] = useState("");

  useEffect(() => {
    if (offer) {
      setOffername(offer.offername || "");
      setOffertype(offer.offertype || "");
      setOffermonth(offer.offermonth || "");
      setOffercode(offer.offercode || "");
      setOfferamount(offer.offeramount || "");
      setOfferdescription(offer.offerdescription || "");
    }
  }, [offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedOfferData = {
      offername,
      offertype,
      offermonth,
      offercode,
      offeramount,
      offerdescription,
    };

    try {
      await updateOffer({ id, updatedOffer: updatedOfferData }).unwrap();
      toast.success("Offer updated successfully!");
      navigate("/salesM/offerlist"); 
    } catch (error) {
      console.error("Error updating offer:", error);
      toast.error("Failed to update offer. Try again.");
    }
  };

  if (isLoading) {
    return <div>Loading offer data...</div>;
  }

  if (isError) {
    return <div>Error loading offer data.</div>;
  }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="p-3 md:w-3/4">
        <h2 className="text-2xl mb-4">Update Offer</h2>
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
              className="p-4 w-full border rounded-lg bg-[#fdfdfd] text-black"
            >
              <option value="" disabled>Select a month</option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="offercode" className="block mb-1">Offer Code</label>
            <input 
              type="text" 
              value={offercode} 
              onChange={(e) => setOffercode(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
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
            className={`py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white ${updatingOffer ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={updatingOffer} 
          >
            {updatingOffer ? 'Updating...' : 'Update Offer'}
          </button>
        </form>
      </div>
      <SalesMenu />
    </div>
  );
};

export default UpdateOffer;

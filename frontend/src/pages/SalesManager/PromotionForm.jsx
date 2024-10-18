import { useState } from 'react';
import { useCreatePromotionMutation } from '../../redux/features/promotions/promotionApiSlice.js';
import { useAllProductsQuery } from '../../redux/api/productApiSlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SalesMenu from './SalesMenu.jsx';

const PromotionForm = ({ refetchPromotions }) => { 
  const [product1, setProduct1] = useState('');
  const [product2, setProduct2] = useState('');
  const [promotionType, setPromotionType] = useState('');
  const [description, setDescription] = useState('');
  const [deduction, setDeduction] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const navigate = useNavigate();

  const { data: products, isLoading: productsLoading } = useAllProductsQuery();
  const [createPromotion, { isLoading: creatingPromotion }] = useCreatePromotionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product1 || !product2 || !promotionType || !description || !deduction || !validFrom || !validTo) {
      toast.error("All fields are required.");
      return;
    }

    if (new Date(validFrom) >= new Date(validTo)) {
      toast.error("Valid 'To' date must be later than 'From' date.");
      return;
    }

    const promotionData = {
      product1,
      product2,
      promotionType,
      description,
      deduction,
      validFrom,
      validTo,
    };

    try {
      const { data } = await createPromotion(promotionData);
      if (data && !data.error) {
        toast.success("Promotion created successfully!");
        refetchPromotions();
        navigate("/salesM/allpromotions");
      }
    } catch (error) {
      console.error("Promotion creation error:", error);
    }
  };

  if (productsLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="p-3 md:w-3/4">
        <h2 className="text-2xl mb-4">Create Promotion</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="product1" className="block mb-1">Select Merchandise 1</label>
            <select 
              value={product1} 
              onChange={(e) => setProduct1(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#fdfdfd] text-black"
            >
              <option value="" disabled>Select a product</option>
              {products?.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="product2" className="block mb-1">Select Merchandise 2</label>
            <select 
              value={product2} 
              onChange={(e) => setProduct2(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#fdfdfd] text-black"
            >
              <option value="" disabled>Select a product</option>
              {products?.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="promotionType" className="block mb-1">Promotion Name</label>
            <input 
              type="text" 
              value={promotionType} 
              onChange={(e) => setPromotionType(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="deduction" className="block mb-1">Deduction (%)</label>
            <input 
              type="text" 
              value={deduction} 
              onChange={(e) => setDeduction(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="validFrom" className="block mb-1">Valid From</label>
            <input 
              type="date" 
              value={validFrom} 
              onChange={(e) => setValidFrom(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="validTo" className="block mb-1">Valid To</label>
            <input 
              type="date" 
              value={validTo} 
              onChange={(e) => setValidTo(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <button 
            type="submit" 
            className={`py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white ${creatingPromotion ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={creatingPromotion} 
          >
            {creatingPromotion ? 'Creating...' : 'Create Promotion'}
          </button>
        </form>
        <SalesMenu />
      </div>
    </div>
  );
};

export default PromotionForm;

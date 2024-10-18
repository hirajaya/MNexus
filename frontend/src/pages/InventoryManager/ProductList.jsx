import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { useGetAllArtistsQuery } from '../../redux/api/artistsApiSlice';
import { toast } from 'react-toastify';
import InventoryMenu from './InventoryMMenu';

const ProductList = () => {
    const[image, setImage] = useState('')
    const[name, setName] = useState('')
    const[description, setDescription] = useState('')
    const[price, setPrice] = useState('')
    const[category, setCategory] = useState('')
    const[quantity, setQuantity] = useState('')
    const[artist, setArtist] = useState('')
    const[stock, setStock] = useState('0')
    const[imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()

    const[uploadProductImage] = useUploadProductImageMutation()
    const[createProduct] = useCreateProductMutation()
    const{ data: categories } = useFetchCategoriesQuery()
    const { data: artists } = useGetAllArtistsQuery()

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const productData = new FormData();
        productData.append("image", image);
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("category", category);
        productData.append("quantity", quantity);
        productData.append("artist", artist);
        productData.append("countInStock", stock);
  
        const { data } = await createProduct(productData);
  
        if (data.error) {
          toast.error("Product creation failed. Try again.");
        } else {
          toast.success(`${data.name} is created`);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Product creation failed. Try again.");
      }
    };

    const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
        setImageUrl(res.imageUrl);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    };
  
    return (
      <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <InventoryMenu />
          <div className="md:w-3/4 p-3">
            <div className="h-12">Add Merchandise</div>

            {imageUrl && (
              <div className="text-center">
                <img src={imageUrl} alt="product" className='block mx-auto max-h-[200px]' />
              </div>
            )}

            <div className="mb-3">
              <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload Image"}

                <input type="file" name='image' accept="image/*" onChange={uploadFileHandler} className={!image ? "hidden" : "text-black"} />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor='name'>Name</label> <br/>
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#ffffff] text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two ml-10">
                  <label htmlFor='price'>Price</label> <br/>
                  <input
                    type="number"
                    className="ml-2 p-4 mb-3 w-[30rem] border rounded-lg bg-[#ffffff] text-black"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor='quantity'>Quantity</label> <br/>
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#ffffff] text-black"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="two ml-10">
                  <label htmlFor='artist'>Artist</label> <br/>
                  <select 
                    className="ml-2 p-4 mb-3 w-[30rem] border rounded-lg bg-[#ffffff] text-black"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  >
                    <option value="">Select Artist</option>
                    {artists?.map((artist) => (
                      <option key={artist.AID} value={artist.AID}>
                        {artist.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label htmlFor='description'>Description</label>
              <textarea
                className="p-2 mb-3 bg-[#ffffff] border rounded-lg w-[95%] text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="flex justify-between">
                <div>
                  <label htmlFor="stock">Count In Stock</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#f8f8f9] text-black"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="category">Category</label> <br />
                  <select 
                    className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#fdfdfd] text-black'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white">Submit</button>

            </div>
          </div>
        </div>
      </div>
    );
};
  
export default ProductList;

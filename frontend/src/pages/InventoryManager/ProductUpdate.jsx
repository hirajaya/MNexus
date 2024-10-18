import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';

const ProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [artist, setArtist] = useState(productData?.artist || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setArtist(productData.artist);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await uploadProductImage(formData);
      setImage(data.url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id: params._id,
        name,
        description,
        price,
        image,
        category,
        quantity,
        artist,
        countInStock: stock
      });
      toast.success('Product updated successfully');
      navigate('/inventoryM/allproductslist');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(params._id);
        toast.success('Product deleted successfully');
        navigate('/inventoryM/allproductslist');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update Merchandise</div>

          {image && (
            <div className="text-center">
              <img src={image} alt="product" className='block mx-auto max-h-[200px]' />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}
              <input type="file" name='image' accept="image/*" onChange={handleImageUpload} className={!image ? "hidden" : "text-black"} />
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
                <label htmlFor='category'>Category</label> <br/>
                <select
                  className='ml-2 p-4 mb-3 w-[30rem] border rounded-lg bg-[#fdfdfd] text-black'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
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
                <label htmlFor="artist">Artist</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#f8f8f9] text-black"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
            </div>

            <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white">Update</button>
            <button onClick={handleDelete} className="py-4 px-10 mt-5 ml-5 rounded-lg text-lg font-bold bg-red-600 text-white">Delete</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;

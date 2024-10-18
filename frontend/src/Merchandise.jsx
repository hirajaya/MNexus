import { Link } from "react-router-dom";
import { useAllProductsQuery } from "./redux/api/productApiSlice";
import { FiShoppingCart } from "react-icons/fi";

const Allmerch = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  const addToCart = (product) => {
    console.log(`Added ${product.name} to cart!`);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Products ({products.length})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            style={{ minHeight: '400px' }} 
          >
            <Link to={`/admin/product/update/${product._id}`} className="block">
              <img
                src={product.image || '/placeholder-image.png'} 
                alt={product.name || 'Unnamed Product'} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{product.name || 'Product Name'}</h5>
                <p className="text-lg font-bold text-pink-600">Rs {product.price || 'N/A'}</p>
                <p className="text-sm text-gray-500">In Stock: {product.quantity || 'N/A'}</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                  >
                    <FiShoppingCart className="text-xl mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allmerch;

import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import { FaShoppingCart, FaTags, FaMusic, FaList } from "react-icons/fa"; 
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-200 to-white"> {/* Full Page Gradient */}
      {!keyword ? <Header /> : null}
      
      <div className="flex-grow">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data.message || isError.error}
          </Message>
        ) : (
          <div className="flex justify-center items-center mt-[10rem] space-x-6">
            <h1 className="text-[3rem]"></h1>
            <Link
              to="/merchandise"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 text-white flex items-center space-x-2"
            >
              <FaShoppingCart className="text-white" />
              <span>Shop</span>
            </Link>
            <Link
              to="/useroffers"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 text-white flex items-center space-x-2"
            >
              <FaTags className="text-white" />
              <span>Offers</span>
            </Link>
            <Link
              to="/albums"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 text-white flex items-center space-x-2"
            >
              <FaMusic className="text-white" />
              <span>Albums</span>
            </Link>
            <Link
              to="/playlists"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 text-white flex items-center space-x-2"
            >
              <FaList className="text-white" />
              <span>Playlists</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

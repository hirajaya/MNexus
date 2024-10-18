import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[15rem] ml-[-1rem] p-3">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-[10rem] w-[10rem] object-cover rounded-lg"
          />
          <FcLike product={product} />
        </div>

        <div className="p-4 w-full text-center">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex flex-col justify-between items-center">
              <div>{product.name}</div>
              <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                Rs. {product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;

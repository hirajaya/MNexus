import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SalesMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/salesM/allpromotions"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                View Promotions
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/salesM/promotions"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Promotion
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/salesM/offers"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Offer
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/salesM/offerlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                View Offers
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default SalesMenu;
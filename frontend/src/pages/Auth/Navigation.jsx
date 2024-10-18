import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaHome, FaShoppingBag, FaSignInAlt } from 'react-icons/fa';
import { FaFileAudio, FaCartShopping, FaTicket } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';

const Navigation = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ zIndex: 999 }}
            className={`${showSidebar ? 'hidden' : 'flex'}
            xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id='navigation-container'
        >

            <div className="flex flex-col justify-start space-y-4 flex-grow">
                <Link
                    to="/"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaHome className="mr-2 mt-[2rem]" size={20} />
                    <span className="hidden nav-item-name mt-[2rem] text-sm">HOME</span>{" "}
                </Link>

                <Link
                    to="/merchandise"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaShoppingBag className="mr-2 mt-[2rem]" size={20} />
                    <span className="hidden nav-item-name mt-[2rem] text-sm">MERCHANDISE</span>{" "}
                </Link>

                <Link
                    to="/music"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaFileAudio className="mr-2 mt-[2rem]" size={20} />
                    <span className="hidden nav-item-name mt-[2rem] text-sm">MUSIC</span>{" "}
                </Link>

                <Link
                    to="/tickets"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaTicket className="mr-2 mt-[2rem]" size={20} />
                    <span className="hidden nav-item-name mt-[2rem] text-sm">TICKETS</span>{" "}
                </Link>

                <Link
                    to="/cart">
                   <div className="flex items-center transition-transform transform hover:translate-x-2">
                    <FaCartShopping className="mr-2 mt-[2rem]" size={20} />
                    <span className="hidden nav-item-name mt-[2rem] text-sm">CART</span>{" "}

                  <div className="absolute top-9">
                  {cartItems.length > 0 && (
                  <span>
                    <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  </span>
                  )}
                  </div>
                  </div>
                </Link>

            </div>

            <div className='relative flex flex-col items-center'>
                {userInfo && (
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center text-gray-800 focus:outline-none"
                    >
                        <span className="text-white text-sm">{userInfo.username}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-3 w-3 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7" }
                            />
                        </svg>
                    </button>
                )}

                {dropdownOpen && userInfo && (
                  <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
                    !userInfo?.isSalesM ? "-top-20" : "-top-80"
                  }`}>
                    
                    {userInfo?.isAdmin && (
                    <>
                      <li>
                        <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                          Artist Payment
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/dpayroll" className="block px-4 py-2 hover:bg-gray-100">
                          Delivery Payment 
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/artistlist" className="block px-4 py-2 hover:bg-gray-100">
                          Artists 
                        </Link>
                      </li>
                    </>
                    )}

                    {userInfo.isSalesM && (
                      <>
                      <li className="relative">
                        <Link to="/salesM/sdashboard" className="block px-4 py-2 hover:bg-gray-100">
                          Dashboard
                        </Link>
                      </li>
                      <li className="relative">
                        <Link to="/salesM/promotions" className="block px-4 py-2 hover:bg-gray-100">
                          Promotions
                        </Link>
                      </li>
                      <li className="relative">
                        <Link to="/salesM/offers" className="block px-4 py-2 hover:bg-gray-100">
                          Offers
                        </Link>
                      </li>
                      <li className="relative"> 
                        <Link to="/salesM/refunds" className="block px-4 py-2 hover:bg-gray-100">
                          Refunds
                        </Link>
                      </li>
                      </>
                    )}

                    {userInfo.isInventoryM && (
                      <>
                      <li>
                        <Link to="/inventoryM/indashboard" className="block px-4 py-2 hover:bg-gray-100">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/inventoryM/merchlist" className="block px-4 py-2 hover:bg-gray-100">
                          Merchandise
                        </Link>
                      </li>
                      </>
                    )}
                    {userInfo.isOrderM && (
                      <>
                      <li>
                        <Link to="/orderM/omdashboard" className="block px-4 py-2 hover:bg-gray-100">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/orderM/orders" className="block px-4 py-2 hover:bg-gray-100">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/orderM/drivers" className="block px-4 py-2 hover:bg-gray-100">
                          Drivers
                        </Link>
                      </li>
                      </>
                    )}
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}

                {!userInfo && (
                <div className="flex flex-col space-y-4">
                    <Link
                        to="/login"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                    >
                        <FaSignInAlt className="mr-2 mt-[1rem]" size={20} />
                        <span className="hidden nav-item-name text-sm">LOGIN</span>{" "}
                    </Link>

                    <Link
                        to="/register"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                    >
                        <AiOutlineUserAdd className="mr-2 mt-[1rem]" size={20} />
                        <span className="hidden nav-item-name text-sm">REGISTER</span>{" "}
                    </Link>
                </div>
                )}
            </div>
        </div>
    );
};

export default Navigation;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

import PrivateRoute from './components/PrivateRoute.jsx';

import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

import Profile from './pages/User/Profile.jsx';

import CategoryList from './pages/InventoryManager/CategoryList.jsx';
import ProductList from './pages/InventoryManager/ProductList.jsx';
import AllProducts from './pages/InventoryManager/AllProducts.jsx';
import ProductUpdate from './pages/InventoryManager/ProductUpdate.jsx';
import Merch from './pages/Merch.jsx';
import Home from './pages/Home.jsx';
import Music from './pages/Music.jsx';
import ProductDetails from './pages/Merchandise/ProductDetails.jsx';

import Cart from './pages/Cart.jsx';
import Delivery from './pages/Orders/Delivery.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';

import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import Order from './pages/Orders/Order.jsx';
import UserOrder from './pages/User/UserOrder.jsx';
import OrderMRoute from './pages/OrderManager/OrderMRoute.jsx';
import OrderList from './pages/OrderManager/OrderList.jsx';
import SalesMRoute from './pages/SalesManager/SalesMRoute.jsx';
import InventoryRoute from './pages/InventoryManager/InventoryMRoute.jsx';
import PromotionForm from './pages/SalesManager/PromotionForm.jsx';
import PromotionList from './pages/SalesManager/PromotionList.jsx';
import UpdatePromotionForm from './pages/SalesManager/UpdatePromotionForm.jsx';
import SalesDashboard from './pages/SalesManager/SalesDashboard.jsx';
import Inquiry from './pages/Orders/Inquiry.jsx';
import InquiryList from './pages/Orders/InquiryList.jsx';
import RefundVerification from './pages/SalesManager/RefundVerification.jsx';
import InquiryDetails from './pages/SalesManager/InquiryDetails.jsx';
import OrderDashboard from './pages/OrderManager/OrderDashboard.jsx';
import Offers from './pages/SalesManager/Offers.jsx';
import OffersList from './pages/SalesManager/OffersList.jsx';
import UpdateOffer from './pages/SalesManager/UpdateOffers.jsx';
import UserOffers from './pages/Offers.jsx';
import ArtistLogin from './pages/Auth/ArtistLogin.jsx';
import ArtistProfile from './pages/Artists/ArtistProfile.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import ArtistList from './pages/Admin/ArtistList.jsx';
import ArtistMusic from './pages/Artists/ArtistMusic.jsx';
import DriversList from './pages/OrderManager/DriversList.jsx';
import DriverPayroll from './pages/Admin/DriverPayroll.jsx';
import Posts from './pages/Artists/Posts.jsx';
import ArtistLayout from './pages/Artists/ArtistLayout.jsx'
import InventoryDashboard from './pages/InventoryManager/InventoryDashboard.jsx';
import MusicList from './pages/Artists/MusicList.jsx';
import Events from './pages/Artists/Events.jsx';
import ArtistAlbums from './pages/Artists/ArtistAlbums.jsx';
import Albums from './pages/Albums.jsx';
import ArtistRegistration from './pages/Auth/ArtistRegistration.jsx';
import EventTicketing from './EventTicketing.jsx';
import MyEvents from './pages/Artists/MyEvents.jsx';
import MyMusic from './pages/Artists/MyMusic.jsx';
import Playlists from './pages/Playlists.jsx';
import ArtistPayroll from './pages/Admin/ArtistPayroll.jsx';
import PayrollTable from './pages/Admin/PayrollTable.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/artistLogin' element={<ArtistLogin />} />
    <Route path='/artistreg' element={<ArtistRegistration />} />
      
      <Route path="/artist/profile/:AID" element={
        <ArtistLayout>
          <ArtistProfile />
        </ArtistLayout>
      } />
      
      <Route path="/artist/music/:AID" element={
        <ArtistLayout>
          <ArtistMusic />
        </ArtistLayout>
      } />
      
      <Route path="/artist/posts/:AID" element={
        <ArtistLayout>
          <Posts />
        </ArtistLayout>
      } />

      <Route path="/artist/musiclist/:AID" element={
        <ArtistLayout>
          <MusicList/>
        </ArtistLayout>
      } />

      <Route path="/artist/events/:AID" element={
        <ArtistLayout>
          <Events/>
        </ArtistLayout>
      } />

    <Route path="/artist/albums/:AID" element={
        <ArtistLayout>
          <ArtistAlbums/>
        </ArtistLayout>
      } />

    <Route path="/artist/myevents/:AID" element={
        <ArtistLayout>
          <MyEvents/>
        </ArtistLayout>
      } />

    <Route path="/artist/mymusic/:AID" element={
        <ArtistLayout>
          <MyMusic/>
        </ArtistLayout>
      } />

    <Route path="/" element={<App />}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route index={true} path='/' element={<Home/>}/>
        <Route path='/merchandise' element={<Merch/>}/>
        <Route path='/music' element={<Music/>}/>
        <Route path='product/:id' element={<ProductDetails/>}/>
        <Route path='/user-orders' element={<UserOrder/>}/>
      
      <Route path ='' element={<PrivateRoute/>} >
        <Route path ='/profile' element={<Profile/>} />
        <Route path = '/cart' element={<Cart/>}/>
        <Route path ='/delivery' element={<Delivery/>} />
        <Route path ='/placeorder' element={<PlaceOrder/>} />
        <Route path ='/order/:id' element={<Order/>} />
        <Route path="/inquiry/:id" element={<Inquiry />} />
        <Route path="/inquiry/inquiryList" element={<InquiryList />} />
        <Route path="/useroffers" element={<UserOffers />} />
        <Route path='/playlists' element={<Playlists/>}/>
        <Route path='/albums' element={<Albums/>}/>
        <Route path='/tickets' element={<EventTicketing/>}/>
      </Route>

      <Route path = '/admin' element={<AdminRoute/>}>
        <Route path = '/admin/artistlist' element={<ArtistList/>}/>
        <Route path = '/admin/dpayroll' element={<DriverPayroll/>}/>
        <Route path = '/admin/dashboard' element={<ArtistPayroll/>}/>
        <Route path='/admin/payroll-table' element={<PayrollTable/>}/>
      </Route>


      <Route path = '/inventoryM' element={<InventoryRoute/>}>
        <Route path = '/inventoryM/categorylist' element={<CategoryList/>} />
        <Route path = '/inventoryM/merchlist' element={<ProductList/>}/>
        <Route path = '/inventoryM/allproductslist' element ={<AllProducts/>}/>
        <Route path = '/inventoryM/product/update/:_id' element={<ProductUpdate/>}/>
        <Route path = '/inventoryM/indashboard' element ={<InventoryDashboard/>}/>
      </Route>

      <Route path = '/orderM' element={<OrderMRoute/>}>
        <Route path = '/orderM/orders' element={<OrderList/>}/>
        <Route path = '/orderM/omdashboard' element={<OrderDashboard/>}/>
        <Route path = '/orderM/drivers' element={<DriversList/>}/>
      </Route>

      <Route path = '/salesM' element={<SalesMRoute/>}>
        <Route path = '/salesM/promotions' element={<PromotionForm/>}/>
        <Route path = '/salesM/allpromotions' element={<PromotionList/>}/>
        <Route path="/salesM/promotion/update/:id" element={<UpdatePromotionForm />} />
        <Route path="/salesM/sdashboard" element={<SalesDashboard />} />
        <Route path="/salesM/refunds" element={<RefundVerification />} />
        <Route path="/salesM/offers" element={<Offers />} />
        <Route path="/salesM/offerlist" element={<OffersList />} />
        <Route path="/salesM/offer/update/:id" element={<UpdateOffer />} />
        <Route path="/salesM/refunds/sales/inquiry/:id" element={<InquiryDetails />} />
      </Route>

    </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router}/>
    </PayPalScriptProvider>
  </Provider>
);

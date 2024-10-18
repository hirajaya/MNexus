import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from '../../components/Loader';
import { useProfileMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaRegComment } from 'react-icons/fa';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone]= useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

const { userInfo } = useSelector((state => state.auth));

const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

useEffect(() => {
    setUsername(userInfo.username);
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setPassword(userInfo.password);
    setConfirmPassword(userInfo.confirmPassword);
  }, [userInfo.confirmPassword,userInfo.password,userInfo.phone,userInfo.email,userInfo.name, userInfo.username]);

const dispatch = useDispatch();

const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          name,
          email,
          phone,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[1rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

        <form onSubmit={submitHandler}>

        <div className="mb-4">
              <label className="block text-black mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
        </div>

        <div className="mb-4">
              <label className="block text-black mb-2">Name</label>
              <input
                type="text"
                className="form-input p-4 rounded-sm w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

        <div className="mb-4">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
        </div>

        <div className="mb-4">
              <label className="block text-black mb-2">Phone</label>
              <input
                type="tel"
                className="form-input p-4 rounded-sm w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
        </div>

        <div className="mb-4">
              <label className="block text-black mb-2">Password</label>
              <input
                type="password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
        </div>

        <div className="mb-4">
              <label className="block text-black mb-2">Confirm Password</label>
              <input
                type="password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
        </div>

        <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">
                My Orders
              </Link>
            </div>
        </form>
        </div> 
        
        {loadingUpdateProfile && <Loader />} 
        </div>
      
    </div>
  )
}

export default Profile

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterArtistMutation } from '../../redux/api/artistsApiSlice';
import { toast } from 'react-toastify';

const RegisterArtist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    artistType: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const navigate = useNavigate();
  const [registerArtist, { isLoading, isError }] = useRegisterArtistMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (formData.name.length > 50) {
      newErrors.name = "Full name must be less than 50 characters.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.phoneNumber.length !== 10 || isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    if (formData.username.length > 15) {
      newErrors.username = "Username must be less than 15 characters.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include letters, numbers, and special characters.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setShowToast(true);
    }
  };

  const handleVerificationChange = (e) => {
    setVerificationId(e.target.value);
  };

  const handleVerify = async () => {
    if (verificationId === 'A123$567') {
      try {
        await registerArtist(formData).unwrap();
        navigate('/artistLogin');
      } catch (error) {
        console.error('Registration error:', error);
      }
    } else {
      toast.error('Invalid Verification ID. Please try again.');
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="w-[50%] p-8">
        <h1 className="text-2xl font-semibold mb-4">Register as Artist</h1>
        {isError && <p className="text-red-500">Failed to register. Please try again.</p>}
        {showToast && (
          <div className="bg-pink-100 text-black p-2 rounded mb-4">
            <p>Please enter the Verification ID:</p>
            <input
              type="text"
              value={verificationId}
              onChange={handleVerificationChange}
              className='mt-1 p-2 border rounded w-full'
            />
            <button
              onClick={handleVerify}
              className='bg-red-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
            >
              Verify
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="container w-[40rem]">
          <div className='my-[1rem]'>
            <label htmlFor='name' className="block text-sm font-medium text-black">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              className='mt-1 p-2 border rounded w-full' 
              value={formData.name} 
              onChange={handleChange} 
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className='my-[1rem]'>
            <label htmlFor='email' className="block text-sm font-medium text-black">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className='mt-1 p-2 border rounded w-full' 
              value={formData.email} 
              onChange={handleChange} 
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className='my-[1rem]'>
            <label htmlFor='phoneNumber' className="block text-sm font-medium text-black">Contact Number</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber"
              className='mt-1 p-2 border rounded w-full' 
              value={formData.phoneNumber} 
              onChange={handleChange} 
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          </div>

          <div className='my-[1rem]'>
            <label htmlFor='artistType' className="block text-sm font-medium text-black">Artist Type</label>
            <input 
              type="text" 
              id="artistType" 
              name="artistType"
              className='mt-1 p-2 border rounded w-full' 
              value={formData.artistType} 
              onChange={handleChange} 
            />
          </div>

          <div className='my-[1rem]'>
            <label htmlFor='username' className="block text-sm font-medium text-black">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username"
              className='mt-1 p-2 border rounded w-full' 
              value={formData.username} 
              onChange={handleChange} 
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>

          <div className='my-[1rem]'>
            <label htmlFor='password' className="block text-sm font-medium text-black">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              className='mt-1 p-2 border rounded w-full' 
              value={formData.password} 
              onChange={handleChange} 
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          <button
            disabled={isLoading}
            type='submit'
            className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
          >
            {isLoading ? "Registering.." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterArtist;

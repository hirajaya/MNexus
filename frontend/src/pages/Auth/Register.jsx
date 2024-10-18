import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast} from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/usersApiSlice';
import reg from '../../assets/reg.gif'

const Register = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone]= useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} =useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
        } else {
          try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("User successfully registered");
          } catch (err) {
            console.log(err);
            toast.error(err.data.message);
          }
        }
      };

  return (<section className="pl-[10rem] flex flex-wrap ">
    <div className="w-[50%] p-8">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit = {submitHandler} classname = "container w-[40rem]">

            <div className='my-[1rem]'>
                <label htmlFor='username' classname="block text -sm font-medium text-white">
                    Username
                </label>
                <input 
                    type="text" 
                    id="username" 
                    className='mt-1 p-2 border rounded w-full' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} />
            </div>

           < div className='my-[1rem]'>
                <label htmlFor='name' classname="block text -sm font-medium text-white">
                    Full Name
                </label>
                <input 
                    type="text" 
                    id="name" 
                    className='mt-1 p-2 border rounded w-full' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='my-[1rem]'>
                <label htmlFor='email' classname="block text -sm font-medium text-white">
                    Email
                </label>
                <input 
                    type="email" 
                    id="email" 
                    className='mt-1 p-2 border rounded w-full' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='my-[1rem]'>
                <label htmlFor='phone' classname="block text -sm font-medium text-white">
                    Contact Number
                </label>
                <input 
                    type="tel" 
                    id="phone" 
                    className='mt-1 p-2 border rounded w-full' 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className='my-[1rem]'>
                <label htmlFor='password' classname="block text -sm font-medium text-white">
                    Password
                </label>
                <input 
                    type="password" 
                    id="password" 
                    className='mt-1 p-2 border rounded w-full' 
                    placeholder="Create a password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='my-[1rem]'>
                <label htmlFor='confirmPassword' classname="block text -sm font-medium text-white">
                    Confirm Password
                </label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    className='mt-1 p-2 border rounded w-full' 
                    placeholder="Reenter the password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <button
                disabled={isLoading}
                type='submit'
                className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
            >
            {isLoading ? "Registering.." : "Register"}
            </button>

            {isLoading && <Loader/>}

        </form>

        <div className="mt-4">
          <p className="text-black">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline">
            Login
            </Link>
          </p>
        </div>
    </div>
    <div className="w-[50%] flex items-center justify-center">
        <img
          src={reg}
          alt="Registration"
          className="w-full h-auto max-w-[500px] rounded-lg"
        />
      </div>
  </section>
  )
}

export default Register

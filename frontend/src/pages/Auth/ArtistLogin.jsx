import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Import Link
import { useSelector } from 'react-redux';
import { useArtistLoginMutation } from '../../redux/api/artistsApiSlice'; 
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import mnlogo from '../../assets/mnlogo.jpg';

const ArtistLogin = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [artistLogin, { isLoading }] = useArtistLoginMutation(); 
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/"; 

  useEffect(() => {
    if (userInfo) {
      navigate('/artist/profile'); 
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await artistLogin({ email, password }).unwrap(); 
      console.log("Login response:", res); 
  
      const artistId = res.AID; 
      if (artistId) {
        navigate(`/artist/profile/${artistId}`); 
      } else {
        toast.error("Artist ID not found in response.");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-nowrap justify-between items-start">
        <div className="mr-[4rem] mt-[5rem] w-[40%]">
          <h1 className="text-2xl font-semibold mb-4">Artist Sign In</h1>

          <form onSubmit={submitHandler} className="w-full">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <button
              onClick={() => navigate('/artistreg')}
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Artist Registration
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => navigate('/login')}
              className="text-pink-500 underline cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="w-[60%] flex justify-center items-start mt-[2rem]">
          <div
            className="h-[35rem] w-[35rem] relative overflow-hidden"
            style={{
              borderRadius: '50%',
              backgroundImage: `url(${mnlogo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, transparent 70%, rgba(255, 255, 255, 0.5) 100%)',
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistLogin;

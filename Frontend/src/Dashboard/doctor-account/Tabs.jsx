import React, { useContext, useState } from 'react';
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { BASE_URL, token } from '../../../config';
import useFetchData from '../../hooks/useFetchData';


const Tabs = ({ tab, setTab }) => {

  const { dispatch } = useContext(authContext);
  const { data: userData } = useFetchData(`${BASE_URL}/doctors/profile/me`);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);



  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login')
  };


  const handleDeleteAccount = async event => {
    event.preventDefault();
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/doctors/${userData._id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const { message } = await response.json()

      if (!response.ok) {
        throw new Error(message)
      }

      toast.success(message);
      dispatch({ type: "LOGOUT" });
      navigate('/login');


    } catch (err) {
      toast.error(err.message)
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the menu open state
  };


  return (
    <div>
      <span className='lg:hidden'>
        <BiMenu className='w-6 h-6 cursor-pointer' onClick={toggleMenu} />
      </span>
      <div className={`hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md ${menuOpen ? 'block' : 'hidden'}`}>
        <button onClick={() => setTab('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>Overview</button>
        <button onClick={() => setTab('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>Appointments</button>
        <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>Profile</button>

        <div className='mt-[100px] w:full'>
          <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out text-[16px] leading-7 rounded-md text-white'>
            Logout
          </button>
          <button onClick={handleDeleteAccount} className='w-full bg-red-600 mt-4 p-3 hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out text-[16px] leading-7 rounded-md text-white'>
            Delete account
          </button>
        </div>
      </div>

      {/* Responsive Tab Menu */}
      {menuOpen && (
        <div className='flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md lg:hidden'>
          <button
            onClick={() => setTab('overview')}
            className={`${tab === "overview"
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
              } w-full btn mt-0 rounded-md`}
          >
            Overview
          </button>

          <button
            onClick={() => setTab('appointments')}
            className={`${tab === "appointments"
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
              } w-full btn mt-0 rounded-md`}
          >
            Appointments
          </button>

          <button
            onClick={() => setTab('settings')}
            className={`${tab === "settings"
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
              } w-full btn mt-0 rounded-md`}
          >
            Profile
          </button>

          <div className='mt-[100px] w-full'>
            <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out text-[16px] leading-7 rounded-md text-white'>Logout</button>
            <button onClick={handleDeleteAccount} className='w-full bg-red-600 mt-4 p-3 hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out text-[16px] leading-7 rounded-md text-white'>Delete account</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Tabs

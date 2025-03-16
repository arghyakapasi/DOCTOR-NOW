import React, { useEffect, useContext, useState } from 'react';
import { authContext } from '../../context/AuthContext';
import MyBookings from './MyBookings';
import Profile from './Profile';
import { BASE_URL, token } from '../../../config.js';
import Loading from '../../components/loader/Loading';
import Error from '../../components/Error/Error';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const Myaccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState('bookings');
  const [balance, setBalance] = useState(null);

  const { data: userData, loading, error } = useFetchData(`${BASE_URL}/users/profile/me`, token);
  const userId = userData?._id;

  useEffect(() => {
    if (userId) {
      fetchBalance(userId);
    }
  }, [userId]);

  const fetchBalance = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/wallet/walletBalance/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const balanceData = await response.json();
      console.log(balanceData.balance);
      setBalance(balanceData.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const handleDeleteAccount = async event => {
    event.preventDefault();
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/${userData._id}`, {
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

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        <div className='grid md:grid-cols-3 gap-10'>
          <div className='lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max'>
            <div className='flex items-center justify-center'>
              <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                <img src={userData.photo} alt='' className='w-full h-full rounded-full' />
              </figure>
            </div>

            <div className='text-center mt-4'>
              <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{userData.name}</h3>
              <p className='text-textColor text-[15px] leading-6 font-medium'>{userData.email}</p>
              <p className='text-textColor text-[15px] leading-6 font-medium'>
                Blood Type:
                <span className='ml-2 text-headingColor text-[20px] leading-8'>{userData.bloodType}</span>
              </p>
              <p className='text-textColor text-[15px] leading-6 font-medium'>
                My Wallet:
                <span className='ml-2 text-headingColor text-[20px] leading-8'>{balance !== null ? `₹ ${balance} ` : '0 ₹'}</span>
              </p>
            </div>

            <div className='mt-[50px] md:mt-[100px]'>
              <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out text-[16px] leading-7 rounded-md text-white'>
                Logout
              </button>
              <button onClick={handleDeleteAccount} className='w-full bg-red-600 hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                Delete account
              </button>
            </div>
          </div>

          <div className='md:col-span-2 md:px-[30px]'>
            <div>
              <button
                onClick={() => setTab('bookings')}
                className={`${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading border border-solid border-primaryColor`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab('settings')}
                className={`${tab === 'settings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading border border-solid border-primaryColor`}
              >
                Profile Settings
              </button>
            </div>
            {tab === 'bookings' && <MyBookings />}
            {tab === 'settings' && <Profile user={userData} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Myaccount;

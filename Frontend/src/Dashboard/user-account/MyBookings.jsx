import React, { useState } from 'react';
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../../config.js";
import DoctorCard from "../../components/doctors/DoctorCard";
import Loading from "../../components/loader/Loading";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";

const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/bookings/getBookings/${userId}`, token);

  const [showCancelBox, setShowCancelBox] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [canceledBookings, setCanceledBookings] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 2;

  // Calculate pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = appointments.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(appointments.length / bookingsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/cancelBooking/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        console.log(result.message);

        await createNotification(bookingId);
        await handleRefund(bookingId)

        setCanceledBookings([...canceledBookings, bookingId]);
      } else {
        toast.error(result.message);
        console.error('Failed to cancel booking:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createNotification = async (bookingId) => {
    try {
      const booking = appointments.find(booking => booking._id === bookingId);
      console.log('booking', booking);
      const response = await fetch(`${BASE_URL}/notification/createNotification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          doctorId: booking.doctor,
          message: cancelReason
        })
      });
      const result = await response.json();
      if (result.success) {
        console.log(result);
      } else {
        console.error('Failed to create notification:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRefund = async (bookingId) => {
    try {
      const booking = appointments.find(booking => booking._id === bookingId);
      const response = await fetch(`${BASE_URL}/wallet/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          doctorticketPrice: booking.ticketPrice,
          isCancelledBy: 'Patient'
        })
      });
      const result = await response.json();
      if (result.success) {
        console.log(result);
      } else {
        console.error('Failed to process refund:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  const handleShowCancelBox = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelBox(true);
  };

  const handleCancelSubmission = () => {
    handleCancelBooking(selectedBookingId);
    setShowCancelBox(false);
    setCancelReason('');
  };

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
          {currentBookings.map((booking) => (
            <div
              key={booking._id}
              className={`border p-4 rounded-md shadow-md flex flex-col transition-transform transform ${
                canceledBookings.includes(booking._id) || booking.status === 'Canceled' ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-1 hover:shadow-lg'
              }`}
            >
              <div className="flex-grow">
                <DoctorCard booking={booking} />
              </div>
              <div className="flex justify-end mt-3 relative" style={{ top: '-10px' }}>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out"
                  onClick={() => handleShowCancelBox(booking._id)}
                  disabled={canceledBookings.includes(booking._id) || booking.status === 'Canceled'}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && appointments.length > 2 && (
        <div className="flex justify-center mt-6">
          <button 
            className="bg-primaryColor text-white px-3 py-2 rounded-md mr-2 disabled:opacity-50" 
            onClick={prevPage} 
            disabled={currentPage === 1}
          >
            {"<-"}
          </button>
          <span className="text-lg font-semibold">{currentPage} of {totalPages}</span>
          <button 
            className="bg-primaryColor text-white px-3 py-2 rounded-md ml-2 disabled:opacity-50" 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
          >
            {"->"}
          </button>
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center text-headingColor leading-7 text-[18px] font-semibold">
          You did not book any doctor yet!
        </h2>
      )}

      {showCancelBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-3  rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Cancel Booking</h3>
            <textarea
              className="w-full p-20 border border-gray-300 rounded-md"
              placeholder="Enter the reason for cancellation"
              value={cancelReason } 
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setShowCancelBox(false)}
              >
                Close
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={handleCancelSubmission}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

  import { useEffect, useState } from "react";
  import { formateDate } from "../../../utils/formateDate.js";

  const BookingStatus = ({ bookings }) => {
    const [updatedBookings, setUpdatedBookings] = useState(bookings || []);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 7;

    console.log('Bookings',bookings);

    useEffect(() => {
      setUpdatedBookings(bookings || []);
      }, [bookings]);

    // Pagination calculations
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = updatedBookings ? updatedBookings.slice(indexOfFirstBooking, indexOfLastBooking) : [];
    const totalPages = updatedBookings ? Math.ceil(updatedBookings.length / bookingsPerPage) : 1;

    const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    

    return (
      <div className="flex flex-col items-center">
        <div className="col-span-3">
          <section className="container">
            <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sl.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Patient Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Appointment Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Appointment Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fee
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fee Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Session Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cancelled By
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.length > 0 ? (
                    currentBookings.map((booking, index) => (
                      <tr
                        className="bg-white border-b hover:bg-[#e8e8ff]"
                        key={booking._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {indexOfFirstBooking + index + 1}
                        </th>
                        <td className="px-6 py-4">{booking.userName}</td>
                        <td className="px-6 py-4">{booking.doctorName}</td>
                        <td className="px-6 py-4">{formateDate(booking.createdAt)}</td>
                        <td className="px-6 py-4">
                          {booking.timeSlots.map((slot,slotIndex) => (
                            <div key={slotIndex}>
                              {`${slot.startingTime} - ${slot.endingTime}`}
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4">{booking.ticketPrice}</td>
                        <td className="px-6 py-4">{booking.isPaid ? "Paid" : "Unpaid"}</td>
                        <td className="px-6 py-4">{booking.status}</td>
                        <td className="px-6 py-4">{booking.status ==="Canceled" ? "Patient":"" }</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td
                        colSpan={8}
                        className="px-6 py-4 font-medium text-center text-gray-900"
                      >
                        No Bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
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

          </section>
        </div>
      </div>
    );
  };

  export default BookingStatus;

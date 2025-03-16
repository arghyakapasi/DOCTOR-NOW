import React, { useState } from 'react';
import { formateDate } from '../../../utils/formateDate.js';

const Appointments = ({ appointments }) => {

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <table className='w-full text-left text-sm text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Payment
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Booked On
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {currentAppointments.map((item) => (
            <tr key={item._id}>
              <th
                scope='row'
                className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'
              >
                {item.user ? (
                  <>
                    <img
                      src={item.userPhoto}
                      className='w-10 h-10 rounded-full'
                      alt=''
                    />
                    <div className='pl-3'>
                      <div className='text-base font-semibold'>{item.userName}</div>
                      <div className='text-normal text-gray-500'>{item.userEmail}</div>
                    </div>
                  </>
                ) : (
                  <div className='pl-3'>
                    <div className='text-base font-semibold'>{item.userName}</div>
                  </div>
                )}
              </th>
              <td className='px-6 py-4'>
                {item.isPaid ? (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                    Paid
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>
                    Unpaid
                  </div>
                )}
              </td>
              <td className='px-6 py-4'>{item.ticketPrice}</td>
              <td className='px-6 py-4'>{formateDate(item.createdAt)}</td>
              <td className='px-6 py-4'>{item.status} by Patient</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}    
      {appointments.length > 5 && (
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
    </div>
  );
};

export default Appointments;

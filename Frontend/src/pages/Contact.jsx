import React from 'react';
import { useState } from 'react';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Contact = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/contact/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success(data.message);
      setFormData({ email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
          Got a technical issue? &nbsp; Want to send feedback about a beta feature? &nbsp; Let us know.
        </p>

        <form onSubmit={handleSubmit} className='space-y-8'>
          <div>
            <label htmlFor='email' className='form__label text-blue-700'>Your Email</label>
            <input type='email' id='email' name='email' placeholder='example@gmail.com' className='form__input mt-1' value={formData.email} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor='subject' className='form__label text-blue-700'>Subject</label>
            <input type='text' id='subject' name='subject' placeholder='Let us know how we can help you' className='form__input mt-1' value={formData.subject} onChange={handleInputChange} required />
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor='message' className='form__label text-blue-700'>Your Message</label>
            <textarea rows='5' id='message' name='message' placeholder='Leave a comment...' className='form__input mt-1' value={formData.message} onChange={handleInputChange} required />
          </div>
          <button type='submit' className='btn rounded sm:w-fit bg-green-600 hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out ' disabled={loading}>{loading ? <HashLoader size={35} color='#ffffff' /> : 'Submit'}</button>
        </form>
      </div>
    </section>
  );
};

export default Contact

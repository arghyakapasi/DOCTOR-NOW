import React from 'react';
import heroImg01 from '../assets/images/hero-img01.png';
import heroImg02 from '../assets/images/hero-img02.png';
import heroImg03 from '../assets/images/hero-img03.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import featureImg from '../assets/images/feature-img.png';
import videoIcon from '../assets/images/video-icon.png';
import faqImg from '../assets/images/faq-img.png';
import avatarIcon from '../assets/images/avatar-icon.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import About from '../components/about/About';
import ServiceList from '../components/Services/ServicesList';
import DoctorsList from '../components/doctors/DoctorsList.jsx';
import FaqList from '../components/faq/FaqList.jsx';
import Counter from './Counter.jsx'; 
import { useNavigate } from 'react-router-dom';
import Testimonial from '../components/Testimonial/Testimonial.jsx';



const Home = () => {

  const navigate = useNavigate()
  const redirect = async ()=>{
    navigate('/doctors')
  }

  return (
    <>
      {/*=====hero section=====*/}
      <section className='hero__section pt-[45px] 2xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/*=====hero content=====*/}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[50px] 
                  md:leading-[70px]'>
                    Skip the Wait – Book Your Doctor Instantly!
                </h1>
                <p className='text__para '>
                Book your doctor's appointment online with ease! Our platform allows you to browse healthcare professionals across India.
                Whether you need a specialist or a general consultation, find trusted doctors and book in just a few clicks.
                </p>
                <button onClick={redirect} className='btn bg-primaryColor hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out'>Request an Appointment</button>
              </div>

              {/*=====hero counter=====*/}
              <div className="mt-[-30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 
              lg:gap-[30px]">
                <div className='flex '>
                <div className="flex space-x-8 justify-between  mt-12 lg:mt-05">
                  <div>
                  
                    <Counter target={35} duration={2} />
                    <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-07px]'></span>
                    <p className='text__para'>Years of Experience</p>
                  </div>
                  <div>
                    <Counter target={20} duration={2} />
                    <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-07px]'></span>
                    <p className='text__para'>Clinic Location</p>
                  </div>
                  <div>
                    <Counter target={100} duration={2} />
                    <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-07px]'></span>
                    <p className='text__para'>Patient Satisfaction</p>
                  </div>
                  
                </div>
                </div>
                
              </div>
            </div>
            

            {/*=====hero content=====*/}
            <div className='flex gap-[30px] justify-end'>
              <div>
                <img className='w-full rounded-lg' src={heroImg01} alt='' />
              </div>
              <div className='mt-[30px]'>
                <img src={heroImg02} alt='' className='w-full mb-[30px] rounded-lg' />
                <img src={heroImg03} alt='' className='w-full rounded-lg' />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*=====hero section end=====*/}

      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Providing the best medical services
            </h2>
            <p className='text__para text-center'>
              World-Class care for every patient. Our health system offers unmatched, expert healthcare.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] 
          lg:mt-[55px]'>

            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon01} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Doctor
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                Find the right doctor with ease. Browse specialists and general practitioners, compare profiles, and choose the best fit. Your health is just a few clicks away!
                </p>

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-
              [#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor 
              hover:border-none '>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon02} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Location
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the Clinic.
                </p>

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-
              [#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor 
              hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon03} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Book Appointment
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  Easily book doctor's appointments online. Browse, compare, and schedule with trusted healthcare professionals in just a few clicks.
                </p>

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-
              [#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor 
              hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      <About />

      {/*=====Services section=====*/}
      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our Medical services</h2>
            <p className='text__para text-center'>
            Delivering comprehensive, advanced care tailored to your unique health needs &
            ensuring personalized treatment. 
            </p>
          </div>

          <ServiceList />
        </div>
      </section>
      {/*=====Services section end=====*/}

      {/*=====feature section=====*/}
      <section>
        <div className='container'>
          <div className='flex items-center justify-between flex-col lg:flex-row'>
            {/*=====feature content=====*/}
            <div className='xl:w-[670px]'>
              <h2 className='heading'>
                Get Virtual Treatment <br /> Anytime
              </h2>
              <ul className='pl-4'>
                <li className='text__para'>
                  1. Schedule the appointment directly.
                </li>
                <li className='text__para'>
                  2. Search for your physcian here, and contact their office.
                </li>
                <li className='text__para'>
                  3. View our physicians who are accepting new patients. Use the 
                  online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to='/doctors'>
                <button className='btn hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out'>Learn more</button>
              </Link>
            </div>

            {/*=====feature img=====*/}
            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img src={featureImg} className='w-3/4 rounded-lg' alt='' />

              <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-
                  [100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-[6px] lg:gap-3'>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor
                        font-[600]'>
                      Tue, 24
                    </p>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor
                        font-[400]'>
                      10:00 AM
                    </p>
                  </div>
                  <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center
                      bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                    <img src={videoIcon} alt=''></img>
                  </span>
                </div>

                <div className='w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-
                    [8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4
                    rounded-full'>
                  Consultation
                </div>

                <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
                  <img src={avatarIcon} alt='' />
                  <h4 className='text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700]
                    text-headingColor'>
                    Radhika Chatterjee
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*=====feature section end=====*/}

      {/*=====our great doctors=====*/}
      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Our Great Doctors
            </h2>
            <p className='text__para text-center'>
              Our great doctors provide personalized care, focusing on your needs to enhance your well-being.
            </p>
          </div>

          <DoctorsList />
        </div>
      </section>
      {/*=====our great doctors ends=====*/}

      {/*=====faq section===== */}
      <section>
        <div className='container'>
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block'>
              <img className='rounded-lg' src={faqImg} alt='' />
            </div>


            <div className='w-full md:w-1/2'>
              <h2 className='heading'>
                Most Questions by Our Beloved Patients
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
        {/*=====faq section===== */}

        {/*=====testimonial=====*/}
        <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>What our patient says</h2>
            <p className='text__para text-center'>
              Our patients frequently express their high satisfaction and unwavering confidence in the care we provide.
            </p>
          </div>

          <Testimonial/>  
        </div>
      </section>
      {/*=====testimonial end=====*/}
      </section>
    </>
  );
};

export default Home;

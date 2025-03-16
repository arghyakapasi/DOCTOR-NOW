// About.jsx
import React from 'react';
import aboutImg from '../../assets/images/about.png';
import aboutCarding from '../../assets/images/about-card.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <section>
      <div className='container'>
        <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
          {/*=====about img=====*/}
          <div className='relative w-3/4 lg:w-1/2 xl:w[770px] z-10 order-2 lg:order-1 '>
            <img src={aboutImg} alt='' className='rounded-lg' />
            <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%]
                lg:right-[22%]'>
              <img src={aboutCarding} alt='' />
            </div>
          </div>


          {/*=====about content===== */}
          <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
            <h2 className='heading'>
              Proud to be one of the nation's best
            </h2>
            <p className='text__para '>
            We are proud to be recognized as one of the nation's best in healthcare. 
            Our dedicated professionals ensure patients receive top-quality care, using advanced technology and innovative practices. 
            </p>
            <p className='text__para mt-[30px]'>
            This recognition reflects the trust placed in us by individuals and families. 
            We remain committed to providing compassionate service and improving the health of our communities.
            </p>
            <Link to='/services'>
              <button className='btn bg-primaryColor hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out'>Learn More</button>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default About;

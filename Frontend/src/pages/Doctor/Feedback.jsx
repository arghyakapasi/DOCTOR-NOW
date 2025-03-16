import React, { useState } from 'react'
import avatar1 from '../../assets/images/patientAvatar2.png'
import avatar2 from '../../assets/images/patient-avatar.png'
import avatar3 from '../../assets/images/patientAvatar3.png'
import { formateDate } from '../../../utils/formateDate'
import {AiFillStar} from 'react-icons/ai'
import FeedbackForm from './FeedbackForm'

const Feedback = () => {


  const [showFeedbackForm,setShowFeedbackForm] = useState(false)

  return (
    <div>
      <div className='mb-[50px]'>
        <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
          All reviews
        </h4>

        <div className='flex justify-between gap-10 mb-[30px]'>
          <div className='flex gap-3'>
            <figure className='w-10 h-10 rounded-full'>
              <img className='w-full' src={avatar3} alt=''/>
            </figure>
            <div>
              <h5 className='text-[16px] leading-6 text-irisBlueColor font-bold'>
                Shruti Roy
              </h5>
              <p className='text-[14px] leading-6 text-textColor'>
                {formateDate('01-14-2025')}
              </p>
              <p className='text__para mt-3 font-medium text-[15px]'>Good services and highly recommended ! </p>
            </div>
          </div>
          <div className='flex gap-1'>
            {[...Array(5)].map((_,index)=><AiFillStar key={index} color='#0067FF'/>)}
          </div>
        </div>

        <div className='flex justify-between gap-10 mb-[30px]'>
          <div className='flex gap-3'>
            <figure className='w-10 h-10 rounded-full'>
              <img className='w-full' src={avatar2} alt=''/>
            </figure>
            <div>
              <h5 className='text-[16px] leading-6 text-irisBlueColor font-bold'>
                Arjun Ghosh
              </h5>
              <p className='text-[14px] leading-6 text-textColor'>
                {formateDate('09-23-2024')}
              </p>
              <p className='text__para mt-3 font-medium text-[15px]'>Expert care, very friendly.</p>
            </div>
          </div>
          <div className='flex gap-1'>
            {[...Array(5)].map((_,index)=><AiFillStar key={index} color='#0067FF'/>)}
          </div>
        </div>


        <div className='flex justify-between gap-10 mb-[30px]'>
          <div className='flex gap-3'>
            <figure className='w-10 h-10 rounded-full'>
              <img className='w-full' src={avatar1} alt=''/>
            </figure>
            <div>
              <h5 className='text-[16px] leading-6 text-irisBlueColor font-bold'>
                Bivas Das
              </h5>
              <p className='text-[14px] leading-6 text-textColor'>
                {formateDate('07-12-2024')}
              </p>
              <p className='text__para mt-3 font-medium text-[15px]'>Kind , professional and skilled !</p>
            </div>
          </div>
          <div className='flex gap-1'>
            {[...Array(5)].map((_,index)=><AiFillStar key={index} color='#0067FF'/>)}
          </div>
        </div>


      </div>

     {!showFeedbackForm && <div className='text-center'>
        <button onClick={()=>setShowFeedbackForm(true)} className='btn hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out'>Give feedback</button>
        </div>} 

        {showFeedbackForm && <FeedbackForm/>}
    </div>

    
  )
}

export default Feedback

import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import patientAvatar from '../../assets/images/patient-avatar.png';
import patientAvatar1 from '../../assets/images/patientAvatar1.png';
import patientAvatar2 from '../../assets/images/patientAvatar2.png';
import patientAvatar3 from '../../assets/images/patientAvatar3.png';
import { HiStar } from 'react-icons/hi';

const Testimonial = () => {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar2} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Sashank Choudhary
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>

                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "The online appointment was convenient, and my doctor provided thorough care and answered all my questions with patience."
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar3} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Anima Singh
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>

                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "My online appointment was easy to navigate, and my doctor took the time to address all my concerns thoroughly."
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar1} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Abir Tiwary
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>

                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "The virtual visit was convenient, and my doctor offered clear guidance while making me feel heard and valued."
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Anjan Roy
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>

                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "The online consultation was smooth, and my doctor was engaging, ensuring I felt comfortable and understood my treatment options."
                        </p>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Testimonial;

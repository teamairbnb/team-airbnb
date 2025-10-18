import React from 'react'
import userimg from "../assets/userimg.svg";
import selectedcarimg from "../assets/smselectedcar.svg";
import x from "../assets/redx.svg";
import check from "../assets/greencheck.svg";


export default function EachReservation() {
  return (
    <div className='py-7 px-[26px] border rounded-[10px] tracking-wide'>
      <div className='flex gap-2'>
        <img className='w-8' src={userimg} alt="" />
        <div className='text-start'>
            <p className='text-[13px] font-semibold'>Booking ID <span>#2556</span></p>
            <p className='text-[12px] mt-1'>Mon, Aug 20, 2025</p>
        </div>
      </div>

      <div className='mt-6 flex gap-3 text-start items-center'>
        <img className='w-24' src={selectedcarimg} alt="" />
        <div className='text-[12px]'>
            <p className='text-[13px] font-semibold'>John Doe</p>
            <p className='my-1'>Toyota Camry 2021</p>
            <p>Oct 12 - Oct 15</p>
        </div>
      </div>

      <div className='flex gap-5 mt-7'>
        <button className='w-full flex justify-center  border border-[#DC2626] py-4 rounded-[10px]'>
            <img src={x} alt="" />
        </button>
        <button className='w-full flex justify-center border border-[#16A34A] py-4 rounded-[10px]'>
            <img src={check} alt="" />
        </button>
      </div>
    </div>
  )
}

import React from 'react'
import toprentedcarimg from "../assets/toprentedcarimg.svg";

export default function TopRentedCar() {
  return (
    <div className="relative ">
      <img src={toprentedcarimg} alt="" className="w-full" />

      <div className="absolute bottom-0 left-0 w-full text-white px-[13px] py-2 tracking-wide">
        <p className="text-xs font-medium">Toyota Camry</p>
        <div className='flex justify-between text-[8px] mt-1'>
            <p>No. of Rentals</p>
            <p>24</p>
        </div>
      </div>
    </div>
  )
}

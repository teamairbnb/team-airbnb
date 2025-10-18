import React from 'react'
import UserMessageTab from '../components/UserMessageTab'

export default function Chat() {
  return (
    <div className='text-center text-[#111827] mt-10 relative tracking-wide'>
      <p className="text-[20px] font-semibold">Live Chat</p>

      <div className='mt-8'>
        <UserMessageTab />
      </div>

    </div>
  )
}

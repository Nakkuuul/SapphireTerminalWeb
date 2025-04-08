import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

function Whatsapp() {
  return (
            <div className='flex items-center'>
              <button className="flex items-center gap-2 rounded-md bg-[#F4F4F9] px-5 py-2.5 text-lg font-medium border border-[#D1D5DB] h-[42px]">
                <FaWhatsapp size={24} className="text-green-500" />
                <span className='text-lg text-[#333333]'>Get alerts on WhatsApp</span>
              </button>
            </div>
  )
}

export default Whatsapp
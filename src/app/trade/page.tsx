'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { div } from 'framer-motion/client'

function Trade() {
  const router = useRouter()


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-8'>Welcome to the Trading Platform</h1>
    <button 
      onClick={() => router.push('/trade/option')} 
      className=" bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Click Me to redirect to the correct Location
    </button>
    </div>
  )
}

export default Trade

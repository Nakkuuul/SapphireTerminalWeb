'use client'
import React, { use } from 'react'
import { showOrderCancelledToast } from '@/components/toasts/CancelledOrder'
import { useEffect } from 'react'
import { Toaster } from 'sonner';


function Page() {

  useEffect(() => {
    // Show the cancelled order toast when the component mounts
    showOrderCancelledToast();
  }, []);
  return (
    <div>
      <Toaster/>
      hi
    </div>
  )
}

export default Page

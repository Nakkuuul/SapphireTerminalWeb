import React from 'react'
import { Download } from 'lucide-react'

function DownloadButton() {
  return (
    <>
        <button
            className="flex items-center h-[42px] text-[#686868] border rounded-md px-4 text-sm"
            >
            <Download strokeWidth={1.5} className="text-[#686868] w-4 h-4 mr-2" />
            Download
        </button>
    </>
  )
}

export default DownloadButton
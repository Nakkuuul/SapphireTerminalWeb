import React from 'react'
import { Download } from 'lucide-react'

function DownloadButton() {
  return (
    <>
        <button
            className="flex items-center text-[#686868] border rounded-md px-4 py-3 text-sm"
            >
            <Download className="text-black w-4 h-4 mr-1" />
            Download
        </button>
    </>
  )
}

export default DownloadButton
import React from 'react'
import { Download } from 'lucide-react'

function DownloadButton() {
  return (
    <>
        <button
            className="flex items-center border rounded-md px-4 py-3 text-sm"
            >
            <Download className="w-3 h-3 mr-1" />
            Download
        </button>
    </>
  )
}

export default DownloadButton
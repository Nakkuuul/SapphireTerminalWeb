/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: '#28A745',
        secondary: '#495057',
        background: '#FFFFFF',
        surface: '#F4F4F9',
        text: '#495057',
        border: '#D1D5DB',
        loss:'#E53935',
        profit:'#22A06B',
                
        // Dark mode colors
        dark: {
          primary: '#34D399',
          secondary: '#9CA3AF',
          background: '#020202',
          cardbg:'#121413',
          surface: '#374151',
          graytext: '#C9CACC',
          lighttext:'#EBEEF5',
          border: '#2F2F2F',
          insidecard:'#23232399',
        }
      },
    },
  },
  plugins: [],
} 
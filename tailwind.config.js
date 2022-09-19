/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-channel-4': "url('/bg-channel-4.png')",
        'bg-channel-3': "url('/bg-channel-3.png')",
        'bg-channel-2': "url('/bg-channel-2.png')",
        'bg-channel-1': "url('/bg-channel-1.png')",
      }
    },
    backgroundColor: {
      primary: "#C8DFB2",
    }
  },
  plugins: [],
}


    /** @type {import('tailwindcss').Config} */

    module.exports = {	
      content: [		
        "./pages/**/*.{js,ts,jsx,tsx}",		
        "./components/**/*.{js,ts,jsx,tsx}",	
      ],
	
      theme: {		
        extend: {
          fontFamily: {
            josefin: ["Josefin Sans", "sans-serif"],
          },
          colors: {
            dark: "#02142c",
            // accent: "#051836",
            accent: "#0b2348",
            pink: "#c32b79",
          },
        },	
      },	
      plugins: [],
    }
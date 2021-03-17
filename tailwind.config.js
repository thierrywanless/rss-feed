module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#ffffff",
        },
      },
      zIndex: {
        "-100": "-100",
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
      textColor: ["visited"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

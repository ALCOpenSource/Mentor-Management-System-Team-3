/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.75em",
        sm: "1em",
        md: "1.25em",
        base: "1.5em",
        lg: "1.75em",
        xl: "2em",
      },
      fontFamily: {
        mukta: ["Mukta", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        customBlack: {
          one: "#141414",
          two: "#333333",
          three: "#4D4D4D",
        },
        gray: {
          one: "#666666",
          two: "#808080",
          three: "#999999",
        },
        lightGray: {
          one: "#B3B3B3",
          two: "#CCCCCC",
          three: "#E6E6E6",
          four: "#F2F2F2",
        },
        green: {
          one: "#023C40",
          two: "#035D63",
          three: "#058B94",
          four: "#06B9C6",
        },
        lightGreen: {
          one: "#08E8F7",
          two: "#39ECF9",
          three: "#6BF1FA",
          four: "#9CF6FC",
        },
        lighterGreen: {
          one: "#CEFAFD",
          two: "#E6FDFE",
          three: "#F7FEFF",
        },
        red: {
          one: "#660007",
          two: "#99000A",
          three: "#CC000E",
          four: "#FF0011",
        },
        lightRed: {
          one: "#FF5964",
          two: "#FF99A0",
          three: "#FFCCCF",
          four: "#FFE6E7",
        },
        wine: {
          one: "#461220",
          two: "#7A1F38",
          three: "#A22A4A",
          four: "#CB345D",
        },
        pink: {
          one: "#D55D7D",
          two: "#E0859E",
          three: "#EAAEBE",
          four: "#F5D6DF",
          five: "#FAEBEF",
        },
      },
      width: {
        w: {
          50: "200px",
        },
      },
      height: {
        h: {
          50: "200px",
          100:"700px"
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

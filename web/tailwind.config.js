module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        4: "1em",
        8: "2em",
        16: "4em",
        32: "8em",
      },
      maxWidth: {
        4: "1em",
        8: "2em",
        16: "4em",
        32: "8em",
      },
      colors: {
        black: "rgb(31,31,31)",
        primary: "rgb(205, 240, 234)",
        secondary: "rgb(249, 249, 249)",
        third: "rgb(246, 198, 234)",
        forth: "rgb(250, 244, 183)",
        paleGreen: "rgb(153, 226, 180)",
        mirror: "rgba(0, 0, 0, 0.5)",
        pastelBlue: "rgb(175, 189, 218)",
      },
    },
  },
  plugins: [require("daisyui")],
};

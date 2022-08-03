module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
      },
      minWidth: {
        4: "1em",
        8: "2em",
        16: "4em",
        32: "8em",
        mobile: "330px",
        sm: "480px",
        md: "640px",
      },
      maxWidth: {
        4: "1em",
        8: "2em",
        16: "4em",
        32: "8em",
        sm: "480px",
        md: "640px",
        mobile: "330px",
      },
      minHeight: {
        sm: "480px",
        md: "640px",
        mobile: "330px",
      },

      colors: {
        black: "rgb(31,31,31)",
        primary: "rgb(158,232,225)",
        primaryLight: "rgb(181,249,242)",
        primaryDark: "rgb(154,215,209)",
        secondary: "rgb(249, 249, 249)",
        third: "rgb(246, 198, 234)",
        forth: "rgb(250, 244, 183)",
        paleGreen: "rgb(153, 226, 180)",
        mirror: "rgba(0, 0, 0, 0.5)",
        pastelBlue: "rgb(175, 189, 218)",
        seaBlue: "rgb(205, 240, 234)",
        smoke: "rgb(240, 240, 240)",
      },
    },
  },
  plugins: [require("daisyui"), require("prettier-plugin-tailwindcss")],
};

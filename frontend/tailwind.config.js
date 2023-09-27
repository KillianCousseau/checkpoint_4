/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coffee: "#6F4E37",
        moss: "#8A9A5B",
        cactus: "#92b544",
        beaver: "#9F8170",
        umber: "#635147",
        "columbia-blue": "#B9D9EB",
        "alice-blue": "#F0F8FF",
        xanthous: "#F1B42F",
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#071B24",
        academy: "#052F47",
        mist: "#DDEAF0",
        teal: "#73D2C6",
        emerald: "#A6E3B8",
        amber: "#F2B84B",
        rose: "#D86B77",
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.28)",
        lift: "0 18px 48px rgba(0, 0, 0, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1d4ed8",
          "primary-content": "#f8fafc",
          secondary: "#1F84E9",
          "secondary-content": "#f8fafc",
          accent: "#00ffff",
          "accent-content": "#001616",
          neutral: "#f8fafc",
          "neutral-content": "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#d8d9db",
          "base-300": "#C1D3E5",
          "base-content": "#1f2937",
          info: "#1d4ed8",
          "info-content": "#f8fafc",
          success: "#98ff98",
          "success-content": "#111827",
          warning: "#39ff14",
          "warning-content": "#111827",
          error: "#ef4444",
          "error-content": "#111827",
          graybg: "#F6F7FB",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}


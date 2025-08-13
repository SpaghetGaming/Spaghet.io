import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Atkinson", ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "full",
            "--tw-prose-body": "var(--spaghetti-brown)",
            "--tw-prose-headings": "var(--spaghetti-brown)",
            "--tw-prose-lead": "var(--spaghetti-brown)",
            "--tw-prose-links": "var(--spaghetti-red)",
            "--tw-prose-bold": "var(--spaghetti-brown)",
            "--tw-prose-counters": "var(--spaghetti-brown)",
            "--tw-prose-bullets": "var(--spaghetti-brown)",
            "--tw-prose-hr": "var(--spaghetti-brown)",
            "--tw-prose-quotes": "var(--spaghetti-brown)",
            "--tw-prose-quote-border": "var(--spaghetti-yellow)",
            "--tw-prose-captions": "var(--spaghetti-brown)",
            "--tw-prose-code": "var(--spaghetti-brown)",
            "--tw-prose-pre-code": "var(--spaghetti-brown)",
            "--tw-prose-pre-bg": "var(--spaghetti-cream)",
            "--tw-prose-th-borders": "var(--spaghetti-brown)",
            "--tw-prose-td-borders": "var(--spaghetti-brown)",
          },
        },
        dark: {
          css: {
            "--tw-prose-body": "var(--spaghetti-brown)",
            "--tw-prose-headings": "var(--spaghetti-brown)",
            "--tw-prose-lead": "var(--spaghetti-brown)",
            "--tw-prose-links": "var(--spaghetti-red)",
            "--tw-prose-bold": "var(--spaghetti-brown)",
            "--tw-prose-counters": "var(--spaghetti-brown)",
            "--tw-prose-bullets": "var(--spaghetti-brown)",
            "--tw-prose-hr": "var(--spaghetti-brown)",
            "--tw-prose-quotes": "var(--spaghetti-brown)",
            "--tw-prose-quote-border": "var(--spaghetti-yellow)",
            "--tw-prose-captions": "var(--spaghetti-brown)",
            "--tw-prose-code": "var(--spaghetti-brown)",
            "--tw-prose-pre-code": "var(--spaghetti-brown)",
            "--tw-prose-pre-bg": "var(--spaghetti-cream)",
            "--tw-prose-th-borders": "var(--spaghetti-brown)",
            "--tw-prose-td-borders": "var(--spaghetti-brown)",
          },
        }
      },
      rotate: {
        "45": "45deg",
        "135": "135deg",
        "225": "225deg",
        "315": "315deg",
      },
      animation: {
        twinkle: "twinkle 2s ease-in-out forwards",
        meteor: "meteor 3s ease-in-out forwards",
      },
      keyframes: {
        twinkle: {
          "0%": { 
            opacity: 0, 
            transform: "rotate(0deg)" 
          },
          "50%": { 
            opacity: 1,
            transform: "rotate(180deg)" 
          },
          "100%": { 
            opacity: 0, 
            transform: "rotate(360deg)" 
          },
        },
        meteor: {
          "0%": { 
            opacity: 0, 
            transform: "translateY(200%)" 
          },
          "50%": { 
            opacity: 1  
          },
          "100%": { 
            opacity: 0, 
            transform: "translateY(0)" 
          },
        },
      },
      colors: {
        spaghetti: {
          yellow: "#FDE68A",
          red: "#FECACA",
          cream: "#FEF3C7",
          brown: "#78350F",
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

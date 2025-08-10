module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animationDelay: {
        0: "0ms",
        200: "200ms",
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1000: "1000ms",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "stroke-draw": {
          "0%": {
            strokeDashoffset: "1",
          },
          "100%": {
            strokeDashoffset: "0",
          },
        },
        "stroke-draw-reverse": {
          "0%": {
            strokeDashoffset: "-1",
          },
          "100%": {
            strokeDashoffset: "0",
          },
        },
        marquee: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          "0%, 100%, 33%, 66%": { opacity: 0 },
          "10%, 43%, 76%, 90%": { opacity: 1 },
        },
        "slide-in-delayed-1": {
          "0%, 33%, 100%": { opacity: 0, transform: "translateY(20px)" },
          "43%, 90%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in-delayed-2": {
          "0%, 66%, 100%": { opacity: 0, transform: "translateY(20px)" },
          "76%, 90%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in-delayed-3": {
          "0%, 66%, 100%": { opacity: 0, transform: "translateY(20px)" },
          "76%, 90%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 1.5s ease-out forwards",
        "slide-in-right": "slide-in-right 1.5s ease-out forwards",
        "slide-in-up": "slide-in-up 1.5s ease-out forwards",
        "fade-up": "fade-up 1.5s ease-out forwards",
        "stroke-draw": "stroke-draw 1s ease-out forwards",
        "stroke-draw-reverse": "stroke-draw-reverse 1s ease-out forwards",
        marquee: "marquee 13s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 15s ease-in",
        "slide-in-delayed-1": "slide-in-delayed-1 15s ease-in-out",
        "slide-in-delayed-2": "slide-in-delayed-2 15s ease-in-out",
        "slide-in-delayed-3": "slide-in-delayed-3 15s ease-in-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};

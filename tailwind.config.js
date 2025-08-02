module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
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
        inter: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-out": {
          "0%, 100%": { opacity: 0 },
          "10%, 90%": { opacity: 1 }
        },
        "fade-in-out-delayed-1": {
          "0%, 33%, 100%": { opacity: 0, transform: 'translateY(20px)' },
          "43%, 90%": { opacity: 1, transform: 'translateY(0)' }
        },
        "fade-in-out-delayed-2": {
          "0%, 66%, 100%": { opacity: 0, transform: 'translateY(20px)' },
          "76%, 90%": { opacity: 1, transform: 'translateY(0)' }
        },
        "slide-in": {
          "0%": { opacity: 0, transform: 'translateX(100px)' },
          "100%": { opacity: 1, transform: 'translateX(0)' }
        },
        "float": {
          "0%, 100%": { transform: 'translateY(0px)' },
          "50%": { transform: 'translateY(-10px)' }
        },
        "scale-in": {
          "0%": { opacity: 0, transform: 'scale(0.8)' },
          "100%": { opacity: 1, transform: 'scale(1)' }
        },
        "slide-up": {
          "0%": { opacity: 0, transform: 'translateY(30px)' },
          "100%": { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-out": "fade-in-out 15s ease-in-out infinite",
        "fade-in-out-delayed-1": "fade-in-out-delayed-1 15s ease-in-out infinite",
        "fade-in-out-delayed-2": "fade-in-out-delayed-2 15s ease-in-out infinite",
        "slide-in": "slide-in 1.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "scale-in": "scale-in 0.8s ease-out",
        "slide-up": "slide-up 0.6s ease-out"
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};

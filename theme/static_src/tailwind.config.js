/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 */

module.exports = {
  content: [
    /**
     * HTML. Paths to Django template files that will contain Tailwind CSS classes.
     */

    /*  Templates within theme app (<tailwind_app_name>/templates), e.g. base.html. */
    "../templates/**/*.html",

    /*
     * Main templates directory of the project (BASE_DIR/templates).
     * Adjust the following line to match your project structure.
     */
    "../../templates/**/*.html",

    /*
     * Templates in other django apps (BASE_DIR/<any_app_name>/templates).
     * Adjust the following line to match your project structure.
     */
    "../../**/templates/**/*.html",

    /**
     * JS: If you use Tailwind CSS in JavaScript, uncomment the following lines and make sure
     * patterns match your project structure.
     */
    /* JS 1: Ignore any JavaScript in node_modules folder. */
    // '!../../**/node_modules',
    /* JS 2: Process all JavaScript files in the project. */
    // '../../**/*.js',

    /**
     * Python: If you use Tailwind CSS classes in Python, uncomment the following line
     * and make sure the pattern below matches your project structure.
     */
    // '../../**/*.py'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Optima",
          "Candara",
          "Noto Sans",
          "source-sans-pro",
          "sans-serif",
        ],
      },
      colors: {
        // Core textile-inspired colors
        "madras-red": "#DEB3A0",
        "madras-mustard": "#E0A15A",
        "madras-teal": "#3A6B78",
        "madras-indigo": "#1F2933",
        "madras-earth": "#8B5D33",

        // Primary color: Clay Pink
        primary: {
          DEFAULT: "#DEB3A0",
          50: "#faf6f3",
          100: "#f5ede7",
          200: "#ebdacf",
          300: "#e1c8b7",
          400: "#d3a387",
          500: "#DEB3A0",
          600: "#c89280",
          700: "#b37160",
          800: "#8d5a4d",
          900: "#6d463c",
        },

        // Secondary color: Tealstone
        secondary: {
          DEFAULT: "#3A6B78",
          50: "#f0f5f6",
          100: "#e1eaed",
          200: "#c3d5db",
          300: "#a5c0c9",
          400: "#6996a5",
          500: "#3A6B78",
          600: "#2f5660",
          700: "#254148",
          800: "#1a2c30",
          900: "#0f1718",
        },

        // Accent color: Muted Saffron
        accent: {
          DEFAULT: "#E0A15A",
          50: "#fdf8f1",
          100: "#fbf1e3",
          200: "#f7e3c7",
          300: "#f3d5ab",
          400: "#ebb873",
          500: "#E0A15A",
          600: "#c88840",
          700: "#a06d30",
          800: "#785226",
          900: "#503718",
        },

        // Supporting color: Deep Ink
        supporting: {
          DEFAULT: "#1F2933",
          50: "#f2f3f4",
          100: "#e5e7e9",
          200: "#cbcfd3",
          300: "#b1b7bd",
          400: "#7d8791",
          500: "#495765",
          600: "#364249",
          700: "#1F2933",
          800: "#161d24",
          900: "#0d1115",
        },

        // Neutrals: Spice Brown with Chai Beige accents
        neutral: {
          DEFAULT: "#8B5D33",
          50: "#E7D9C5",
          100: "#e0cdb4",
          200: "#d1b892",
          300: "#c2a370",
          400: "#a4792c",
          500: "#8B5D33",
          600: "#6f4a29",
          700: "#53371f",
          800: "#372515",
          900: "#1b120b",
        },
      },
    },
  },
  plugins: [
    /**
     * '@tailwindcss/forms' is the forms plugin that provides a minimal styling
     * for forms. If you don't like it or have own styling for forms,
     * comment the line below to disable '@tailwindcss/forms'.
     */
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

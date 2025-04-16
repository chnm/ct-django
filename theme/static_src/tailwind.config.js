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
        // Core Madras-inspired colors
        "madras-red": "#c13e3e", // Warm, earthy red found in many madras textiles
        "madras-mustard": "#e3a92b", // Rich golden mustard shade
        "madras-teal": "#2b7d77", // Deep teal green often found in madras patterns
        "madras-indigo": "#3a4a6d", // Deep indigo blue for contrast
        "madras-earth": "#8c5e3b", // Rich earthy brown tone

        // Primary color: Madras Red
        primary: {
          DEFAULT: "#c13e3e",
          50: "#fdf2f2",
          100: "#fbe4e4",
          200: "#f7c9c9",
          300: "#f2aeae",
          400: "#e87979",
          500: "#d85555",
          600: "#c13e3e",
          700: "#a02e2e",
          800: "#822a2a",
          900: "#692929",
        },

        // Secondary color: Madras Teal
        secondary: {
          DEFAULT: "#2b7d77",
          50: "#edf7f6",
          100: "#d2ecea",
          200: "#a6d8d5",
          300: "#79c5c0",
          400: "#4ba49e",
          500: "#2b7d77",
          600: "#256661",
          700: "#1f4f4c",
          800: "#183937",
          900: "#112424",
        },

        // Accent color: Madras Mustard
        accent: {
          DEFAULT: "#e3a92b",
          50: "#fdf9ef",
          100: "#fcf3d8",
          200: "#f8e7b1",
          300: "#f3d67a",
          400: "#eec24d",
          500: "#e3a92b",
          600: "#c28820",
          700: "#9e691d",
          800: "#7c501b",
          900: "#5f3f19",
        },

        // Supporting color: Madras Indigo
        supporting: {
          DEFAULT: "#3a4a6d",
          50: "#f1f3f7",
          100: "#e2e6ee",
          200: "#c5cedf",
          300: "#a7b2cf",
          400: "#8494ba",
          500: "#6577a5",
          600: "#4d5f8a",
          700: "#3a4a6d",
          800: "#2c3854",
          900: "#1f273c",
        },

        // Neutrals: Madras Earth (brown tones)
        neutral: {
          DEFAULT: "#8c5e3b",
          50: "#f9f5f1",
          100: "#f2e9df",
          200: "#e4d1be",
          300: "#d5b89e",
          400: "#bd925f",
          500: "#8c5e3b",
          600: "#734d31",
          700: "#5a3c28",
          800: "#422d1e",
          900: "#2b1e15",
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

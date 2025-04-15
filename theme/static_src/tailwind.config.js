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
        // New color palette
        "ct-orange": "#fb8500",
        "ct-yellow": "#ffb703",
        "ct-dark-blue": "#023047",
        "ct-blue": "#219ebc",
        "ct-light-blue": "#8ecae6",

        // Primary color: Dark Blue (#023047)
        primary: {
          DEFAULT: "#023047",
          50: "#f0f5f8",
          100: "#dae8ef",
          200: "#b5d1df",
          300: "#90bacf",
          400: "#6ba3bf",
          500: "#467b97",
          600: "#34617c",
          700: "#234762",
          800: "#122d47",
          900: "#02151e",
        },

        // Secondary color: Blue (#219ebc)
        secondary: {
          DEFAULT: "#219ebc",
          50: "#f0f9fc",
          100: "#d9eff5",
          200: "#b3dfeb",
          300: "#8ecfe1",
          400: "#68bfd7",
          500: "#219ebc",
          600: "#1a7e96",
          700: "#135e71",
          800: "#0d3f4b",
          900: "#061f26",
        },

        // Accent color: Yellow (#ffb703)
        accent: {
          DEFAULT: "#ffb703",
          50: "#fff9e7",
          100: "#fff2cf",
          200: "#ffe59f",
          300: "#ffd86f",
          400: "#ffcc3f",
          500: "#ffb703",
          600: "#cc9202",
          700: "#996e02",
          800: "#664901",
          900: "#332500",
        },

        // Highlight color: Orange (#fb8500)
        highlight: {
          DEFAULT: "#fb8500",
          50: "#fff5e6",
          100: "#ffe8cc",
          200: "#ffd199",
          300: "#ffba66",
          400: "#ffa333",
          500: "#fb8500",
          600: "#c86a00",
          700: "#965000",
          800: "#643500",
          900: "#321b00",
        },

        // Support color: Light Blue (#8ecae6)
        support: {
          DEFAULT: "#8ecae6",
          50: "#f5fafd",
          100: "#e6f3f9",
          200: "#cde7f4",
          300: "#b3dbee",
          400: "#9ad0e9",
          500: "#8ecae6",
          600: "#72a2b8",
          700: "#55798a",
          800: "#39515c",
          900: "#1c282e",
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

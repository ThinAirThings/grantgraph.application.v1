import { defineConfig } from "@pandacss/dev";
import radixColorsPreset from "pandacss-preset-radix-colors";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Radix Preset
    presets: [radixColorsPreset()],
    // Useful for theme customization
    theme: {
        extend: {},
    },

    // The output directory for your css system
    outdir: "styled-system",

    // The JSX framework to use
    jsxFramework: "react",
});

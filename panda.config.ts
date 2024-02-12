import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import radixColorsPreset from "pandacss-preset-radix-colors";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Radix Preset
    presets: [ "@pandacss/preset-base", '@pandacss/preset-panda', radixColorsPreset()],
    // Useful for theme customization
    theme: {
        extend: {
            breakpoints: {
                sm: '520px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1640px',
            }
        },
        // tokens: {
        //     spacing: {
        //         '9': '64px'
        //     }
        // }
    },

    // The output directory for your css system
    outdir: "styled-system",

    // The JSX framework to use
    jsxFramework: "react",

    // Define Global CSS
    globalCss: defineGlobalStyles({
        '*': {
            boxSizing: 'border-box',
            p: 0,
            m: 0
        },
        'html, body': {
            maxWidth: 'screen',
            overflowX: 'hidden'
        },
        a: {
            color: 'inherit',
            textDecoration: 'none'
        }
    })
});

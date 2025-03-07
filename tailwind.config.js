import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    plugins: [
        nextui({
            prefix: "nextui", // prefix for themes variables
            addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: "light", // default theme from the themes object
            defaultExtendTheme: "light", // default theme to extend on custom themes
            layout: {}, // common layout tokens (applied to all themes)
            themes: {
                light: {
                    layout: {},
                    colors: {
                        'app-bg': 'hsl(0,7%,95%)',
                        'dark-blue': '#11004d',
                        'bright-orange': '#FDAB00',
                        'container': 'hsl(14,96%,93%)',
                        'on-container': 'hsl(14,96%,97%)',
                        'secondary': {
                            DEFAULT: '#802d3e',
                            foreground: '#ffe2e8',
                        },
                    }
                },
                dark: {
                    layout: {},
                    colors: {
                        'app-bg': 'hsl(0,7%,10%)',
                        'dark-blue': '#11004d',
                        'bright-orange': '#FDAB00',
                        'container': 'hsl(41,0%,25%)',
                        'on-container': 'hsla(41,0%,85%, 0.2)',
                        'secondary': {
                            DEFAULT: '#ffe2e8',
                            foreground: '#802d3e',
                        },
                    }
                }
            }
        }),
    ],
}


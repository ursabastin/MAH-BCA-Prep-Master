/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0c',
                foreground: '#e4e4e7',
                card: {
                    DEFAULT: 'rgba(24, 24, 27, 0.4)',
                    foreground: '#e4e4e7',
                },
                primary: {
                    DEFAULT: '#3b82f6',
                    foreground: '#ffffff',
                },
                accent: {
                    DEFAULT: 'rgba(59, 130, 246, 0.1)',
                    foreground: '#3b82f6',
                }
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
            },
            backdropBlur: {
                'xs': '2px',
            }
        },
    },
    plugins: [],
}

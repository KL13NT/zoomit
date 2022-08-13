/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	mode: "jit",
	darkMode: "class",
	content: ["./**/*.{ts,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},
	},
	variants: { extend: { typography: ["dark"] } },
};

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				'foreground-light': '#333',
				'background-light': '#f5f5f5'
			}
		}
	},

	plugins: []
} satisfies Config;

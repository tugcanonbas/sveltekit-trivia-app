export function getTheme(): 'light' | 'dark' {
	if (
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark');
		return 'dark';
	} else {
		document.documentElement.classList.remove('dark');
		return 'light';
	}
}

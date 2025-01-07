<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { getTheme } from '$lib/utils/getTheme';
	import { onMount } from 'svelte';

	let theme: 'light' | 'dark' = 'light';
	$: icon = theme === 'light' ? 'dark_mode' : 'light_mode';

	const toggleTheme = () => {
		if (theme === 'light') {
			theme = 'dark';
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			theme = 'light';
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	};

	onMount(() => {
		theme = getTheme();
	});
</script>

<Button {icon} onClick={toggleTheme} color="text-sky-500" />

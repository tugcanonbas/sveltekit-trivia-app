<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Trivia Game</title>
</svelte:head>

<div class="container m-auto flex w-full flex-col">
	<main class="flex h-[100svh] w-full items-center justify-center">
		{@render children()}
	</main>
</div>

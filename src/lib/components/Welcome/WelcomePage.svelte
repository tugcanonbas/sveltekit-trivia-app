<script lang="ts">
	import Footnote from '$lib/components/Welcome/Footnote.svelte';
	import Hero from '$lib/components/Welcome/Hero.svelte';
	import QuizConfiguration from '$lib/components/Welcome/QuizConfiguration.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '../Header.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-between">
	<Header />

	<Hero />

	<QuizConfiguration />

	<Footnote />

	<Footer />
</div>

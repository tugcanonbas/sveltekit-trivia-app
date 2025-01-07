<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-between">
	<Header />

	<div class="flex h-full w-full flex-col items-center justify-center gap-10">
		<div class="flex flex-col items-center justify-center gap-2">
			<span class="text-3xl font-bold"
				>You are <span class="uppercase text-rose-500">Lost</span>!
			</span>
			<span class="text-center text-xl font-light"> Or, the page is. </span>
		</div>
		<Button
			title="Back to Home"
			onClick={() => {
				goto('/');
			}}
			background="bg-sky-500"
			color="text-white"
		/>
	</div>

	<Footer />
</div>

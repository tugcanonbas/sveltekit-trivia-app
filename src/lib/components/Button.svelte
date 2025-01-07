<script lang="ts">
	export let title: string | undefined = undefined;
	export let icon: string | undefined = undefined;
	export let onClick: () => void;
	export let disabled: boolean = false;
	export let background: string | undefined = undefined;
	export let color: string | undefined = undefined;
</script>

<button
	on:click={onClick}
	{disabled}
	class="rounded-lg {background} flex items-center justify-center gap-2 text-base transition duration-300 sm:text-xl {disabled
		? 'opacity-50'
		: 'hover:scale-105'} {title
		? background
			? 'px-5 py-1 sm:px-10 sm:py-2'
			: 'w-full'
		: 'px-2 py-1 sm:px-3 sm:py-1'}"
>
	{#if icon}
		<span class="material-symbols-outlined text-3xl font-light {color}">{icon}</span>
	{/if}
	{#if title}
		<span class="font-semibold {color}">{title}</span>
	{/if}
</button>

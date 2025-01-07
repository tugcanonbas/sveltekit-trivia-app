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
	class="rounded-lg {background} flex items-center justify-center gap-2 text-xl transition duration-300 {disabled
		? 'opacity-50'
		: 'hover:scale-105'} {title ? (background ? 'px-10 py-2' : 'w-full') : ' px-3 py-1'}"
>
	{#if icon}
		<span class="material-symbols-outlined text-3xl font-light {color}">{icon}</span>
	{/if}
	{#if title}
		<span class="font-semibold {color}">{title}</span>
	{/if}
</button>

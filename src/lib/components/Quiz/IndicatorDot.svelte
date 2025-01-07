<script lang="ts">
	export let index: number;
	export let onClick: () => void;
	export let state: 'default' | 'completed' | 'true' | 'false' = 'default';
	export let isCurrent: boolean;

	const style = {
		default: 'text-sky-500 border-sky-500',
		completed: 'bg-sky-500 text-white border-sky-500',
		true: 'bg-emerald-500 text-white ',
		false: 'bg-rose-500 text-white '
	};
</script>

<button
	on:click={onClick}
	class="size-10 rounded-lg transition duration-300 {style[state]} 
    {isCurrent && index !== -1
		? 'border-4 font-black text-sky-500'
		: 'border-2 font-light text-sky-500'}"
>
	<span>
		{#if index === -1}
			<span class="material-symbols-outlined mt-1"> star </span>
		{:else}
			{index}
		{/if}
	</span>
</button>

<script lang="ts">
	import type { Answer } from '$lib/types/Answer';
	import he from 'he';

	export let answer: Answer;
	export let state: 'default' | 'selected' | 'correct' | 'incorrect' | 'answer' = 'default';
	export let onClick: () => void;

	const style = {
		default: 'border-sky-500 text-sky-500 border-sky-500',
		selected: 'bg-sky-500 text-white border-sky-500',
		correct: 'bg-emerald-500 text-white border-emerald-500',
		incorrect: 'bg-rose-500 text-white border-rose-500',
		answer: 'border-emerald-500 border-4 text-emerald-500'
	};
</script>

<button
	on:click={onClick}
	class="w-full rounded-lg border-2 px-10 py-2 text-xl transition duration-300 hover:scale-105
	{style[state]}"
>
	<span>{he.decode(answer.text)}</span>
</button>

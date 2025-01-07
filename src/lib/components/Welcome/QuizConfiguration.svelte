<script lang="ts">
	import { quizStore } from '$lib/stores/quizStore';
	import { api } from '$lib/APIHandler';
	import Button from '$lib/components/Button.svelte';
	import { newQuiz } from '$lib/types/Quiz';
	import { v4 as uuidv4 } from 'uuid';
	import Category from '$lib/enums/Category';
	import Difficulty from '$lib/enums/Difficulty';
	import Type from '$lib/enums/Type';
	import ProgressIndicator from '../ProgressIndicator.svelte';
	import { convertAPIQuestions } from '$lib/utils/convertQuestions';

	let error = '';
	let loading = false;

	async function startQuiz() {
		loading = true;

		const categoryElement = document.querySelector(
			'select[name="trivia_category"]'
		) as HTMLSelectElement;
		// const difficultyElement = document.querySelector(
		// 	'select[name="trivia_difficulty"]'
		// ) as HTMLSelectElement;
		// const typeElement = document.querySelector('select[name="trivia_type"]') as HTMLSelectElement;

		const categoryQuery = categoryElement.value === 'any' ? undefined : categoryElement.value;
		// const difficultyQuery = difficultyElement.value === 'any' ? undefined : difficultyElement.value;
		// const typeQuery = typeElement.value === 'any' ? undefined : typeElement.value;

		const category = Category[categoryQuery as keyof typeof Category];
		// const difficulty = Difficulty[difficultyQuery as keyof typeof Difficulty];
		// const type = Type[typeQuery as keyof typeof Type];

		try {
			const apiQuestions = await api.getQuestions(10, categoryQuery);

			const questions = convertAPIQuestions(apiQuestions);

			const quiz = newQuiz(uuidv4(), new Date(), questions, Type.any, category, Difficulty.any);

			quizStore.setQuiz(quiz);
		} catch {
			error = 'Failed to set the quiz.. Please try again.';
			console.error('Failed to fetch questions');
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start gap-10">
	<div>
		<div class="flex flex-col items-center justify-center gap-2">
			<span class="font-semibold sm:text-2xl">Configurations</span>
			<div class="flex flex-col items-center justify-center gap-2">
				<select
					disabled={loading}
					name="trivia_category"
					class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-xs text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 sm:text-sm dark:border-gray-700 dark:text-gray-400"
				>
					<option value="any">Any Category</option>
					<option value="9">General Knowledge</option>
					<option value="10">Entertainment: Books</option>
					<option value="11">Entertainment: Film</option>
					<option value="12">Entertainment: Music</option>
					<option value="13">Entertainment: Musicals &amp; Theatres</option>
					<option value="14">Entertainment: Television</option>
					<option value="15">Entertainment: Video Games</option>
					<option value="16">Entertainment: Board Games</option>
					<option value="17">Science &amp; Nature</option>
					<option value="18">Science: Computers</option>
					<option value="19">Science: Mathematics</option>
					<option value="20">Mythology</option>
					<option value="21">Sports</option>
					<option value="22">Geography</option>
					<option value="23">History</option>
					<option value="24">Politics</option>
					<option value="25">Art</option>
					<option value="26">Celebrities</option>
					<option value="27">Animals</option>
					<option value="28">Vehicles</option>
					<option value="29">Entertainment: Comics</option>
					<option value="30">Science: Gadgets</option>
					<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
					<option value="32">Entertainment: Cartoon &amp; Animations</option>
				</select>
				<!-- <select
					disabled={loading}
					name="trivia_difficulty"
					class=" peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
				>
					<option value="any">Any Difficulty</option>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select> -->
				<!-- <select
					disabled={loading}
					name="trivia_type"
					class=" peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
				>
					<option value="any">Any Type</option>
					<option value="multiple">Multiple Choice</option>
					<option value="boolean">True / False</option>
				</select> -->
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center gap-2">
		{#if loading}
			<ProgressIndicator />
		{:else}
			<Button
				title="Start Game"
				icon="play_arrow"
				onClick={startQuiz}
				background="bg-sky-500"
				color={'text-white'}
			/>
		{/if}

		<div>
			<span class="text-center text-xs text-red-500">{error}</span>
		</div>
	</div>
</div>

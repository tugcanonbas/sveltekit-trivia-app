<script lang="ts">
	import { quizStore } from '$lib/stores/quizStore';
	import he from 'he';
	import AnswerButton from '$lib/components/Quiz/AnswerButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import IndicatorDot from '$lib/components/Quiz/IndicatorDot.svelte';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-confetti';
	import { getTheme } from '$lib/utils/getTheme';

	let theme: 'light' | 'dark' = 'light';
	let showConfirmation = false;

	function backToMain() {
		if (!$quizStore.finished) {
			if ($quizStore.quiz.questions.some((question) => question.selectedAnswer)) {
				showConfirmation = true;
			} else {
				quizStore.reset();
			}
		} else {
			quizStore.reset();
		}
	}

	$: {
		if ($quizStore.finished) {
			showConfirmation = false;
		}
	}

	onMount(() => {
		quizStore.start();

		theme = getTheme();

		return () => {
			quizStore.reset();
		};
	});
</script>

{#if showConfirmation}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div
			class="flex w-3/4 max-w-2xl flex-col items-center justify-center gap-5 rounded-lg bg-sky-900 p-10 shadow-lg"
		>
			<span class="text-center text-2xl font-semibold text-white"
				>Are you sure you want to go back to the main menu?</span
			>
			<div class="flex flex-row items-center justify-center gap-5">
				<Button
					title="No"
					onClick={() => (showConfirmation = false)}
					background="bg-sky-500"
					color={'text-white'}
				/>
				<Button
					title="Yes"
					onClick={quizStore.reset}
					background="bg-rose-500"
					color={'text-white'}
				/>
			</div>
		</div>
	</div>
{/if}

<div class="container flex h-full w-full flex-col items-center justify-between">
	{#if $quizStore.finished && $quizStore.quiz.score! >= 80}
		<div class="absolute inset-0 -z-10 -mt-10">
			<Confetti
				x={[-5, 5]}
				y={[0, 0.1]}
				delay={[0, 1500]}
				infinite
				duration={5000}
				amount={500}
				fallDistance="100vh"
			/>
		</div>
	{/if}

	<div class="flex w-full flex-row items-center justify-between gap-10 py-5">
		<div>
			{#if !$quizStore.finished}
				<Button title="Leave" icon="arrow_back" onClick={backToMain} color="text-rose-500" />
			{/if}
		</div>

		<div class="flex flex-row items-center justify-center gap-1 rounded-lg px-5 py-2">
			<span class="text-xl font-medium">Time Left:</span>
			<span
				class="text-xl font-medium"
				style="color: hsl({$quizStore.timeLeft * 1.2}, {theme === 'light' ? '50%' : '100%'}, 50%)"
			>
				{$quizStore.timeLeft}
			</span>
		</div>
	</div>

	<div class="flex h-full w-full flex-col items-center justify-center gap-5">
		{#if $quizStore.finished}
			<div class="flex w-full flex-col items-center justify-center gap-5">
				<span class="text-3xl font-semibold">
					You scored <span
						style="color: hsl({$quizStore.quiz.score! * 1.2}, {theme === 'light'
							? '50%'
							: '100%'}, 50%)"
					>
						{$quizStore.quiz.score}
					</span>
					out of <span class="text-sky-500">{$quizStore.quiz.questions.length * 10}</span>
				</span>
			</div>
		{:else}
			<div class="flex w-full flex-row items-center justify-center gap-5">
				<div class="flex w-full items-center justify-end">
					<Button
						icon="chevron_left"
						onClick={quizStore.previous}
						disabled={$quizStore.currentQuestionIndex === 0}
						background="bg-sky-500"
						color={'text-white'}
					/>
				</div>

				<div
					class="px- 2 flex flex-col items-center justify-center gap-1 rounded-lg bg-sky-500 px-10 py-2 text-white"
				>
					<span class="uppercase">Question</span>
					<div class="flex flex-col items-center justify-center gap-2">
						<span>{$quizStore.currentQuestionIndex + 1} of {$quizStore.quiz.questions.length}</span>
					</div>
				</div>

				<div class="flex w-full items-center justify-start">
					<Button
						icon="chevron_right"
						onClick={quizStore.next}
						disabled={$quizStore.currentQuestionIndex === $quizStore.quiz.questions.length - 1}
						background="bg-sky-500"
						color={'text-white'}
					/>
				</div>
			</div>
		{/if}

		{#if $quizStore.currentQuestionIndex === -1}
			<div class="flex min-h-[46.27vh] w-full flex-col items-center justify-center gap-10">
				<span class="max-w-3xl text-center text-2xl font-semibold">
					Yay! You've completed the quiz! Click the indicators below to see your answers.
				</span>
			</div>
		{:else}
			<div class="flex min-h-60 w-full flex-col items-center justify-center gap-10">
				<span class="max-w-5xl text-center text-2xl font-semibold">
					{he.decode($quizStore.quiz.questions[$quizStore.currentQuestionIndex].question)}
				</span>
			</div>

			<div class="flex min-h-72 min-w-96 flex-col items-center justify-start gap-5">
				{#each $quizStore.quiz.questions[$quizStore.currentQuestionIndex].answers as answer}
					<AnswerButton
						{answer}
						state={$quizStore.quiz.questions[$quizStore.currentQuestionIndex].selectedAnswer ===
						answer
							? $quizStore.finished
								? answer.correct
									? 'correct'
									: 'incorrect'
								: 'selected'
							: $quizStore.finished && answer.correct
								? 'answer'
								: 'default'}
						onClick={() => {
							quizStore.select(answer);
						}}
					/>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex w-full flex-col items-center justify-center gap-10">
		<div class="flex flex-row items-center justify-center gap-2">
			{#if $quizStore.finished}
				<IndicatorDot
					index={-1}
					state={'completed'}
					onClick={() => {
						quizStore.goTo(-1);
					}}
					isCurrent={$quizStore.currentQuestionIndex === -1}
				/>
			{/if}
			{#each $quizStore.quiz.questions as question}
				<IndicatorDot
					index={$quizStore.quiz.questions.indexOf(question) + 1}
					state={question.selectedAnswer
						? $quizStore.finished
							? question.selectedAnswer.correct
								? 'true'
								: 'false'
							: 'completed'
						: 'default'}
					onClick={() => {
						quizStore.goTo($quizStore.quiz.questions.indexOf(question));
					}}
					isCurrent={$quizStore.currentQuestionIndex ===
						$quizStore.quiz.questions.indexOf(question)}
				/>
			{/each}
		</div>

		<div class="min-h-20">
			{#if $quizStore.finished}
				<Button
					title="Back to Menu"
					onClick={backToMain}
					background="bg-sky-500"
					color={'text-white'}
				/>
			{:else if $quizStore.showCompleteButton}
				<Button
					title="Complete Quiz"
					onClick={quizStore.finish}
					background="bg-emerald-500"
					color={'text-white'}
				/>
			{/if}
		</div>
	</div>
</div>

<script>
	import QuizPage from '$lib/components/Quiz/QuizPage.svelte';
	import WelcomePage from '$lib/components/Welcome/WelcomePage.svelte';
	import { quizStore } from '$lib/stores/quizStore';
</script>

{#if $quizStore.quiz.id === ''}
	<WelcomePage />
{:else}
	<QuizPage />
{/if}

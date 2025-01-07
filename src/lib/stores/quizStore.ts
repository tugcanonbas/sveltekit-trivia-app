import { writable } from 'svelte/store';
import { emptyQuiz, type Quiz } from '$lib/types/Quiz';
import type { Answer } from '$lib/types/Answer';

function createQuizStore() {
	const { subscribe, set, update } = writable({
		quiz: emptyQuiz as Quiz,
		currentQuestionIndex: 0 as number,
		timeLeft: 0 as number,
		finished: false,
		showCompleteButton: false
	});

	subscribe((state) => {
		let selectedAnswers = 0;

		state.quiz.questions.forEach((question) => {
			if (question.selectedAnswer) {
				selectedAnswers++;
			}
		});

		if (
			selectedAnswers === state.quiz.questions.length ||
			state.currentQuestionIndex === state.quiz.questions.length - 1
		) {
			state.showCompleteButton = true;
		} else {
			state.showCompleteButton = false;
		}
	});

	let timer: number;

	function setQuiz(quiz: Quiz) {
		set({
			quiz,
			currentQuestionIndex: 0,
			timeLeft: quiz.questions.length * 10,
			finished: false,
			showCompleteButton: false
		});
	}

	function start() {
		timer = setInterval(() => {
			update((state) => {
				if (state.timeLeft === 0 && !state.finished) {
					finish();
				} else {
					state.timeLeft--;
				}

				return state;
			});
		}, 1000);
	}

	function finish() {
		clearInterval(timer);

		update((state) => {
			state.finished = true;
			state.quiz.score = 0;
			state.currentQuestionIndex = -1;
			state.showCompleteButton = false;

			state.quiz.questions.forEach((question) => {
				if (question.selectedAnswer && question.selectedAnswer.correct) {
					state.quiz.score! += 10;
				}
			});

			return state;
		});
	}

	function reset() {
		clearInterval(timer);
		update((state) => {
			state.quiz = emptyQuiz;
			state.currentQuestionIndex = -1;
			state.timeLeft = 0;
			state.finished = false;
			return state;
		});
	}

	function setAsSeen() {
		update((state) => {
			state.quiz.questions[state.currentQuestionIndex].seen = true;
			return state;
		});
	}

	function select(answer: Answer) {
		update((state) => {
			if (state.finished) {
				return state;
			}

			if (answer === state.quiz.questions[state.currentQuestionIndex].selectedAnswer) {
				state.quiz.questions[state.currentQuestionIndex].selectedAnswer = undefined;
			} else {
				state.quiz.questions[state.currentQuestionIndex].selectedAnswer = answer;
			}
			return state;
		});
	}

	function next() {
		update((state) => {
			state.currentQuestionIndex++;
			return state;
		});
	}

	function previous() {
		update((state) => {
			state.currentQuestionIndex--;
			return state;
		});
	}

	function goTo(index: number) {
		update((state) => {
			state.currentQuestionIndex = index;
			return state;
		});
	}

	return {
		subscribe,
		setQuiz,
		start,
		finish,
		reset,
		setAsSeen,
		select,
		next,
		previous,
		goTo
	};
}

export const quizStore = createQuizStore();

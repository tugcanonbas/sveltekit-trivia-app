import type { APIQuestion } from '$lib/types/APIQuestion';
import type { Question } from '$lib/types/Question';
import { v4 as uuidv4 } from 'uuid';
import type { Answer } from '$lib/types/Answer';

export function convertAPIQuestions(apiQuestions: APIQuestion[]): Question[] {
	return apiQuestions.map((apiQuestion) => {
		const incorrectAnswers: Answer[] = apiQuestion.incorrect_answers.map((answer) => {
			return {
				id: uuidv4(),
				text: answer,
				correct: false
			};
		});

		const correctAnswer: Answer = {
			id: uuidv4(),
			text: apiQuestion.correct_answer,
			correct: true
		};

		const answers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

		const question: Question = {
			id: uuidv4(),
			type: apiQuestion.type,
			difficulty: apiQuestion.difficulty,
			category: apiQuestion.category,
			question: apiQuestion.question,
			answers: answers,
			selectedAnswer: undefined,
			seen: false
		};

		return question;
	});
}

import Type from '$lib/enums/Type';
import Difficulty from '$lib/enums/Difficulty';
import Category from '$lib/enums/Category';

export type APIQuestion = {
	type: Type;
	difficulty: Difficulty;
	category: Category;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
};

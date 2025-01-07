import Category from '$lib/enums/Category';
import Difficulty from '$lib/enums/Difficulty';
import Type from '$lib/enums/Type';
import type { Question } from '$lib/types/Question';

export type Quiz = {
	id: string;
	date: Date;
	questions: Question[];
	type: Type;
	category: Category;
	difficulty: Difficulty;
	score?: number;
};

export const emptyQuiz: Quiz = {
	id: '',
	date: new Date(),
	questions: [],
	type: Type.multiple,
	category: Category.any,
	difficulty: Difficulty.any
};

export const newQuiz = (
	id: string,
	date: Date,
	questions: Question[],
	type: Type,
	category: Category,
	difficulty: Difficulty
): Quiz => {
	return {
		id,
		date,
		questions,
		type,
		category,
		difficulty
	};
};

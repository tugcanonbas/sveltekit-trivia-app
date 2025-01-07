import Type from '$lib/enums/Type';
import Difficulty from '$lib/enums/Difficulty';
import Category from '$lib/enums/Category';
import type { Answer } from '$lib/types/Answer';

export type Question = {
	id: string;
	type: Type;
	difficulty: Difficulty;
	category: Category;
	question: string;
	answers: Answer[];
	selectedAnswer?: Answer;
	seen: boolean;
};

export const emptyQuestion: Question = {
	id: '',
	type: Type.multiple,
	difficulty: Difficulty.any,
	category: Category.any,
	question: '',
	answers: [],
	seen: false
};

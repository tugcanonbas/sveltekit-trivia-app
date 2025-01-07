import type { APIResponse } from '$lib/types/APIResponse';
import type { APIQuestion } from './types/APIQuestion';

async function handleRequest(
	endpoint: string,
	method: 'GET' = 'GET',
	query: string | undefined = undefined
): Promise<APIQuestion[]> {
	const baseURL = 'https://opentdb.com/api.php';

	try {
		const options: RequestInit = {
			method
		};

		if (query) {
			endpoint += query;
		}

		const response = await fetch(baseURL + endpoint, options);

		const data = (await response.json()) as APIResponse;

		if (data.response_code !== 0) {
			throw new Error(`Error in request: ${data}`);
		}

		if (data.results === undefined) {
			throw new Error(`Error in request: ${data}`);
		}

		return data.results;
	} catch (error) {
		console.log('Error in api request: ', error);
		throw error;
	}
}

export const api = {
	getQuestions: (
		amount: number = 10,
		category?: string,
		difficulty?: string,
		type?: string
	): Promise<APIQuestion[]> => {
		const apiQuestions: Promise<APIQuestion[]> = handleRequest(
			`?amount=${amount}${category ? `&category=${category}` : ''}${
				difficulty ? `&difficulty=${difficulty}` : ''
			}${type ? `&type=${type}` : ''}`
		);

		return apiQuestions;
	}
};

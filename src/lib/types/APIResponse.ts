import type { APIQuestion } from '$lib/types/APIQuestion';

export type APIResponse = {
	response_code: number;
	results: APIQuestion[];
};

import type { ApiError } from '$lib/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

function getAccessToken(): string | null {
	if (typeof localStorage === 'undefined') return null;
	return localStorage.getItem('access_token');
}

export async function apiFetch<T>(
	path: string,
	options: RequestInit = {}
): Promise<T> {
	const token = getAccessToken();

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(options.headers as Record<string, string>)
	};

	if (token) headers['Authorization'] = `Bearer ${token}`;

	const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

	if (!res.ok) {
		let err: ApiError;
		try {
			err = await res.json();
		} catch {
			err = { message: res.statusText, status: res.status };
		}
		throw err;
	}

	if (res.status === 204) return undefined as T;
	return res.json() as Promise<T>;
}

export const api = {
	get: <T>(path: string, init?: RequestInit) =>
		apiFetch<T>(path, { ...init, method: 'GET' }),

	post: <T>(path: string, body: unknown, init?: RequestInit) =>
		apiFetch<T>(path, { ...init, method: 'POST', body: JSON.stringify(body) }),

	patch: <T>(path: string, body: unknown, init?: RequestInit) =>
		apiFetch<T>(path, { ...init, method: 'PATCH', body: JSON.stringify(body) }),

	put: <T>(path: string, body: unknown, init?: RequestInit) =>
		apiFetch<T>(path, { ...init, method: 'PUT', body: JSON.stringify(body) }),

	delete: <T>(path: string, init?: RequestInit) =>
		apiFetch<T>(path, { ...init, method: 'DELETE' })
};

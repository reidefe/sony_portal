import { api } from './client';
import type { User } from '$lib/types';

export interface UpdateProfilePayload {
	name?: string;
	bio?: string;
	avatar?: string;
}

export interface ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
}

export const userApi = {
	getProfile: () =>
		api.get<User>('/users/me'),

	updateProfile: (payload: UpdateProfilePayload) =>
		api.patch<User>('/users/me', payload),

	changePassword: (payload: ChangePasswordPayload) =>
		api.post<void>('/users/me/change-password', payload),

	deleteAccount: () =>
		api.delete<void>('/users/me'),

	uploadAvatar: async (file: File): Promise<{ url: string }> => {
		const form = new FormData();
		form.append('avatar', file);
		const token = localStorage.getItem('access_token');
		const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';
		const res = await fetch(`${base}/users/me/avatar`, {
			method: 'POST',
			headers: token ? { Authorization: `Bearer ${token}` } : {},
			body: form
		});
		if (!res.ok) throw await res.json();
		return res.json();
	}
};

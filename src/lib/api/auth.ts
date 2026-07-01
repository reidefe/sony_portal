import { api } from './client';
import type { AuthResponse, LoginPayload, SignupPayload, User } from '$lib/types';

export const authApi = {
	login: (payload: LoginPayload) =>
		api.post<AuthResponse>('/auth/login', payload),

	signup: (payload: SignupPayload) =>
		api.post<AuthResponse>('/auth/signup', payload),

	logout: () =>
		api.post<void>('/auth/logout', {}),

	refreshToken: (refreshToken: string) =>
		api.post<AuthResponse>('/auth/refresh', { refreshToken }),

	me: () =>
		api.get<User>('/auth/me'),

	forgotPassword: (email: string) =>
		api.post<void>('/auth/forgot-password', { email }),

	resetPassword: (token: string, password: string) =>
		api.post<void>('/auth/reset-password', { token, password }),

	verifyEmail: (token: string) =>
		api.post<void>('/auth/verify-email', { token })
};

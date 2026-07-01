import { writable, derived, get } from 'svelte/store';
import type { User, AuthTokens } from '$lib/types';
import { authApi } from '$lib/api/auth';
import { goto } from '$app/navigation';

interface AuthState {
	user: User | null;
	tokens: AuthTokens | null;
	loading: boolean;
	initialized: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		tokens: null,
		loading: false,
		initialized: false
	});

	function persistTokens(tokens: AuthTokens) {
		localStorage.setItem('access_token', tokens.accessToken);
		localStorage.setItem('refresh_token', tokens.refreshToken);
		localStorage.setItem('token_expires_at', String(tokens.expiresAt));
	}

	function clearTokens() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('token_expires_at');
	}

	return {
		subscribe,

		async init() {
			const accessToken = localStorage.getItem('access_token');
			const refreshToken = localStorage.getItem('refresh_token');
			const expiresAt = Number(localStorage.getItem('token_expires_at') ?? 0);

			if (!accessToken) {
				update(s => ({ ...s, initialized: true }));
				return;
			}

			update(s => ({ ...s, loading: true }));

			try {
				// Refresh if within 5 minutes of expiry
				if (Date.now() > expiresAt - 5 * 60 * 1000 && refreshToken) {
					const res = await authApi.refreshToken(refreshToken);
					persistTokens(res.tokens);
					set({ user: res.user, tokens: res.tokens, loading: false, initialized: true });
				} else {
					const user = await authApi.me();
					set({
						user,
						tokens: { accessToken, refreshToken: refreshToken ?? '', expiresAt },
						loading: false,
						initialized: true
					});
				}
			} catch {
				clearTokens();
				set({ user: null, tokens: null, loading: false, initialized: true });
			}
		},

		async login(email: string, password: string) {
			update(s => ({ ...s, loading: true }));
			const res = await authApi.login({ email, password });
			persistTokens(res.tokens);
			set({ user: res.user, tokens: res.tokens, loading: false, initialized: true });
			return res.user;
		},

		async signup(name: string, email: string, password: string) {
			update(s => ({ ...s, loading: true }));
			const res = await authApi.signup({ name, email, password });
			persistTokens(res.tokens);
			set({ user: res.user, tokens: res.tokens, loading: false, initialized: true });
			return res.user;
		},

		async logout() {
			try { await authApi.logout(); } catch { /* best-effort */ }
			clearTokens();
			set({ user: null, tokens: null, loading: false, initialized: true });
			goto('/');
		},

		updateUser(user: User) {
			update(s => ({ ...s, user }));
		}
	};
}

export const auth = createAuthStore();
export const user = derived(auth, $a => $a.user);
export const isAuthenticated = derived(auth, $a => !!$a.user);
export const authLoading = derived(auth, $a => $a.loading);

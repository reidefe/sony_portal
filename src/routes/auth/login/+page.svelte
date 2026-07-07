<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { auth } from '$lib/stores/auth';
	import Button from '$lib/components/ui/Button.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	$: redirectTo = $page.url.searchParams.get('redirect') ?? '/dashboard';

	async function submit() {
		error = '';
		if (!email || !password) { error = 'Please fill in all fields.'; return; }
		loading = true;
		try {
			await auth.login(email, password);
			goto(redirectTo);
		} catch (e: any) {
			error = e.message ?? 'Invalid email or password.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head><title>Sign In — S&L IT Services</title></svelte:head>

<div class="auth-page">
	<div class="auth-card">
		<a href="/" class="auth-logo">
			<svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect width="28" height="28" rx="8" fill="var(--color-primary)"/><path d="M7 9h14M7 14h9M7 19h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>
			S&L IT Services
		</a>

		<h1>Welcome back</h1>
		<p class="auth-sub">Sign in to continue your learning journey.</p>

		{#if error}
			<Alert type="error">{error}</Alert>
		{/if}

		<form on:submit|preventDefault={submit} class="form" novalidate>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" type="email" bind:value={email} placeholder="you@example.com" autocomplete="email" required />
			</div>
			<div class="field">
				<label for="password">
					Password
					<a href="/auth/forgot-password" class="forgot-link">Forgot password?</a>
				</label>
				<input id="password" type="password" bind:value={password} placeholder="••••••••" autocomplete="current-password" required />
			</div>

			<Button type="submit" fullWidth size="lg" loading={loading}>Sign in</Button>
		</form>

		<p class="switch-auth">
			Don't have an account?
			<a href="/auth/signup{redirectTo !== '/dashboard' ? `?redirect=${redirectTo}` : ''}">Create one</a>
		</p>
	</div>
</div>

<style>
.auth-page {
	min-height: calc(100vh - var(--header-h));
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 1rem;
	background: var(--color-bg-alt);
}
.auth-card {
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-xl);
	padding: 2.5rem;
	width: 100%;
	max-width: 420px;
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
	box-shadow: var(--shadow-md);
}
.auth-logo {
	display: flex;
	align-items: center;
	gap: .5rem;
	font-weight: 800;
	font-size: 1.15rem;
	color: var(--color-text);
}
h1 { font-size: 1.625rem; font-weight: 800; }
.auth-sub { color: var(--color-text-muted); font-size: .9375rem; }
.form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: .375rem; }
.field label {
	font-size: .875rem;
	font-weight: 600;
	color: var(--color-text);
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.field input {
	padding: .625rem .875rem;
	border: 1.5px solid var(--color-border);
	border-radius: var(--radius-md);
	font-size: .9375rem;
	transition: border-color var(--transition);
	outline: none;
	background: var(--color-bg-alt);
}
.field input:focus { border-color: var(--color-primary); background: #fff; }
.forgot-link { font-size: .8125rem; font-weight: 400; color: var(--color-primary); }
.switch-auth { font-size: .875rem; text-align: center; color: var(--color-text-muted); }
.switch-auth a { color: var(--color-primary); font-weight: 600; }
</style>

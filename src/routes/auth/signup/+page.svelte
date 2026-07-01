<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { auth } from '$lib/stores/auth';
	import Button from '$lib/components/ui/Button.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let loading = false;
	let error = '';

	$: redirectTo = $page.url.searchParams.get('redirect') ?? '/dashboard';

	async function submit() {
		error = '';
		if (!name || !email || !password) { error = 'Please fill in all fields.'; return; }
		if (password !== confirmPassword) { error = 'Passwords do not match.'; return; }
		if (password.length < 8) { error = 'Password must be at least 8 characters.'; return; }
		loading = true;
		try {
			await auth.signup(name, email, password);
			goto(redirectTo);
		} catch (e: any) {
			error = e.message ?? 'Failed to create account. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head><title>Create Account — LearnHub</title></svelte:head>

<div class="auth-page">
	<div class="auth-card">
		<a href="/" class="auth-logo">
			<svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect width="28" height="28" rx="8" fill="var(--color-primary)"/><path d="M7 9h14M7 14h9M7 19h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>
			LearnHub
		</a>

		<div>
			<h1>Start learning today</h1>
			<p class="auth-sub">Create your free account and unlock 200+ courses.</p>
		</div>

		{#if error}
			<Alert type="error">{error}</Alert>
		{/if}

		<form on:submit|preventDefault={submit} class="form" novalidate>
			<div class="field">
				<label for="name">Full name</label>
				<input id="name" type="text" bind:value={name} placeholder="Jane Smith" autocomplete="name" required />
			</div>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" type="email" bind:value={email} placeholder="you@example.com" autocomplete="email" required />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input id="password" type="password" bind:value={password} placeholder="At least 8 characters" autocomplete="new-password" required />
			</div>
			<div class="field">
				<label for="confirm">Confirm password</label>
				<input id="confirm" type="password" bind:value={confirmPassword} placeholder="Repeat your password" autocomplete="new-password" required />
			</div>

			<Button type="submit" fullWidth size="lg" loading={loading}>Create account</Button>
		</form>

		<p class="terms">
			By creating an account you agree to our
			<a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
		</p>

		<p class="switch-auth">
			Already have an account?
			<a href="/auth/login{redirectTo !== '/dashboard' ? `?redirect=${redirectTo}` : ''}">Sign in</a>
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
.field label { font-size: .875rem; font-weight: 600; }
.field input {
	padding: .625rem .875rem;
	border: 1.5px solid var(--color-border);
	border-radius: var(--radius-md);
	font-size: .9375rem;
	outline: none;
	background: var(--color-bg-alt);
	transition: border-color var(--transition);
}
.field input:focus { border-color: var(--color-primary); background: #fff; }
.terms { font-size: .75rem; text-align: center; color: var(--color-text-muted); line-height: 1.5; }
.terms a { color: var(--color-primary); }
.switch-auth { font-size: .875rem; text-align: center; color: var(--color-text-muted); }
.switch-auth a { color: var(--color-primary); font-weight: 600; }
</style>

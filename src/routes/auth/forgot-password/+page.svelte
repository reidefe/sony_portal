<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { authApi } from '$lib/api/auth';

	let email = '';
	let loading = false;
	let sent = false;
	let error = '';

	async function submit() {
		error = '';
		if (!email) { error = 'Please enter your email address.'; return; }
		loading = true;
		try {
			await authApi.forgotPassword(email);
			sent = true;
		} catch (e: any) {
			error = e.message ?? 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head><title>Forgot Password — LearnHub</title></svelte:head>

<div class="auth-page">
	<div class="auth-card">
		<a href="/" class="auth-logo">
			<svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect width="28" height="28" rx="8" fill="var(--color-primary)"/><path d="M7 9h14M7 14h9M7 19h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>
			LearnHub
		</a>

		<h1>Reset your password</h1>
		<p class="auth-sub">Enter your email and we'll send you a reset link.</p>

		{#if error}<Alert type="error">{error}</Alert>{/if}

		{#if sent}
			<Alert type="success">
				Check your inbox! We sent a reset link to <strong>{email}</strong>.
			</Alert>
			<Button href="/auth/login" variant="secondary" fullWidth>Back to sign in</Button>
		{:else}
			<form on:submit|preventDefault={submit} class="form">
				<div class="field">
					<label for="email">Email address</label>
					<input id="email" type="email" bind:value={email} placeholder="you@example.com" autocomplete="email" required />
				</div>
				<Button type="submit" fullWidth size="lg" loading={loading}>Send reset link</Button>
			</form>
			<p class="switch-auth"><a href="/auth/login">← Back to sign in</a></p>
		{/if}
	</div>
</div>

<style>
.auth-page { min-height: calc(100vh - var(--header-h)); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; background: var(--color-bg-alt); }
.auth-card { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: 2.5rem; width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 1.25rem; box-shadow: var(--shadow-md); }
.auth-logo { display: flex; align-items: center; gap: .5rem; font-weight: 800; font-size: 1.15rem; color: var(--color-text); }
h1 { font-size: 1.625rem; font-weight: 800; }
.auth-sub { color: var(--color-text-muted); }
.form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: .375rem; }
.field label { font-size: .875rem; font-weight: 600; }
.field input { padding: .625rem .875rem; border: 1.5px solid var(--color-border); border-radius: var(--radius-md); font-size: .9375rem; outline: none; background: var(--color-bg-alt); transition: border-color var(--transition); }
.field input:focus { border-color: var(--color-primary); background: #fff; }
.switch-auth { font-size: .875rem; text-align: center; color: var(--color-text-muted); }
.switch-auth a { color: var(--color-primary); }
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth, isAuthenticated, user } from '$lib/stores/auth';
	import { userApi } from '$lib/api/user';
	import Button from '$lib/components/ui/Button.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { User } from '$lib/types';

	let profile: User | null = null;
	let savingProfile = false;
	let profileMsg = '';
	let profileErr = '';

	let currentPassword = '';
	let newPassword = '';
	let confirmNewPassword = '';
	let savingPw = false;
	let pwMsg = '';
	let pwErr = '';

	let name = '';

	onMount(async () => {
		if (!$isAuthenticated) { goto('/auth/login?redirect=/profile'); return; }
		try {
			profile = await userApi.getProfile();
			name = profile.name;
		} catch {
			profile = $user;
			name = $user?.name ?? '';
		}
	});

	async function saveProfile() {
		savingProfile = true;
		profileMsg = '';
		profileErr = '';
		try {
			const updated = await userApi.updateProfile({ name });
			auth.updateUser(updated);
			profile = updated;
			profileMsg = 'Profile updated successfully.';
		} catch (e: any) {
			profileErr = e.message ?? 'Failed to save profile.';
		} finally {
			savingProfile = false;
		}
	}

	async function changePassword() {
		pwMsg = '';
		pwErr = '';
		if (!currentPassword || !newPassword) { pwErr = 'Fill in all password fields.'; return; }
		if (newPassword !== confirmNewPassword) { pwErr = 'New passwords do not match.'; return; }
		if (newPassword.length < 8) { pwErr = 'New password must be at least 8 characters.'; return; }
		savingPw = true;
		try {
			await userApi.changePassword({ currentPassword, newPassword });
			pwMsg = 'Password updated successfully.';
			currentPassword = '';
			newPassword = '';
			confirmNewPassword = '';
		} catch (e: any) {
			pwErr = e.message ?? 'Failed to update password.';
		} finally {
			savingPw = false;
		}
	}
</script>

<svelte:head><title>Profile — S&L IT Services</title></svelte:head>

{#if !profile}
	<div class="loading-page"><div class="spinner" /></div>
{:else}
<div class="profile container">
	<div class="page-head">
		<h1>My Profile</h1>
		<p>Manage your account settings and password.</p>
	</div>

	<div class="profile__grid">
		<!-- Avatar -->
		<aside class="avatar-panel">
			<div class="avatar-wrap">
				{#if profile.avatar}
					<img src={profile.avatar} alt={profile.name} class="avatar" />
				{:else}
					<div class="avatar avatar--initials">{profile.name.charAt(0).toUpperCase()}</div>
				{/if}
			</div>
			<p class="avatar__name">{profile.name}</p>
			<p class="avatar__email">{profile.email}</p>
			<Badge>{profile.role}</Badge>
			<p class="avatar__since">Member since {new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
		</aside>

		<div class="forms">
			<!-- Personal info -->
			<section class="card">
				<h2>Personal information</h2>
				{#if profileMsg}<Alert type="success" dismissible on:close={() => (profileMsg = '')}>{profileMsg}</Alert>{/if}
				{#if profileErr}<Alert type="error" dismissible on:close={() => (profileErr = '')}>{profileErr}</Alert>{/if}
				<form on:submit|preventDefault={saveProfile} class="form">
					<div class="field">
						<label for="name">Full name</label>
						<input id="name" type="text" bind:value={name} required />
					</div>
					<div class="field">
						<label for="email-ro">Email address</label>
						<input id="email-ro" type="email" value={profile.email} disabled />
						<span class="field-hint">Contact support to change your email.</span>
					</div>
					<div class="form-actions">
						<Button type="submit" loading={savingProfile}>Save changes</Button>
					</div>
				</form>
			</section>

			<!-- Change password -->
			<section class="card">
				<h2>Change password</h2>
				{#if pwMsg}<Alert type="success" dismissible on:close={() => (pwMsg = '')}>{pwMsg}</Alert>{/if}
				{#if pwErr}<Alert type="error" dismissible on:close={() => (pwErr = '')}>{pwErr}</Alert>{/if}
				<form on:submit|preventDefault={changePassword} class="form" novalidate>
					<div class="field">
						<label for="cur-pw">Current password</label>
						<input id="cur-pw" type="password" bind:value={currentPassword} autocomplete="current-password" />
					</div>
					<div class="field">
						<label for="new-pw">New password</label>
						<input id="new-pw" type="password" bind:value={newPassword} autocomplete="new-password" />
					</div>
					<div class="field">
						<label for="conf-pw">Confirm new password</label>
						<input id="conf-pw" type="password" bind:value={confirmNewPassword} autocomplete="new-password" />
					</div>
					<div class="form-actions">
						<Button type="submit" loading={savingPw}>Update password</Button>
					</div>
				</form>
			</section>

			<!-- Danger zone -->
			<section class="card card--danger">
				<h2>Danger zone</h2>
				<p>Permanently delete your account and all associated data. This action cannot be undone.</p>
				<Button variant="danger" size="sm" on:click={() => {
					if (confirm('Are you sure? This cannot be undone.')) auth.logout();
				}}>
					Delete my account
				</Button>
			</section>
		</div>
	</div>
</div>
{/if}

<style>
.loading-page { display: flex; align-items: center; justify-content: center; height: 50vh; }
.spinner {
	width: 40px; height: 40px;
	border: 3px solid var(--color-border);
	border-top-color: var(--color-primary);
	border-radius: 50%;
	animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.profile { padding: 2.5rem 1.5rem; }
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-size: 1.75rem; font-weight: 800; }
.page-head p { color: var(--color-text-muted); margin-top: .25rem; }
.profile__grid { display: grid; grid-template-columns: 220px 1fr; gap: 2rem; align-items: start; }
.avatar-panel { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: .625rem; text-align: center; position: sticky; top: calc(var(--header-h) + 1rem); }
.avatar { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 3px solid var(--color-primary-light); }
.avatar--initials { width: 90px; height: 90px; border-radius: 50%; background: var(--color-primary); color: #fff; font-size: 2.25rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.avatar__name { font-weight: 700; font-size: 1rem; }
.avatar__email { font-size: .8125rem; color: var(--color-text-muted); }
.avatar__since { font-size: .75rem; color: var(--color-text-light); }
.forms { display: flex; flex-direction: column; gap: 1.5rem; }
.card { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem; }
.card h2 { font-size: 1.125rem; font-weight: 700; }
.card--danger { border-color: #fecaca; }
.card--danger h2 { color: var(--color-danger); }
.card--danger p { font-size: .875rem; color: var(--color-text-muted); }
.form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: .375rem; }
.field label { font-size: .875rem; font-weight: 600; }
.field input { padding: .625rem .875rem; border: 1.5px solid var(--color-border); border-radius: var(--radius-md); font-size: .9375rem; outline: none; background: var(--color-bg-alt); transition: border-color var(--transition); }
.field input:focus { border-color: var(--color-primary); background: #fff; }
.field input:disabled { opacity: .6; cursor: not-allowed; }
.field-hint { font-size: .75rem; color: var(--color-text-muted); }
.form-actions { display: flex; justify-content: flex-end; padding-top: .25rem; }
@media (max-width: 768px) { .profile__grid { grid-template-columns: 1fr; } .avatar-panel { position: static; } }
</style>

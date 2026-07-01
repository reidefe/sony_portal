<script lang="ts">
	import { page } from '$app/stores';
	import { auth, isAuthenticated, user } from '$lib/stores/auth';
	import Button from '$lib/components/ui/Button.svelte';

	let menuOpen = false;

	const navLinks = [
		{ href: '/courses', label: 'Courses' },
		{ href: '/courses?isFree=true', label: 'Free' }
	];

	function closeMenu() { menuOpen = false; }
</script>

<header class="header">
	<div class="container header__inner">
		<a href="/" class="logo" on:click={closeMenu}>
			<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
				<rect width="28" height="28" rx="8" fill="var(--color-primary)" />
				<path d="M7 9h14M7 14h9M7 19h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
			</svg>
			<span>LearnHub</span>
		</a>

		<nav class="nav" class:nav--open={menuOpen} aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav__link"
					class:nav__link--active={$page.url.pathname === link.href}
					on:click={closeMenu}
				>
					{link.label}
				</a>
			{/each}

			{#if $isAuthenticated}
				<a href="/dashboard" class="nav__link" class:nav__link--active={$page.url.pathname === '/dashboard'} on:click={closeMenu}>Dashboard</a>
			{/if}
		</nav>

		<div class="header__actions">
			{#if $isAuthenticated}
				<a href="/profile" class="avatar-btn" title={$user?.name ?? 'Profile'} on:click={closeMenu}>
					{#if $user?.avatar}
						<img src={$user.avatar} alt={$user.name} class="avatar" />
					{:else}
						<div class="avatar avatar--initials">
							{($user?.name ?? 'U').charAt(0).toUpperCase()}
						</div>
					{/if}
				</a>
				<Button variant="ghost" size="sm" on:click={() => auth.logout()}>Sign out</Button>
			{:else}
				<Button href="/auth/login" variant="ghost" size="sm">Sign in</Button>
				<Button href="/auth/signup" variant="primary" size="sm">Get started</Button>
			{/if}
		</div>

		<button
			class="hamburger"
			class:hamburger--open={menuOpen}
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
			on:click={() => (menuOpen = !menuOpen)}
		>
			<span /><span /><span />
		</button>
	</div>
</header>

{#if menuOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="overlay" on:click={closeMenu} />
{/if}

<style>
.header {
	position: sticky;
	top: 0;
	z-index: 100;
	background: rgba(255,255,255,.95);
	backdrop-filter: blur(8px);
	border-bottom: 1px solid var(--color-border);
	height: var(--header-h);
}
.header__inner {
	display: flex;
	align-items: center;
	gap: 2rem;
	height: 100%;
}
.logo {
	display: flex;
	align-items: center;
	gap: .6rem;
	font-weight: 800;
	font-size: 1.2rem;
	color: var(--color-text);
	flex-shrink: 0;
}
.nav {
	display: flex;
	align-items: center;
	gap: .25rem;
	flex: 1;
}
.nav__link {
	padding: .4rem .75rem;
	border-radius: var(--radius-sm);
	font-weight: 500;
	font-size: .9375rem;
	color: var(--color-text-muted);
	transition: all var(--transition);
}
.nav__link:hover, .nav__link--active {
	color: var(--color-primary);
	background: var(--color-primary-light);
}
.header__actions {
	display: flex;
	align-items: center;
	gap: .5rem;
	margin-left: auto;
}
.avatar-btn { display: flex; align-items: center; }
.avatar {
	width: 34px; height: 34px;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid var(--color-primary-light);
}
.avatar--initials {
	width: 34px; height: 34px;
	border-radius: 50%;
	background: var(--color-primary);
	color: #fff;
	font-weight: 700;
	font-size: .875rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
.hamburger {
	display: none;
	flex-direction: column;
	gap: 5px;
	padding: .5rem;
	border-radius: var(--radius-sm);
}
.hamburger span {
	display: block;
	width: 22px; height: 2px;
	background: var(--color-text);
	border-radius: 2px;
	transition: all var(--transition);
}
.hamburger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger--open span:nth-child(2) { opacity: 0; }
.hamburger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.overlay {
	position: fixed; inset: 0;
	background: rgba(0,0,0,.3);
	z-index: 99;
}

@media (max-width: 768px) {
	.hamburger { display: flex; }
	.nav {
		position: fixed;
		top: var(--header-h); left: 0; right: 0;
		background: #fff;
		flex-direction: column;
		align-items: flex-start;
		padding: 1rem;
		border-bottom: 1px solid var(--color-border);
		z-index: 100;
		display: none;
		box-shadow: var(--shadow-lg);
	}
	.nav--open { display: flex; }
	.nav__link { width: 100%; padding: .75rem 1rem; }
	.header__actions { gap: .375rem; }
}
</style>

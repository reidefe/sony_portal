<script lang="ts">
	import { page } from '$app/stores';
	import { auth, isAuthenticated, user } from '$lib/stores/auth';
	import Button from '$lib/components/ui/Button.svelte';
	import { services } from '$lib/data/services';

	let menuOpen = false;
	let offerOpen = false;

	function closeAll() {
		menuOpen = false;
		offerOpen = false;
	}

	function toggleOffer() {
		offerOpen = !offerOpen;
	}
</script>

<header class="header">
	<div class="container header__inner">
		<!-- Logo -->
		<a href="/" class="logo" on:click={closeAll}>
			<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
				<rect width="28" height="28" rx="8" fill="var(--color-primary)" />
				<path d="M7 9h14M7 14h9M7 19h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
			</svg>
			<span>S&L IT Services</span>
		</a>

		<!-- Desktop nav -->
		<nav class="nav" class:nav--open={menuOpen} aria-label="Main navigation">
			<!-- What We Offer dropdown -->
			<div class="nav__dropdown" class:nav__dropdown--open={offerOpen}>
				<button
					class="nav__link nav__link--trigger"
					class:nav__link--active={offerOpen}
					aria-haspopup="true"
					aria-expanded={offerOpen}
					on:click={toggleOffer}
				>
					What We Offer
					<svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
						<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>

				{#if offerOpen}
					<div class="mega-menu" role="menu">
						{#each services as svc}
							<div class="mega-col">
								<a
									href={svc.href}
									class="mega-service"
									style="--svc-color:{svc.color};--svc-bg:{svc.bg}"
									on:click={closeAll}
									role="menuitem"
								>
									<span class="mega-service__icon">{svc.icon}</span>
									<div>
										<strong>{svc.label}</strong>
										<span>{svc.menuDesc}</span>
									</div>
								</a>
								<ul class="mega-links">
									{#each svc.links as link}
										<li>
											<a href={link.href} on:click={closeAll}>{link.label}</a>
										</li>
									{/each}
								</ul>
								<a href="/courses?service={svc.id}" class="mega-browse" on:click={closeAll}>
									Browse all {svc.label} →
								</a>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Mobile: flat service links -->
			{#each services as svc}
				<a
					href={svc.href}
					class="nav__link nav__link--mobile-only"
					on:click={closeAll}
				>
					{svc.icon} {svc.label}
				</a>
			{/each}

			{#if $isAuthenticated}
				<a
					href="/dashboard"
					class="nav__link"
					class:nav__link--active={$page.url.pathname === '/dashboard'}
					on:click={closeAll}
				>Dashboard</a>
			{/if}
		</nav>

		<!-- Actions -->
		<div class="header__actions">
			{#if $isAuthenticated}
				<a href="/profile" class="avatar-btn" title={$user?.name ?? 'Profile'} on:click={closeAll}>
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
			on:click={() => { menuOpen = !menuOpen; offerOpen = false; }}
		>
			<span /><span /><span />
		</button>
	</div>
</header>

<!-- Backdrop: closes mega-menu & mobile nav on outside click -->
{#if offerOpen || menuOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="overlay" on:click={closeAll} />
{/if}

<style>
/* ─── Base header ───────────────────────────────────────────────────────── */
.header {
	position: sticky;
	top: 0;
	z-index: 200;
	background: rgba(255,255,255,.97);
	backdrop-filter: blur(10px);
	border-bottom: 1px solid var(--color-border);
	height: var(--header-h);
}
.header__inner {
	display: flex;
	align-items: center;
	gap: 1.5rem;
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

/* ─── Desktop nav ───────────────────────────────────────────────────────── */
.nav {
	display: flex;
	align-items: center;
	gap: .125rem;
	flex: 1;
}
.nav__link {
	padding: .4rem .75rem;
	border-radius: var(--radius-sm);
	font-weight: 500;
	font-size: .9375rem;
	color: var(--color-text-muted);
	transition: all var(--transition);
	white-space: nowrap;
	border: none;
	background: none;
	font-family: inherit;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: .35rem;
}
.nav__link:hover, .nav__link--active {
	color: var(--color-primary);
	background: var(--color-primary-light);
}
.nav__link--trigger { user-select: none; }
.chevron { transition: transform var(--transition); }
.nav__dropdown--open .chevron { transform: rotate(180deg); }

/* Mobile-only links hidden on desktop */
.nav__link--mobile-only { display: none; }

/* ─── Actions ───────────────────────────────────────────────────────────── */
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
	display: flex; align-items: center; justify-content: center;
}

/* ─── Mega-menu ─────────────────────────────────────────────────────────── */
.nav__dropdown { position: relative; }

.mega-menu {
	position: absolute;
	top: calc(100% + .75rem);
	left: 50%;
	transform: translateX(-50%);
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-xl);
	box-shadow: 0 20px 60px rgba(0,0,0,.14);
	display: grid;
	grid-template-columns: repeat(4, 220px);
	gap: 0;
	padding: 1.25rem;
	z-index: 300;
	/* keep inside viewport */
	max-width: calc(100vw - 3rem);
}
/* Dividers between columns */
.mega-col:not(:last-child) {
	border-right: 1px solid var(--color-border);
	padding-right: 1.125rem;
	margin-right: 1.125rem;
}

.mega-col {
	display: flex;
	flex-direction: column;
	gap: .25rem;
}

/* Service header card */
.mega-service {
	display: flex;
	align-items: center;
	gap: .75rem;
	padding: .75rem;
	border-radius: var(--radius-md);
	background: var(--svc-bg);
	border: 1.5px solid transparent;
	margin-bottom: .5rem;
	transition: border-color var(--transition);
}
.mega-service:hover { border-color: var(--svc-color); }
.mega-service__icon {
	font-size: 1.625rem;
	width: 42px; height: 42px;
	display: flex; align-items: center; justify-content: center;
	background: #fff;
	border-radius: var(--radius-md);
	flex-shrink: 0;
	box-shadow: 0 2px 6px rgba(0,0,0,.08);
}
.mega-service strong {
	display: block;
	font-size: .875rem;
	font-weight: 700;
	color: var(--color-text);
	line-height: 1.3;
}
.mega-service span {
	display: block;
	font-size: .75rem;
	color: var(--color-text-muted);
	margin-top: .125rem;
}

/* Sub-links */
.mega-links {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: .1rem;
	padding: 0;
}
.mega-links a {
	display: block;
	padding: .3rem .625rem;
	font-size: .8375rem;
	color: var(--color-text-muted);
	border-radius: var(--radius-sm);
	transition: all var(--transition);
	line-height: 1.4;
}
.mega-links a:hover { background: var(--color-bg-alt); color: var(--color-primary); }

/* Browse all */
.mega-browse {
	display: inline-block;
	margin-top: .625rem;
	padding: .3rem .625rem;
	font-size: .8125rem;
	font-weight: 600;
	color: var(--color-primary);
	border-radius: var(--radius-sm);
	transition: background var(--transition);
}
.mega-browse:hover { background: var(--color-primary-light); }

/* ─── Hamburger ─────────────────────────────────────────────────────────── */
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

/* ─── Overlay ───────────────────────────────────────────────────────────── */
.overlay {
	position: fixed; inset: 0;
	background: rgba(0,0,0,.25);
	z-index: 150;
}

/* ─── Mobile ────────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
	.hamburger { display: flex; }
	.nav {
		position: fixed;
		top: var(--header-h); left: 0; right: 0;
		background: #fff;
		flex-direction: column;
		align-items: flex-start;
		padding: 1rem;
		border-bottom: 1px solid var(--color-border);
		z-index: 200;
		display: none;
		box-shadow: var(--shadow-lg);
		max-height: calc(100vh - var(--header-h));
		overflow-y: auto;
	}
	.nav--open { display: flex; }

	/* Hide the desktop trigger on mobile, show flat links instead */
	.nav__dropdown { display: none; }
	.nav__link--mobile-only { display: flex; width: 100%; padding: .75rem 1rem; }
	.nav__link { width: 100%; padding: .75rem 1rem; }

	/* No mega-menu on mobile */
	.mega-menu { display: none; }
	.header__actions { gap: .375rem; }
}

@media (max-width: 560px) {
	.header__actions :global(.btn--ghost) { display: none; }
}
</style>

<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: service = data.service;
</script>

<svelte:head>
	<title>{service.label} — S&L IT Services</title>
	<meta name="description" content={service.desc} />
</svelte:head>

<!-- ─── Banner ─────────────────────────────────────────────────────────────── -->
<section class="banner" style="--svc-color:{service.color};background:{service.gradient}">
	<div class="container banner__inner">
		<div class="banner__copy">
			<span class="banner__eyebrow">{service.icon} {service.label}</span>
			<h1 class="banner__title">{service.tagline}</h1>
			<p class="banner__desc">{service.desc}</p>
			<div class="banner__actions">
				<Button href="/courses?service={service.id}" size="lg">Browse {service.label} courses</Button>
				<Button href="#included" variant="outline" size="lg">See what's included</Button>
			</div>
		</div>

		<div class="banner__visual" aria-hidden="true">
			<div class="banner__blob" />
			<div class="banner__icon">{service.icon}</div>
			{#each service.highlights.slice(0, 3) as h, i}
				<div class="banner__card banner__card--{i + 1}">
					<span class="banner__card-dot" />
					{h}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── What's included ────────────────────────────────────────────────────── -->
<section class="section" id="included">
	<div class="container">
		<div class="section__head text-center">
			<span class="eyebrow" style="color:{service.color}">What's included</span>
			<h2 class="section__title">Everything you need for {service.label}</h2>
		</div>
		<div class="link-grid">
			{#each service.links as link}
				<a href={link.href} class="link-card" style="--svc-color:{service.color}">
					<span class="link-card__dot" />
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ─── CTA ─────────────────────────────────────────────────────────────────── -->
<section class="cta" style="background: linear-gradient(135deg, {service.color}, {service.color}cc)">
	<div class="container cta__inner">
		<h2>Ready to get started with {service.label}?</h2>
		<p>{service.desc}</p>
		<Button href="/courses?service={service.id}" size="lg">Browse {service.label} courses</Button>
	</div>
</section>

<style>
/* ─── Banner ──────────────────────────────────────────────────────────────── */
.banner { padding: 5rem 0; }
.banner__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.banner__eyebrow {
	display: inline-block;
	font-size: .8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
	color: var(--svc-color);
	background: #fff;
	padding: .35rem .9rem;
	border-radius: var(--radius-full);
	margin-bottom: 1rem;
}
.banner__title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.15; margin-bottom: 1.25rem; color: var(--color-text); }
.banner__desc { font-size: 1.0625rem; color: var(--color-text-muted); max-width: 480px; line-height: 1.7; margin-bottom: 1.75rem; }
.banner__actions { display: flex; gap: .75rem; flex-wrap: wrap; }
.banner__actions :global(.btn--outline) { border-color: var(--svc-color); color: var(--svc-color); }
.banner__actions :global(.btn--outline:hover) { background: var(--svc-color); color: #fff; }
.banner__actions :global(.btn--primary) { background: var(--svc-color); border-color: var(--svc-color); }

.banner__visual { position: relative; display: flex; align-items: center; justify-content: center; height: 380px; }
.banner__blob {
	position: absolute; width: 300px; height: 300px;
	background: var(--svc-color);
	border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
	opacity: .16;
}
.banner__icon {
	font-size: 4.5rem;
	width: 140px; height: 140px;
	display: flex; align-items: center; justify-content: center;
	background: #fff;
	border-radius: 50%;
	box-shadow: 0 12px 36px rgba(0,0,0,.14);
}
.banner__card {
	position: absolute;
	display: flex; align-items: center; gap: .5rem;
	background: #fff;
	padding: .625rem 1rem;
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-md);
	font-size: .8125rem; font-weight: 600;
	color: var(--color-text);
	white-space: nowrap;
}
.banner__card-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--svc-color); flex-shrink: 0; }
.banner__card--1 { top: 10px; right: 10px; }
.banner__card--2 { bottom: 40px; right: -10px; }
.banner__card--3 { bottom: 0; left: -10px; }

/* ─── Sections ────────────────────────────────────────────────────────────── */
.section { padding: 5rem 0; }
.section__head { margin-bottom: 2.5rem; }
.section__head.text-center { display: flex; flex-direction: column; align-items: center; text-align: center; }
.section__title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; }
.eyebrow { font-size: .8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; display: block; margin-bottom: .5rem; }

.link-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.link-card {
	display: flex; align-items: center; gap: .625rem;
	padding: 1.125rem 1.25rem;
	background: #fff;
	border: 1.5px solid var(--color-border);
	border-radius: var(--radius-lg);
	font-weight: 600;
	font-size: .9375rem;
	color: var(--color-text);
	transition: all var(--transition);
}
.link-card:hover { border-color: var(--svc-color); box-shadow: 0 8px 24px rgba(0,0,0,.08); transform: translateY(-2px); }
.link-card__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--svc-color); flex-shrink: 0; }

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
.cta { padding: 5rem 0; color: #fff; }
.cta__inner { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.cta h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; }
.cta p { font-size: 1.0625rem; opacity: .9; max-width: 560px; }
.cta :global(.btn--primary) { background: #fff; color: var(--color-text); border-color: #fff; }
.cta :global(.btn--primary:hover) { background: rgba(255,255,255,.85); }

/* ─── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
	.banner__inner { grid-template-columns: 1fr; }
	.banner__visual { display: none; }
	.link-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
	.link-grid { grid-template-columns: 1fr; }
}
</style>

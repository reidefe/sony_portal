<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/ui/Button.svelte';
	import CourseCard from '$lib/components/course/CourseCard.svelte';
	import type { Course } from '$lib/types';
	import { isAuthenticated } from '$lib/stores/auth';
	import { services } from '$lib/data/services';

	export let data: { featuredCourses: Course[]; categories: { id: string; name: string; slug: string; icon?: string }[] };

	const stats = [
		{ value: '50K+', label: 'Students enrolled' },
		{ value: '200+', label: 'Expert courses' },
		{ value: '95%', label: 'Completion rate' },
		{ value: '4.8★', label: 'Average rating' }
	];

	let activeIndex = 0;
	let timer: ReturnType<typeof setInterval> | undefined;

	function startRotation() {
		timer = setInterval(() => {
			activeIndex = (activeIndex + 1) % services.length;
		}, 4000);
	}
	function stopRotation() {
		if (timer) clearInterval(timer);
	}
	function showService(i: number) {
		activeIndex = i;
	}

	onMount(startRotation);
	onDestroy(stopRotation);

	$: activeService = services[activeIndex];

	const howItWorks = [
		{ num: '1', title: 'Create your account', desc: 'Sign up for free in under a minute. No credit card required.' },
		{ num: '2', title: 'Choose a service area', desc: 'Pick IT, Networking, Health, or Immigration — then find the course that fits your goals.' },
		{ num: '3', title: 'Learn & progress', desc: 'Complete lessons in order — each one unlocks the next as you go.' },
		{ num: '4', title: 'Earn your certificate', desc: 'Finish a course and download your verifiable certificate.' }
	];
</script>

<svelte:head>
	<title>S&L IT Services — IT, Networking, Health & Immigration Courses</title>
	<meta name="description" content="Access 200+ expert-led courses in IT, networking, healthcare and immigration. Learn at your own pace and unlock your potential." />
</svelte:head>

<!-- ─── Hero ───────────────────────────────────────────────────────────────── -->
<section class="hero">
	<div class="container hero__inner">
		<div class="hero__copy">
			<span class="hero__eyebrow">S&L IT Services</span>
			<h1 class="hero__title">
				Expert-led courses for<br />
				<span class="gradient-text">every stage of your career.</span>
			</h1>
			<p class="hero__sub">
				Explore practical, industry-recognised courses across IT, Networking, Health
				and Immigration — learn at your own pace, on your own schedule.
			</p>
			<div class="hero__badges">
				{#each services as svc, i}
					<button
						type="button"
						class="badge"
						class:badge--active={i === activeIndex}
						style="--svc-color:{svc.color};--svc-bg:{svc.bg}"
						on:click={() => showService(i)}
					>{svc.icon} {svc.label}</button>
				{/each}
			</div>
			<div class="hero__actions">
				{#if $isAuthenticated}
					<Button href="/dashboard" size="lg">Go to Dashboard</Button>
				{:else}
					<Button href="/auth/signup" size="lg">Start learning — it's free</Button>
					<Button href="/courses" variant="outline" size="lg">Browse all courses</Button>
				{/if}
			</div>
		</div>

		<div
			class="hero__visual"
			aria-hidden="true"
			on:mouseenter={stopRotation}
			on:mouseleave={startRotation}
		>
			<div class="hero__blob" style="background:{activeService.color}" />
			{#key activeIndex}
				<div class="hero__panel" in:fade={{ duration: 350 }} out:fade={{ duration: 150 }}>
					<div class="hero__panel-icon" style="background:{activeService.bg}">{activeService.icon}</div>
					<h3 style="color:{activeService.color}">{activeService.label}</h3>
					<p>{activeService.desc}</p>
					<a href={activeService.href} class="hero__panel-link" style="color:{activeService.color}">
						Explore {activeService.label} →
					</a>
				</div>
			{/key}
			<div class="hero__dots">
				{#each services as svc, i}
					<button
						type="button"
						class="hero__dot"
						class:hero__dot--active={i === activeIndex}
						style="--dot-color:{svc.color}"
						aria-label="Show {svc.label}"
						on:click={() => showService(i)}
					/>
				{/each}
			</div>
		</div>
	</div>

	<div class="hero__stats container">
		{#each stats as stat}
			<div class="stat">
				<span class="stat__value">{stat.value}</span>
				<span class="stat__label">{stat.label}</span>
			</div>
		{/each}
	</div>
</section>

<!-- ─── What We Offer ─────────────────────────────────────────────────────── -->
<section class="section" id="services">
	<div class="container">
		<div class="section__head text-center">
			<span class="eyebrow">What we offer</span>
			<h2 class="section__title">Four pathways to your future</h2>
			<p class="section__sub">Expert-led courses across the most in-demand career fields — all in one place.</p>
		</div>
		<div class="services-grid">
			{#each services as svc}
				<a href={svc.href} class="service-card" style="--svc-color:{svc.color};background:{svc.gradient}">
					<div class="service-card__header">
						<div class="service-card__icon">{svc.icon}</div>
						<h3>{svc.label}</h3>
					</div>
					<p class="service-card__desc">{svc.desc}</p>
					<ul class="service-card__list">
						{#each svc.highlights as h}
							<li>
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
									<path d="M2.5 7l3 3 6-6" stroke="var(--svc-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								{h}
							</li>
						{/each}
					</ul>
					<span class="service-card__cta">Explore {svc.label} →</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Categories (from API) ────────────────────────────────────────────── -->
{#if data.categories?.length}
<section class="section section--alt">
	<div class="container">
		<h2 class="section__title">Browse by category</h2>
		<div class="categories">
			{#each data.categories as cat}
				<a href="/courses?category={cat.slug}" class="cat-chip">
					{#if cat.icon}<span aria-hidden="true">{cat.icon}</span>{/if}
					{cat.name}
				</a>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- ─── Featured IT Courses ───────────────────────────────────────────────── -->
<section class="section" class:section--alt={!data.categories?.length}>
	<div class="container">
		<div class="section__head">
			<div>
				<span class="eyebrow">IT & Technology</span>
				<h2 class="section__title" style="margin-bottom:0">Featured courses</h2>
			</div>
			<Button href="/courses" variant="secondary" size="sm">View all</Button>
		</div>
		{#if data.featuredCourses?.length}
			<div class="course-grid">
				{#each data.featuredCourses as course}
					<CourseCard {course} />
				{/each}
			</div>
		{:else}
			<div class="empty">
				<p>No featured courses yet. <a href="/courses">Browse all courses</a>.</p>
			</div>
		{/if}
	</div>
</section>

<!-- ─── IT Spotlight banner ──────────────────────────────────────────────── -->
<section class="spotlight">
	<div class="container spotlight__inner">
		<div class="spotlight__copy">
			<span class="eyebrow" style="color:#fff;opacity:.7">IT & Technology spotlight</span>
			<h2>The skills tech employers are hiring for <em>right now</em></h2>
			<p>From entry-level roles to senior engineering — our IT courses are aligned with real job requirements and updated quarterly by industry experts.</p>
			<div class="spotlight__chips">
				{#each ['Python', 'AWS', 'React', 'SQL', 'Docker', 'CompTIA', 'Figma', 'Node.js'] as tag}
					<span class="spotlight__chip">{tag}</span>
				{/each}
			</div>
			<Button href="/courses?service=it" variant="outline" size="lg">Explore IT courses</Button>
		</div>
		<div class="spotlight__grid" aria-hidden="true">
			{#each itCards as c}
				<div class="it-card">
					<div class="it-card__icon">{c.icon}</div>
					<div class="it-card__label">{c.label}</div>
					<div class="it-card__stat">{c.stat}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<script lang="ts" context="module">
	const itCards = [
		{ icon: '🌐', label: 'Web Development', stat: '42 courses' },
		{ icon: '🔒', label: 'Cybersecurity', stat: '28 courses' },
		{ icon: '☁️', label: 'Cloud / AWS', stat: '19 courses' },
		{ icon: '🤖', label: 'Data Science & ML', stat: '24 courses' },
		{ icon: '🖥️', label: 'CompTIA A+', stat: '12 courses' },
		{ icon: '🐍', label: 'Python', stat: '16 courses' }
	];
</script>

<!-- ─── How it works ──────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container">
		<h2 class="section__title text-center">How S&L IT Services works</h2>
		<div class="steps">
			{#each howItWorks as step}
				<div class="step">
					<div class="step__num">{step.num}</div>
					<h3>{step.title}</h3>
					<p>{step.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── CTA ───────────────────────────────────────────────────────────────── -->
{#if !$isAuthenticated}
<section class="cta">
	<div class="container cta__inner">
		<h2>Ready to start your learning journey?</h2>
		<p>Join 50,000+ learners already growing on S&L IT Services — across IT, Networking, Health and Immigration.</p>
		<Button href="/auth/signup" size="lg" variant="primary">Get started for free</Button>
	</div>
</section>
{/if}

<style>
/* ─── Hero ───────────────────────────────────────────────────────────────── */
.hero { background: linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%); padding: 5rem 0 3rem; }
.hero__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.hero__eyebrow { font-size: .8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--color-primary); }
.hero__title { font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 800; line-height: 1.15; margin: .75rem 0 1.25rem; }
.gradient-text { background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero__sub { font-size: 1.0625rem; color: var(--color-text-muted); max-width: 480px; line-height: 1.7; }

/* Service badges under subtitle — also act as manual rotation triggers */
.hero__badges { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1rem 0 1.5rem; }
.badge {
	padding: .3rem .75rem;
	border-radius: var(--radius-full);
	font-size: .8125rem;
	font-weight: 600;
	background: var(--svc-bg);
	color: var(--svc-color);
	border: 1.5px solid transparent;
	transition: border-color var(--transition);
}
.badge--active { border-color: var(--svc-color); }

.hero__actions { display: flex; gap: .75rem; flex-wrap: wrap; }

/* Hero visual — auto-rotating service panel */
.hero__visual { position: relative; display: flex; align-items: center; justify-content: center; height: 380px; }
.hero__blob {
	position: absolute; width: 320px; height: 320px;
	border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
	opacity: .14;
	transition: background var(--transition);
}
.hero__panel {
	position: relative;
	background: #fff;
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-lg);
	padding: 2rem;
	width: 320px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: .625rem;
}
.hero__panel-icon {
	font-size: 2.25rem;
	width: 72px; height: 72px;
	border-radius: 50%;
	display: flex; align-items: center; justify-content: center;
	margin-bottom: .25rem;
}
.hero__panel h3 { font-size: 1.125rem; font-weight: 800; }
.hero__panel p { font-size: .875rem; color: var(--color-text-muted); line-height: 1.6; }
.hero__panel-link { font-size: .875rem; font-weight: 700; margin-top: .25rem; }

.hero__dots { position: absolute; bottom: -2.5rem; display: flex; gap: .5rem; }
.hero__dot {
	width: 9px; height: 9px;
	border-radius: 50%;
	background: var(--color-border);
	padding: 0;
	transition: all var(--transition);
}
.hero__dot--active { background: var(--dot-color); width: 22px; border-radius: var(--radius-full); }

/* Stats bar */
.hero__stats {
	display: grid; grid-template-columns: repeat(4, 1fr);
	gap: 1rem; margin-top: 3rem; padding: 2rem;
	background: #fff; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
}
.stat { text-align: center; }
.stat__value { display: block; font-size: 1.75rem; font-weight: 800; color: var(--color-primary); }
.stat__label { font-size: .8125rem; color: var(--color-text-muted); }

/* ─── Sections ────────────────────────────────────────────────────────────── */
.section { padding: 5rem 0; }
.section--alt { background: var(--color-bg-alt); }
.section__head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2rem; }
.section__head.text-center { flex-direction: column; align-items: center; }
.section__title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; margin-bottom: 2rem; }
.section__sub { font-size: 1.0625rem; color: var(--color-text-muted); max-width: 520px; text-align: center; }
.text-center { text-align: center; }
.eyebrow { font-size: .8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--color-primary); display: block; margin-bottom: .5rem; }

/* ─── Services grid ───────────────────────────────────────────────────────── */
.services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-top: 2.5rem; }
.service-card {
	border-radius: var(--radius-xl);
	padding: 1.75rem 1.5rem;
	border: 1.5px solid transparent;
	display: flex; flex-direction: column; gap: .875rem;
	transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
	cursor: pointer;
}
.service-card:hover {
	border-color: var(--svc-color);
	box-shadow: 0 8px 32px rgba(0,0,0,.1);
	transform: translateY(-3px);
}
.service-card__header { display: flex; align-items: center; gap: .875rem; }
.service-card__icon {
	font-size: 1.875rem;
	width: 52px; height: 52px;
	background: #fff;
	border-radius: var(--radius-md);
	display: flex; align-items: center; justify-content: center;
	box-shadow: 0 2px 8px rgba(0,0,0,.1);
	flex-shrink: 0;
}
.service-card h3 { font-size: 1.0625rem; font-weight: 800; color: var(--color-text); }
.service-card__desc { font-size: .875rem; color: var(--color-text-muted); line-height: 1.65; }
.service-card__list {
	list-style: none; padding: 0;
	display: flex; flex-direction: column; gap: .4rem;
	flex: 1;
}
.service-card__list li {
	display: flex; align-items: center; gap: .5rem;
	font-size: .8375rem; color: var(--color-text-muted);
}
.service-card__cta {
	margin-top: .5rem;
	font-size: .875rem; font-weight: 700;
	color: var(--svc-color);
}

/* ─── Categories ──────────────────────────────────────────────────────────── */
.categories { display: flex; flex-wrap: wrap; gap: .75rem; }
.cat-chip {
	padding: .5rem 1.125rem;
	background: #fff; border: 1px solid var(--color-border);
	border-radius: var(--radius-full);
	font-size: .875rem; font-weight: 500;
	transition: all var(--transition);
	display: flex; align-items: center; gap: .4rem;
}
.cat-chip:hover { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

/* ─── Course grid ─────────────────────────────────────────────────────────── */
.section__head { margin-bottom: 2rem; }
.course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
.empty { text-align: center; padding: 3rem; color: var(--color-text-muted); }
.empty a { color: var(--color-primary); }

/* ─── IT Spotlight ────────────────────────────────────────────────────────── */
.spotlight {
	background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
	padding: 5rem 0;
	color: #fff;
}
.spotlight__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.spotlight__copy .eyebrow { color: rgba(255,255,255,.7); }
.spotlight__copy h2 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; margin: .5rem 0 1rem; }
.spotlight__copy h2 em { font-style: italic; opacity: .85; }
.spotlight__copy p { font-size: 1rem; opacity: .85; line-height: 1.7; margin-bottom: 1.5rem; }
.spotlight__chips { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 2rem; }
.spotlight__chip {
	padding: .3rem .875rem;
	background: rgba(255,255,255,.18);
	border: 1px solid rgba(255,255,255,.3);
	border-radius: var(--radius-full);
	font-size: .8125rem; font-weight: 600;
}
.spotlight__copy :global(.btn--outline) { border-color: rgba(255,255,255,.5); color: #fff; }
.spotlight__copy :global(.btn--outline:hover) { background: rgba(255,255,255,.15); border-color: #fff; }

.spotlight__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.it-card {
	background: rgba(255,255,255,.12);
	border: 1px solid rgba(255,255,255,.2);
	border-radius: var(--radius-lg);
	padding: 1.25rem;
	text-align: center;
	backdrop-filter: blur(4px);
	transition: background var(--transition);
}
.it-card:hover { background: rgba(255,255,255,.2); }
.it-card__icon { font-size: 1.75rem; margin-bottom: .5rem; }
.it-card__label { font-size: .875rem; font-weight: 700; }
.it-card__stat { font-size: .75rem; opacity: .75; margin-top: .25rem; }

/* ─── Steps ───────────────────────────────────────────────────────────────── */
.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.step { text-align: center; }
.step__num {
	width: 52px; height: 52px;
	background: var(--color-primary-light);
	color: var(--color-primary);
	border-radius: 50%; font-size: 1.25rem; font-weight: 800;
	display: flex; align-items: center; justify-content: center;
	margin: 0 auto 1rem;
}
.step h3 { font-size: 1.0625rem; font-weight: 700; margin-bottom: .5rem; }
.step p { font-size: .875rem; color: var(--color-text-muted); line-height: 1.6; }

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
.cta { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: #fff; padding: 5rem 0; }
.cta__inner { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.cta h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; }
.cta p { font-size: 1.0625rem; opacity: .85; max-width: 540px; }
.cta :global(.btn--primary) { background: #fff; color: var(--color-primary); border-color: #fff; }
.cta :global(.btn--primary:hover) { background: var(--color-primary-light); }

/* ─── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 1100px) {
	.services-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
	.hero__inner { grid-template-columns: 1fr; }
	.hero__visual { display: none; }
	.hero__stats { grid-template-columns: repeat(2, 1fr); }
	.steps { grid-template-columns: repeat(2, 1fr); }
	.spotlight__inner { grid-template-columns: 1fr; }
	.spotlight__grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
	.services-grid { grid-template-columns: 1fr; }
	.hero__stats { grid-template-columns: 1fr 1fr; }
	.steps { grid-template-columns: 1fr; }
	.spotlight__grid { grid-template-columns: repeat(2, 1fr); }
}
</style>

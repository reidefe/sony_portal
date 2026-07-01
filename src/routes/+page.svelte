<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import CourseCard from '$lib/components/course/CourseCard.svelte';
	import type { Course } from '$lib/types';
	import { isAuthenticated } from '$lib/stores/auth';

	export let data: { featuredCourses: Course[]; categories: { id: string; name: string; slug: string; icon?: string }[] };

	const stats = [
		{ value: '50K+', label: 'Students enrolled' },
		{ value: '200+', label: 'Expert courses' },
		{ value: '95%', label: 'Completion rate' },
		{ value: '4.8★', label: 'Average rating' }
	];
</script>

<svelte:head>
	<title>LearnHub — Online Learning Platform</title>
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
<section class="hero">
	<div class="container hero__inner">
		<div class="hero__copy">
			<span class="hero__eyebrow">The #1 online learning platform</span>
			<h1 class="hero__title">
				Learn without limits.<br />
				<span class="gradient-text">Build your future.</span>
			</h1>
			<p class="hero__sub">
				Access 200+ expert-led courses in tech, design, business and more.
				Learn at your own pace and unlock your potential.
			</p>
			<div class="hero__actions">
				{#if $isAuthenticated}
					<Button href="/dashboard" size="lg">Go to Dashboard</Button>
				{:else}
					<Button href="/auth/signup" size="lg">Start learning — it's free</Button>
					<Button href="/courses" variant="outline" size="lg">Browse courses</Button>
				{/if}
			</div>
		</div>
		<div class="hero__visual" aria-hidden="true">
			<div class="hero__blob" />
			<div class="hero__card hero__card--1">
				<div class="hc__icon">🎓</div>
				<div>
					<div class="hc__title">Web Development</div>
					<div class="hc__sub">42 lessons · 8h total</div>
				</div>
			</div>
			<div class="hero__card hero__card--2">
				<div class="hc__progress">
					<div class="hc__progress-bar" style="width:72%" />
				</div>
				<div class="hc__sub">72% complete</div>
			</div>
			<div class="hero__card hero__card--3">
				<div class="hc__icon">✅</div>
				<div>
					<div class="hc__title">Certificate earned!</div>
					<div class="hc__sub">UI/UX Design</div>
				</div>
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

<!-- ─── Categories ────────────────────────────────────────────────────────── -->
{#if data.categories?.length}
<section class="section">
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

<!-- ─── Featured Courses ───────────────────────────────────────────────────── -->
<section class="section section--alt">
	<div class="container">
		<div class="section__head">
			<h2 class="section__title">Featured courses</h2>
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

<!-- ─── How it works ──────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container">
		<h2 class="section__title text-center">How it works</h2>
		<div class="steps">
			<div class="step">
				<div class="step__num">1</div>
				<h3>Create your account</h3>
				<p>Sign up for free in under a minute. No credit card required.</p>
			</div>
			<div class="step">
				<div class="step__num">2</div>
				<h3>Choose a course</h3>
				<p>Browse hundreds of courses and pick what matches your goals.</p>
			</div>
			<div class="step">
				<div class="step__num">3</div>
				<h3>Learn & progress</h3>
				<p>Complete lessons in order — each one unlocks the next as you go.</p>
			</div>
			<div class="step">
				<div class="step__num">4</div>
				<h3>Earn your certificate</h3>
				<p>Finish a course and download your verifiable certificate.</p>
			</div>
		</div>
	</div>
</section>

<!-- ─── CTA ───────────────────────────────────────────────────────────────── -->
{#if !$isAuthenticated}
<section class="cta">
	<div class="container cta__inner">
		<h2>Ready to start your learning journey?</h2>
		<p>Join 50,000+ learners already growing on LearnHub.</p>
		<Button href="/auth/signup" size="lg" variant="primary">Get started for free</Button>
	</div>
</section>
{/if}

<style>
/* Hero */
.hero { background: linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%); padding: 5rem 0 3rem; }
.hero__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.hero__eyebrow { font-size: .8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--color-primary); }
.hero__title { font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 800; line-height: 1.15; margin: .75rem 0 1.25rem; }
.gradient-text { background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero__sub { font-size: 1.0625rem; color: var(--color-text-muted); max-width: 480px; line-height: 1.7; }
.hero__actions { display: flex; gap: .75rem; flex-wrap: wrap; margin-top: 2rem; }

.hero__visual { position: relative; display: flex; align-items: center; justify-content: center; height: 360px; }
.hero__blob {
	position: absolute; width: 320px; height: 320px;
	background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
	border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
	opacity: .12;
}
.hero__card {
	position: absolute;
	background: #fff;
	border-radius: var(--radius-md);
	padding: .875rem 1.125rem;
	box-shadow: var(--shadow-md);
	display: flex;
	align-items: center;
	gap: .75rem;
	min-width: 200px;
}
.hero__card--1 { top: 20px; right: 0; }
.hero__card--2 { bottom: 80px; left: 0; flex-direction: column; align-items: flex-start; min-width: 160px; }
.hero__card--3 { bottom: 0; right: 20px; }
.hc__icon { font-size: 1.5rem; }
.hc__title { font-weight: 700; font-size: .875rem; }
.hc__sub { font-size: .75rem; color: var(--color-text-muted); }
.hc__progress { width: 100%; height: 6px; background: var(--color-border); border-radius: 3px; overflow: hidden; }
.hc__progress-bar { height: 100%; background: var(--color-primary); border-radius: 3px; }

.hero__stats {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
	margin-top: 3rem;
	padding: 2rem;
	background: #fff;
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-sm);
}
.stat { text-align: center; }
.stat__value { display: block; font-size: 1.75rem; font-weight: 800; color: var(--color-primary); }
.stat__label { font-size: .8125rem; color: var(--color-text-muted); }

/* Sections */
.section { padding: 5rem 0; }
.section--alt { background: var(--color-bg-alt); }
.section__title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; margin-bottom: 2rem; }
.section__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
.section__head .section__title { margin-bottom: 0; }

/* Categories */
.categories { display: flex; flex-wrap: wrap; gap: .75rem; }
.cat-chip {
	padding: .5rem 1.125rem;
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-full);
	font-size: .875rem;
	font-weight: 500;
	transition: all var(--transition);
	display: flex;
	align-items: center;
	gap: .4rem;
}
.cat-chip:hover { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

/* Course Grid */
.course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }

/* Steps */
.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.step { text-align: center; }
.step__num {
	width: 52px; height: 52px;
	background: var(--color-primary-light);
	color: var(--color-primary);
	border-radius: 50%;
	font-size: 1.25rem;
	font-weight: 800;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1rem;
}
.step h3 { font-size: 1.0625rem; font-weight: 700; margin-bottom: .5rem; }
.step p { font-size: .875rem; color: var(--color-text-muted); line-height: 1.6; }

/* CTA */
.cta { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: #fff; padding: 5rem 0; }
.cta__inner { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.cta h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; }
.cta p { font-size: 1.0625rem; opacity: .85; }
.cta :global(.btn--primary) { background: #fff; color: var(--color-primary); border-color: #fff; }
.cta :global(.btn--primary:hover) { background: var(--color-primary-light); }

.empty { text-align: center; padding: 3rem; color: var(--color-text-muted); }
.empty a { color: var(--color-primary); }

@media (max-width: 900px) {
	.hero__inner { grid-template-columns: 1fr; }
	.hero__visual { display: none; }
	.hero__stats { grid-template-columns: repeat(2, 1fr); }
	.steps { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
	.hero__stats { grid-template-columns: 1fr 1fr; }
	.steps { grid-template-columns: 1fr; }
}
</style>

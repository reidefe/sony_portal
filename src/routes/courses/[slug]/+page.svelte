<script lang="ts">
	import type { PageData } from './$types';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import StarRating from '$lib/components/ui/StarRating.svelte';
	import LessonItem from '$lib/components/course/LessonItem.svelte';
	import { isAuthenticated } from '$lib/stores/auth';
	import { coursesApi } from '$lib/api/courses';
	import Alert from '$lib/components/ui/Alert.svelte';

	export let data: PageData;

	$: course = data.course;
	$: sections = data.sections ?? [];
	$: enrollment = (course as any).enrollment;
	$: isUnlocked = (course as any).isUnlocked ?? course.isFree;

	let enrolling = false;
	let enrollError = '';
	let enrolled = !!enrollment;

	async function enroll() {
		enrolling = true;
		enrollError = '';
		try {
			await coursesApi.enroll(course.id);
			enrolled = true;
		} catch (e: any) {
			enrollError = e.message ?? 'Failed to enroll. Please try again.';
		} finally {
			enrolling = false;
		}
	}

	function fmt(m: number) {
		const h = Math.floor(m / 60);
		const min = m % 60;
		return h > 0 ? `${h}h ${min}m` : `${min}m`;
	}

	const levelBadge: Record<string, 'info' | 'warning' | 'danger'> = {
		beginner: 'info', intermediate: 'warning', advanced: 'danger'
	};
</script>

<svelte:head>
	<title>{course.title} — LearnHub</title>
	<meta name="description" content={course.shortDescription} />
</svelte:head>

<!-- Hero banner -->
<div class="hero">
	<div class="container hero__inner">
		<div class="hero__copy">
			<div class="breadcrumb">
				<a href="/courses">Courses</a>
				<span aria-hidden="true">›</span>
				<span>{course.category.name}</span>
			</div>

			<h1>{course.title}</h1>
			<p class="sub">{course.shortDescription}</p>

			<div class="meta-row">
				<Badge variant={levelBadge[course.level]}>{course.level}</Badge>
				<StarRating rating={course.rating} count={course.ratingCount} size="md" />
				<span class="meta-item">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
					{course.enrollmentCount.toLocaleString()} students
				</span>
				<span class="meta-item">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
					{fmt(course.duration)}
				</span>
				<span class="meta-item">{course.lessonCount} lessons</span>
			</div>

			<div class="instructor-line">
				{#if course.instructor.avatar}
					<img src={course.instructor.avatar} alt={course.instructor.name} class="inst-avatar" />
				{/if}
				<span>By <strong>{course.instructor.name}</strong>
					{#if course.instructor.title}· {course.instructor.title}{/if}
				</span>
			</div>
		</div>

		<!-- Sticky card -->
		<div class="enroll-card">
			<div class="enroll-card__thumb">
				<img src={course.thumbnail} alt={course.title} />
				{#if course.previewVideoUrl}
					<div class="play-overlay">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="white" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.5)"/><polygon points="10,8 18,12 10,16" fill="white"/></svg>
					</div>
				{/if}
			</div>

			<div class="enroll-card__body">
				{#if enrolled || isUnlocked}
					<div class="enrolled-state">
						{#if enrollment}
							<ProgressBar value={enrollment.progressPercent} label="Your progress" size="md" />
							<Button href="/courses/{course.slug}/learn" fullWidth size="lg">
								{enrollment.progressPercent > 0 ? 'Continue Learning' : 'Start Course'}
							</Button>
						{:else}
							<Button href="/courses/{course.slug}/learn" fullWidth size="lg">Start Course</Button>
						{/if}
					</div>
				{:else if $isAuthenticated}
					{#if enrollError}
						<Alert type="error">{enrollError}</Alert>
					{/if}
					<div class="price-row">
						{#if course.isFree}
							<span class="price price--free">Free</span>
						{:else}
							<span class="price">${course.price.toFixed(2)}</span>
						{/if}
					</div>
					<Button fullWidth size="lg" loading={enrolling} on:click={enroll}>
						{course.isFree ? 'Enroll for Free' : 'Enroll Now'}
					</Button>
					<p class="money-back">30-day money-back guarantee</p>
				{:else}
					<div class="price-row">
						{#if course.isFree}
							<span class="price price--free">Free</span>
						{:else}
							<span class="price">${course.price.toFixed(2)}</span>
						{/if}
					</div>
					<Button href="/auth/signup" fullWidth size="lg">Sign up to enroll</Button>
					<p class="login-hint">Already have an account? <a href="/auth/login">Sign in</a></p>
				{/if}

				<ul class="includes">
					<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>{fmt(course.duration)} of video content</li>
					<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>{course.lessonCount} lessons</li>
					<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Full lifetime access</li>
					<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>Certificate on completion</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<!-- Body -->
<div class="body container">
	<div class="body__main">
		<!-- What you'll learn -->
		{#if course.whatYouLearn?.length}
		<section class="body__section">
			<h2>What you'll learn</h2>
			<ul class="learn-list">
				{#each course.whatYouLearn as item}
					<li>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-success)" aria-hidden="true"><path d="M9 12.5l2.5 2.5 5-5"/><circle cx="12" cy="12" r="10" stroke="var(--color-success)" stroke-width="2" fill="none"/></svg>
						{item}
					</li>
				{/each}
			</ul>
		</section>
		{/if}

		<!-- Description -->
		<section class="body__section">
			<h2>About this course</h2>
			<p class="description">{course.description}</p>
		</section>

		<!-- Requirements -->
		{#if course.requirements?.length}
		<section class="body__section">
			<h2>Requirements</h2>
			<ul class="req-list">
				{#each course.requirements as req}
					<li>{req}</li>
				{/each}
			</ul>
		</section>
		{/if}

		<!-- Curriculum -->
		{#if sections.length}
		<section class="body__section">
			<h2>Course curriculum</h2>
			<p class="curriculum-summary">
				{sections.reduce((a, s) => a + s.lessons.length, 0)} lessons ·
				{fmt(sections.reduce((a, s) => a + s.lessons.reduce((b, l) => b + l.duration, 0), 0))}
			</p>
			<div class="curriculum">
				{#each sections as section}
					<details class="section-block" open={sections.indexOf(section) === 0}>
						<summary class="section-block__header">
							<span>{section.title}</span>
							<span class="section-block__meta">{section.lessons.length} lessons</span>
						</summary>
						<div class="section-block__lessons">
							{#each section.lessons as lesson}
								<LessonItem
									{lesson}
									courseSlug={course.slug}
									isUnlocked={isUnlocked || enrolled}
									isCompleted={enrollment?.completedLessons?.includes(lesson.id) ?? false}
									isActive={enrollment?.currentLessonId === lesson.id}
								/>
							{/each}
						</div>
					</details>
				{/each}
			</div>
		</section>
		{/if}

		<!-- Instructor -->
		<section class="body__section">
			<h2>Your instructor</h2>
			<div class="instructor-card">
				{#if course.instructor.avatar}
					<img src={course.instructor.avatar} alt={course.instructor.name} class="inst-img" />
				{/if}
				<div>
					<h3>{course.instructor.name}</h3>
					{#if course.instructor.title}<p class="inst-title">{course.instructor.title}</p>{/if}
					{#if course.instructor.bio}<p class="inst-bio">{course.instructor.bio}</p>{/if}
				</div>
			</div>
		</section>
	</div>
</div>

<style>
.hero { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: #fff; padding: 3rem 0; }
.hero__inner { display: grid; grid-template-columns: 1fr 360px; gap: 3rem; align-items: start; }
.breadcrumb { display: flex; align-items: center; gap: .5rem; font-size: .8125rem; opacity: .7; margin-bottom: 1rem; }
.breadcrumb a { color: #c7d2fe; }
.breadcrumb a:hover { color: #fff; }
h1 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; line-height: 1.3; margin-bottom: 1rem; }
.sub { font-size: 1.0625rem; opacity: .85; line-height: 1.6; margin-bottom: 1.25rem; max-width: 580px; }
.meta-row { display: flex; align-items: center; flex-wrap: wrap; gap: .75rem; margin-bottom: 1rem; font-size: .875rem; opacity: .9; }
.meta-item { display: flex; align-items: center; gap: .3rem; }
.instructor-line { display: flex; align-items: center; gap: .6rem; font-size: .875rem; opacity: .85; }
.inst-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }

/* Enroll card */
.enroll-card {
	background: #fff;
	color: var(--color-text);
	border-radius: var(--radius-lg);
	overflow: hidden;
	box-shadow: var(--shadow-lg);
	position: sticky;
	top: calc(var(--header-h) + 1rem);
}
.enroll-card__thumb { position: relative; aspect-ratio: 16/9; }
.enroll-card__thumb img { width: 100%; height: 100%; object-fit: cover; }
.play-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.enroll-card__body { padding: 1.25rem; display: flex; flex-direction: column; gap: .875rem; }
.enrolled-state { display: flex; flex-direction: column; gap: .75rem; }
.price-row { display: flex; align-items: baseline; gap: .5rem; }
.price { font-size: 2rem; font-weight: 800; }
.price--free { color: var(--color-success); }
.money-back { font-size: .75rem; text-align: center; color: var(--color-text-muted); }
.login-hint { font-size: .8125rem; text-align: center; color: var(--color-text-muted); }
.login-hint a { color: var(--color-primary); }
.includes { list-style: none; display: flex; flex-direction: column; gap: .5rem; font-size: .875rem; color: var(--color-text-muted); }
.includes li { display: flex; align-items: center; gap: .5rem; }

/* Body */
.body { padding: 3rem 1.5rem; }
.body__main { max-width: 760px; }
.body__section { margin-bottom: 2.5rem; }
.body__section h2 { font-size: 1.375rem; font-weight: 700; margin-bottom: 1rem; }
.learn-list { list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: .625rem; }
.learn-list li { display: flex; align-items: flex-start; gap: .5rem; font-size: .9rem; line-height: 1.5; }
.description { line-height: 1.8; color: var(--color-text-muted); }
.req-list { padding-left: 1.25rem; display: flex; flex-direction: column; gap: .4rem; color: var(--color-text-muted); font-size: .9rem; }
.curriculum-summary { font-size: .875rem; color: var(--color-text-muted); margin-bottom: 1rem; }
.curriculum { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.section-block { border-bottom: 1px solid var(--color-border); }
.section-block:last-child { border-bottom: none; }
.section-block__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: .875rem 1rem;
	cursor: pointer;
	font-weight: 600;
	background: var(--color-bg-alt);
	list-style: none;
	user-select: none;
}
.section-block__header::-webkit-details-marker { display: none; }
.section-block__meta { font-size: .8125rem; font-weight: 400; color: var(--color-text-muted); }
.section-block__lessons { padding: .375rem; }
.instructor-card { display: flex; gap: 1.25rem; align-items: flex-start; }
.inst-img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.inst-title { color: var(--color-text-muted); font-size: .875rem; margin-bottom: .5rem; }
.inst-bio { font-size: .875rem; color: var(--color-text-muted); line-height: 1.7; }

@media (max-width: 900px) {
	.hero__inner { grid-template-columns: 1fr; }
	.enroll-card { position: static; }
	.learn-list { grid-template-columns: 1fr; }
}
</style>

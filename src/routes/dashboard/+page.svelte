<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { coursesApi } from '$lib/api/courses';
	import { progressApi } from '$lib/api/progress';
	import type { Enrollment } from '$lib/types';
	import type { CourseWithProgress, PaginatedResponse } from '$lib/types';
	import CourseCard from '$lib/components/course/CourseCard.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let enrollments: Enrollment[] = [];
	let myCourses: PaginatedResponse<CourseWithProgress> = { data: [], total: 0, page: 1, limit: 6, totalPages: 0 };
	let loading = true;

	$: activeEnrollments = enrollments.filter(e => e.status === 'active');
	$: completedEnrollments = enrollments.filter(e => e.status === 'completed');
	$: inProgressCourses = myCourses.data.filter(c => {
		const e = enrollments.find(en => en.courseId === c.id);
		return e && e.progressPercent > 0 && e.progressPercent < 100;
	});

	onMount(async () => {
		if (!$isAuthenticated) { goto('/auth/login?redirect=/dashboard'); return; }
		try {
			const [enrResult, coResult] = await Promise.allSettled([
				progressApi.getMyEnrollments(),
				coursesApi.listForUser({ sort: 'newest', limit: 6 })
			]);
			if (enrResult.status === 'fulfilled') enrollments = enrResult.value;
			if (coResult.status === 'fulfilled') myCourses = coResult.value;
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head><title>Dashboard — LearnHub</title></svelte:head>

{#if loading}
	<div class="loading-page"><div class="spinner" /></div>
{:else}
<div class="dashboard container">
	<div class="welcome">
		<div>
			<h1>Welcome back, {$user?.name?.split(' ')[0] ?? 'there'}! 👋</h1>
			<p>Pick up where you left off, or explore something new.</p>
		</div>
		<Button href="/courses" variant="secondary">Browse more courses</Button>
	</div>

	<div class="stats-row">
		<div class="stat-card">
			<span class="stat-card__value">{activeEnrollments.length}</span>
			<span class="stat-card__label">Enrolled courses</span>
		</div>
		<div class="stat-card">
			<span class="stat-card__value">{completedEnrollments.length}</span>
			<span class="stat-card__label">Completed</span>
		</div>
		<div class="stat-card">
			<span class="stat-card__value">{inProgressCourses.length}</span>
			<span class="stat-card__label">In progress</span>
		</div>
		<div class="stat-card">
			<span class="stat-card__value">
				{activeEnrollments.length > 0
					? Math.round(activeEnrollments.reduce((s, e) => s + e.progressPercent, 0) / activeEnrollments.length)
					: 0}%
			</span>
			<span class="stat-card__label">Avg. progress</span>
		</div>
	</div>

	{#if inProgressCourses.length}
	<section class="section">
		<div class="section__head"><h2>Continue learning</h2></div>
		<div class="course-grid">
			{#each inProgressCourses as course}
				<CourseCard {course} showProgress={true} />
			{/each}
		</div>
	</section>
	{/if}

	{#if myCourses.data.length}
	<section class="section">
		<div class="section__head">
			<h2>My courses</h2>
			<Badge variant="neutral">{enrollments.length}</Badge>
		</div>
		<div class="course-grid">
			{#each myCourses.data as course}
				<CourseCard {course} showProgress={true} />
			{/each}
		</div>
	</section>
	{:else}
	<section class="empty-state">
		<div class="empty-state__icon" aria-hidden="true">📚</div>
		<h2>You haven't enrolled in any courses yet.</h2>
		<p>Discover our catalog and start your learning journey today.</p>
		<Button href="/courses" size="lg">Browse courses</Button>
	</section>
	{/if}

	{#if completedEnrollments.length}
	<section class="section">
		<div class="section__head"><h2>Completed courses</h2></div>
		<div class="completed-list">
			{#each completedEnrollments as enrollment}
				<div class="completed-item">
					<div>
						<div class="completed-item__title">Course #{enrollment.courseId}</div>
						<div class="completed-item__date">
							Completed {enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString() : '—'}
						</div>
					</div>
					<ProgressBar value={100} size="sm" showLabel={false} color="success" />
					{#if enrollment.certificate}
						<Button href={enrollment.certificate} variant="secondary" size="sm">Download cert</Button>
					{/if}
				</div>
			{/each}
		</div>
	</section>
	{/if}
</div>
{/if}

<style>
.loading-page { display: flex; align-items: center; justify-content: center; height: 50vh; }
.spinner { width: 40px; height: 40px; border: 3px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.dashboard { padding: 2.5rem 1.5rem; display: flex; flex-direction: column; gap: 2.5rem; }
.welcome { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.welcome h1 { font-size: 1.75rem; font-weight: 800; }
.welcome p { color: var(--color-text-muted); margin-top: .25rem; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.stat-card { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: .25rem; box-shadow: var(--shadow-sm); }
.stat-card__value { font-size: 2rem; font-weight: 800; color: var(--color-primary); }
.stat-card__label { font-size: .8125rem; color: var(--color-text-muted); }
.section__head { display: flex; align-items: center; gap: .75rem; margin-bottom: 1.25rem; }
.section__head h2 { font-size: 1.25rem; font-weight: 700; }
.course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 4rem 2rem; text-align: center; background: var(--color-bg-alt); border-radius: var(--radius-xl); border: 2px dashed var(--color-border); }
.empty-state__icon { font-size: 3.5rem; }
.empty-state h2 { font-size: 1.25rem; font-weight: 700; }
.empty-state p { color: var(--color-text-muted); max-width: 360px; }
.completed-list { display: flex; flex-direction: column; gap: .875rem; }
.completed-item { display: grid; grid-template-columns: 1fr 200px auto; align-items: center; gap: 1rem; padding: 1rem 1.25rem; background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.completed-item__title { font-weight: 600; font-size: .9375rem; }
.completed-item__date { font-size: .8125rem; color: var(--color-text-muted); margin-top: .2rem; }
@media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .completed-item { grid-template-columns: 1fr; } }
</style>

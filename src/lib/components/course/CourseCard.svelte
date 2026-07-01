<script lang="ts">
	import type { Course, CourseWithProgress } from '$lib/types';
	import Badge from '$lib/components/ui/Badge.svelte';
	import StarRating from '$lib/components/ui/StarRating.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';

	export let course: Course | CourseWithProgress;
	export let showProgress = false;

	$: withProgress = course as CourseWithProgress;
	$: enrollment = (course as CourseWithProgress).enrollment;
	$: isUnlocked = (course as CourseWithProgress).isUnlocked ?? course.isFree;

	function formatDuration(minutes: number) {
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		return h > 0 ? `${h}h ${m}m` : `${m}m`;
	}

	const levelColors: Record<string, 'info' | 'warning' | 'danger'> = {
		beginner: 'info',
		intermediate: 'warning',
		advanced: 'danger'
	};
</script>

<a href="/courses/{course.slug}" class="card">
	<div class="card__thumb">
		<img src={course.thumbnail} alt={course.title} loading="lazy" />
		{#if course.isFree}
			<span class="card__free-tag">Free</span>
		{/if}
		{#if isUnlocked && !course.isFree}
			<span class="card__unlock-tag">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 11V7a5 5 0 00-10 0v4H5a1 1 0 00-1 1v9a1 1 0 001 1h14a1 1 0 001-1v-9a1 1 0 00-1-1h-2zm-5 6a2 2 0 110-4 2 2 0 010 4zm3-6H9V7a3 3 0 016 0v4z" /></svg>
				Enrolled
			</span>
		{/if}
	</div>

	<div class="card__body">
		<div class="card__meta">
			<Badge variant={levelColors[course.level] ?? 'neutral'}>{course.level}</Badge>
			<span class="card__category">{course.category.name}</span>
		</div>
		<h3 class="card__title">{course.title}</h3>
		<p class="card__desc">{course.shortDescription}</p>

		<div class="card__instructor">
			{#if course.instructor.avatar}
				<img src={course.instructor.avatar} alt={course.instructor.name} class="instructor-avatar" />
			{/if}
			<span>{course.instructor.name}</span>
		</div>

		<div class="card__stats">
			<StarRating rating={course.rating} count={course.ratingCount} />
			<span class="card__stat">{course.enrollmentCount.toLocaleString()} students</span>
			<span class="card__stat">{formatDuration(course.duration)}</span>
		</div>

		{#if showProgress && enrollment}
			<div class="card__progress">
				<ProgressBar value={enrollment.progressPercent} size="sm" showLabel={true} label="Progress" />
			</div>
		{/if}

		<div class="card__footer">
			{#if course.isFree}
				<span class="card__price card__price--free">Free</span>
			{:else}
				<span class="card__price">${course.price.toFixed(2)}</span>
			{/if}
			<span class="card__lessons">{course.lessonCount} lessons</span>
		</div>
	</div>
</a>

<style>
.card {
	display: flex;
	flex-direction: column;
	background: var(--color-bg-card);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	overflow: hidden;
	transition: box-shadow var(--transition), transform var(--transition);
	text-decoration: none;
	color: inherit;
}
.card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

.card__thumb {
	position: relative;
	aspect-ratio: 16/9;
	overflow: hidden;
	background: var(--color-bg-alt);
}
.card__thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s ease; }
.card:hover .card__thumb img { transform: scale(1.04); }

.card__free-tag, .card__unlock-tag {
	position: absolute;
	top: .625rem; left: .625rem;
	font-size: .6875rem;
	font-weight: 700;
	padding: .2rem .6rem;
	border-radius: var(--radius-full);
	display: flex;
	align-items: center;
	gap: .25rem;
}
.card__free-tag { background: var(--color-success); color: #fff; }
.card__unlock-tag { background: var(--color-primary); color: #fff; }

.card__body { padding: 1rem 1.125rem 1.125rem; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
.card__meta { display: flex; align-items: center; gap: .5rem; }
.card__category { font-size: .75rem; color: var(--color-text-muted); }

.card__title {
	font-size: 1rem;
	font-weight: 700;
	line-height: 1.4;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.card__desc {
	font-size: .8125rem;
	color: var(--color-text-muted);
	line-height: 1.5;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.card__instructor {
	display: flex;
	align-items: center;
	gap: .4rem;
	font-size: .8125rem;
	color: var(--color-text-muted);
}
.instructor-avatar { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; }
.card__stats { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
.card__stat { font-size: .75rem; color: var(--color-text-muted); }
.card__progress { margin-top: .25rem; }
.card__footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: auto;
	padding-top: .5rem;
	border-top: 1px solid var(--color-border);
}
.card__price { font-size: 1.1rem; font-weight: 800; color: var(--color-text); }
.card__price--free { color: var(--color-success); }
.card__lessons { font-size: .75rem; color: var(--color-text-muted); }
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isAuthenticated } from '$lib/stores/auth';
	import LessonItem from '$lib/components/course/LessonItem.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { progressApi } from '$lib/api/progress';
	import type { Lesson, Section } from '$lib/types';

	export let data: PageData;

	$: course = data.course!;
	$: sections = data.sections ?? [];
	$: enrollment = data.enrollment;
	$: currentLesson = data.currentLesson;

	onMount(() => {
		if (!$isAuthenticated) goto(`/auth/login?redirect=/courses/${data.course?.slug}/learn`);
	});

	let sidebarOpen = true;
	let marking = false;
	let completedSet: Set<string> = new Set(enrollment?.completedLessons ?? []);

	$: allLessons = sections.flatMap((s: Section) => s.lessons);
	$: currentIndex = allLessons.findIndex((l: Lesson) => l.id === currentLesson?.id);
	$: prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
	$: nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
	$: progress = enrollment?.progressPercent ?? 0;
	$: isCompleted = currentLesson ? completedSet.has(currentLesson.id) : false;

	async function markComplete() {
		if (!currentLesson || marking || isCompleted) return;
		marking = true;
		try {
			await progressApi.markLessonComplete(course.slug, currentLesson.id);
			completedSet = new Set([...completedSet, currentLesson.id]);
			const done = completedSet.size;
			const total = allLessons.length;
			progress = total > 0 ? Math.round((done / total) * 100) : 0;
			if (nextLesson) {
				goto(`/courses/${course.slug}/learn?lesson=${nextLesson.id}`);
			}
		} catch (e) {
			console.error('Failed to mark lesson complete', e);
		} finally {
			marking = false;
		}
	}
</script>

<svelte:head>
	<title>{currentLesson?.title ?? 'Learn'} — {course.title}</title>
</svelte:head>

<div class="player" class:player--sidebar={sidebarOpen}>

	<!-- Sidebar -->
	<aside class="sidebar" class:sidebar--open={sidebarOpen}>
		<div class="sidebar__head">
			<a href="/courses/{course.slug}" class="back-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
				Back to course
			</a>
			<ProgressBar value={progress} size="sm" showLabel={true} label="" />
		</div>

		<nav class="curriculum" aria-label="Course curriculum">
			{#each sections as section}
				<div class="section">
					<div class="section__title">{section.title}</div>
					{#each section.lessons as lesson}
						<LessonItem
							{lesson}
							courseSlug={course.slug}
							isUnlocked={true}
							isCompleted={completedSet.has(lesson.id)}
							isActive={lesson.id === currentLesson?.id}
						/>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>

	<!-- Toggle sidebar -->
	<button
		class="sidebar-toggle"
		aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
		on:click={() => (sidebarOpen = !sidebarOpen)}
	>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			{#if sidebarOpen}
				<path d="M15 18l-6-6 6-6"/>
			{:else}
				<path d="M9 18l6-6-6-6"/>
			{/if}
		</svg>
	</button>

	<!-- Main area -->
	<div class="main">
		<div class="topbar">
			<h1 class="lesson-title">{currentLesson?.title ?? ''}</h1>
			<div class="topbar__actions">
				{#if prevLesson}
					<Button href="/courses/{course.slug}/learn?lesson={prevLesson.id}" variant="ghost" size="sm">← Prev</Button>
				{/if}
				{#if nextLesson}
					<Button href="/courses/{course.slug}/learn?lesson={nextLesson.id}" variant="ghost" size="sm">Next →</Button>
				{/if}
			</div>
		</div>

		<!-- Video / content area -->
		<div class="content-area">
			{#if currentLesson?.type === 'video' && currentLesson.videoUrl}
				<div class="video-wrap">
					<video
						src={currentLesson.videoUrl}
						controls
						class="video"
						title={currentLesson.title}
						on:ended={markComplete}
					>
						<track kind="captions" />
					</video>
				</div>
			{:else if currentLesson?.type === 'article' && currentLesson.content}
				<article class="article-content">
					{@html currentLesson.content}
				</article>
			{:else if currentLesson?.type === 'quiz'}
				<div class="placeholder-content">
					<div class="placeholder-icon">❓</div>
					<h2>Quiz: {currentLesson?.title}</h2>
					<p>Interactive quiz content will render here from the backend.</p>
					<Button on:click={markComplete} loading={marking}>Complete Quiz →</Button>
				</div>
			{:else if currentLesson?.type === 'assignment'}
				<div class="placeholder-content">
					<div class="placeholder-icon">📝</div>
					<h2>Assignment: {currentLesson?.title}</h2>
					<p>Assignment details and submission will render here.</p>
					<Button on:click={markComplete} loading={marking}>Submit Assignment →</Button>
				</div>
			{:else}
				<div class="placeholder-content">
					<div class="placeholder-icon">📚</div>
					<p>Select a lesson from the sidebar to begin.</p>
				</div>
			{/if}
		</div>

		<!-- Complete button -->
		{#if currentLesson && currentLesson.type === 'video'}
			<div class="complete-bar">
				{#if isCompleted}
					<span class="done-badge">✓ Lesson completed</span>
					{#if nextLesson}
						<Button href="/courses/{course.slug}/learn?lesson={nextLesson.id}" size="md">
							Next lesson →
						</Button>
					{:else}
						<Button href="/courses/{course.slug}" variant="secondary" size="md">
							🎉 Course complete! View certificate
						</Button>
					{/if}
				{:else}
					<Button on:click={markComplete} loading={marking} size="md">
						Mark as complete
					</Button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
:global(body) { overflow: hidden; }
.player {
	display: grid;
	grid-template-columns: 0 auto 1fr;
	height: calc(100vh - var(--header-h));
	overflow: hidden;
	transition: grid-template-columns var(--transition);
}
.player--sidebar {
	grid-template-columns: 300px auto 1fr;
}

/* Sidebar */
.sidebar {
	background: #fff;
	border-right: 1px solid var(--color-border);
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	width: 300px;
	transform: translateX(-100%);
	transition: transform var(--transition);
}
.player--sidebar .sidebar { transform: translateX(0); }

.sidebar__head {
	padding: 1rem;
	border-bottom: 1px solid var(--color-border);
	display: flex;
	flex-direction: column;
	gap: .75rem;
	position: sticky;
	top: 0;
	background: #fff;
	z-index: 1;
}
.back-link {
	display: flex;
	align-items: center;
	gap: .4rem;
	font-size: .8125rem;
	color: var(--color-text-muted);
	transition: color var(--transition);
}
.back-link:hover { color: var(--color-primary); }

.curriculum { padding: .5rem; }
.section { margin-bottom: .5rem; }
.section__title {
	font-size: .75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: .06em;
	color: var(--color-text-muted);
	padding: .625rem .875rem .375rem;
}

/* Toggle */
.sidebar-toggle {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	background: var(--color-bg-alt);
	border-right: 1px solid var(--color-border);
	border-radius: 0;
	color: var(--color-text-muted);
	transition: background var(--transition);
	flex-shrink: 0;
	align-self: stretch;
}
.sidebar-toggle:hover { background: var(--color-primary-light); color: var(--color-primary); }

/* Main */
.main {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: #0f0f10;
}
.topbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: .75rem 1.25rem;
	background: #1a1a1c;
	color: #e2e8f0;
	border-bottom: 1px solid #2d2d30;
	flex-shrink: 0;
}
.lesson-title { font-size: 1rem; font-weight: 600; }
.topbar__actions { display: flex; gap: .5rem; }
.topbar__actions :global(.btn--ghost) { color: #94a3b8; }
.topbar__actions :global(.btn--ghost:hover) { color: #fff; background: rgba(255,255,255,.08); }

.content-area { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }

.video-wrap { width: 100%; max-height: calc(100vh - var(--header-h) - 120px); background: #000; display: flex; justify-content: center; }
.video { width: 100%; max-height: 100%; object-fit: contain; }

.article-content {
	max-width: 740px;
	margin: 0 auto;
	padding: 2.5rem 1.5rem;
	color: var(--color-text);
	background: #fff;
	line-height: 1.8;
	flex: 1;
}

.placeholder-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	padding: 4rem 2rem;
	color: #94a3b8;
	text-align: center;
	flex: 1;
}
.placeholder-icon { font-size: 3.5rem; }
.placeholder-content h2 { color: #e2e8f0; font-size: 1.25rem; }
.placeholder-content p { max-width: 400px; }

.complete-bar {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
	padding: .875rem 1.25rem;
	background: #1a1a1c;
	border-top: 1px solid #2d2d30;
	flex-shrink: 0;
}
.done-badge {
	color: var(--color-success);
	font-size: .875rem;
	font-weight: 600;
}

@media (max-width: 768px) {
	:global(body) { overflow: auto; }
	.player, .player--sidebar { grid-template-columns: 0 auto 1fr; height: auto; }
	.sidebar { position: fixed; top: var(--header-h); left: 0; bottom: 0; z-index: 200; }
	.player--sidebar .sidebar { transform: translateX(0); }
	.main { height: auto; min-height: calc(100vh - var(--header-h)); }
}
</style>

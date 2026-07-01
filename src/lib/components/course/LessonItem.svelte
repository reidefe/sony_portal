<script lang="ts">
	import type { Lesson } from '$lib/types';

	export let lesson: Lesson;
	export let isCompleted = false;
	export let isActive = false;
	export let isUnlocked = false;
	export let courseSlug: string;

	const icons: Record<string, string> = {
		video: '▶',
		article: '📄',
		quiz: '❓',
		assignment: '📝'
	};

	function fmt(m: number) {
		return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
	}
</script>

{#if isUnlocked || lesson.isPreview}
	<a
		href="/courses/{courseSlug}/learn?lesson={lesson.id}"
		class="lesson lesson--unlocked"
		class:lesson--active={isActive}
		class:lesson--done={isCompleted}
	>
		<span class="lesson__icon" aria-hidden="true">
			{#if isCompleted}
				<svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-success)"><path d="M9 12.5l2.5 2.5 5-5"/><circle cx="12" cy="12" r="10" stroke="var(--color-success)" stroke-width="2" fill="none"/></svg>
			{:else if isActive}
				<span class="playing-dot" />
			{:else}
				{icons[lesson.type] ?? '▶'}
			{/if}
		</span>
		<span class="lesson__title">{lesson.title}</span>
		<span class="lesson__meta">
			{#if lesson.isPreview && !isUnlocked}<span class="preview-tag">Preview</span>{/if}
			<span>{fmt(lesson.duration)}</span>
		</span>
	</a>
{:else}
	<div class="lesson lesson--locked">
		<span class="lesson__icon" aria-hidden="true">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-text-light)"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-5h-1V9a5 5 0 00-10 0v3H6a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1v-8a1 1 0 00-1-1zM9 9a3 3 0 016 0v3H9V9z"/></svg>
		</span>
		<span class="lesson__title">{lesson.title}</span>
		<span class="lesson__meta"><span>{fmt(lesson.duration)}</span></span>
	</div>
{/if}

<style>
.lesson {
	display: flex;
	align-items: center;
	gap: .75rem;
	padding: .625rem .875rem;
	border-radius: var(--radius-sm);
	font-size: .875rem;
	transition: background var(--transition);
	text-decoration: none;
	color: inherit;
}
.lesson--unlocked:hover, .lesson--active {
	background: var(--color-primary-light);
	color: var(--color-primary);
}
.lesson--done { color: var(--color-text-muted); }
.lesson--locked { opacity: .55; cursor: not-allowed; }
.lesson__icon { flex-shrink: 0; font-size: .9rem; width: 20px; text-align: center; }
.lesson__title { flex: 1; line-height: 1.4; }
.lesson__meta { display: flex; align-items: center; gap: .4rem; font-size: .75rem; color: var(--color-text-muted); white-space: nowrap; }
.lesson--active .lesson__meta { color: var(--color-primary); }
.preview-tag {
	font-size: .65rem;
	font-weight: 700;
	background: var(--color-primary-light);
	color: var(--color-primary);
	padding: .1rem .4rem;
	border-radius: var(--radius-full);
}
.playing-dot {
	display: inline-block;
	width: 8px; height: 8px;
	background: var(--color-primary);
	border-radius: 50%;
	animation: pulse 1s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.3)} }
</style>

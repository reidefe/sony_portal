<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CourseCard from '$lib/components/course/CourseCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	export let data: PageData;

	let search = data.filters.search ?? '';
	let sort = data.filters.sort ?? 'newest';
	let level = data.filters.level ?? '';
	let isFree = data.filters.isFree ?? '';

	function applyFilters() {
		const params = new URLSearchParams($page.url.searchParams);
		if (search) params.set('search', search); else params.delete('search');
		if (sort) params.set('sort', sort); else params.delete('sort');
		if (level) params.set('level', level); else params.delete('level');
		if (isFree !== '') params.set('isFree', String(isFree)); else params.delete('isFree');
		params.delete('page');
		goto(`?${params.toString()}`);
	}

	function clearFilters() {
		search = ''; sort = 'newest'; level = ''; isFree = '';
		goto('/courses');
	}

	const sortOptions = [
		{ value: 'newest', label: 'Newest' },
		{ value: 'popular', label: 'Most popular' },
		{ value: 'rating', label: 'Highest rated' },
		{ value: 'price_asc', label: 'Price: Low to High' },
		{ value: 'price_desc', label: 'Price: High to Low' }
	];
</script>

<svelte:head>
	<title>All Courses — LearnHub</title>
</svelte:head>

<div class="catalog">
	<!-- Sidebar filters -->
	<aside class="sidebar">
		<div class="sidebar__section">
			<h3>Search</h3>
			<form on:submit|preventDefault={applyFilters}>
				<div class="search-box">
					<input
						type="search"
						bind:value={search}
						placeholder="Search courses..."
						aria-label="Search courses"
					/>
					<button type="submit" aria-label="Search">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
					</button>
				</div>
			</form>
		</div>

		<div class="sidebar__section">
			<h3>Level</h3>
			<label class="radio-opt">
				<input type="radio" bind:group={level} value="" on:change={applyFilters} />
				All levels
			</label>
			{#each ['beginner', 'intermediate', 'advanced'] as l}
				<label class="radio-opt">
					<input type="radio" bind:group={level} value={l} on:change={applyFilters} />
					{l.charAt(0).toUpperCase() + l.slice(1)}
				</label>
			{/each}
		</div>

		<div class="sidebar__section">
			<h3>Price</h3>
			<label class="radio-opt">
				<input type="radio" bind:group={isFree} value="" on:change={applyFilters} />
				All
			</label>
			<label class="radio-opt">
				<input type="radio" bind:group={isFree} value={true} on:change={applyFilters} />
				Free
			</label>
			<label class="radio-opt">
				<input type="radio" bind:group={isFree} value={false} on:change={applyFilters} />
				Paid
			</label>
		</div>

		{#if data.categories?.length}
		<div class="sidebar__section">
			<h3>Category</h3>
			{#each data.categories as cat}
				<a
					href="?category={cat.slug}"
					class="cat-link"
					class:cat-link--active={data.filters.category === cat.slug}
				>
					{#if cat.icon}<span aria-hidden="true">{cat.icon}</span>{/if}
					{cat.name}
				</a>
			{/each}
		</div>
		{/if}

		<button class="clear-btn" on:click={clearFilters}>Clear all filters</button>
	</aside>

	<!-- Main content -->
	<div class="main">
		<div class="main__head">
			<p class="result-count">
				{#if data.courses.total > 0}
					{data.courses.total.toLocaleString()} courses found
				{:else}
					No courses found
				{/if}
			</p>
			<div class="sort-row">
				<label for="sort" class="sort-label">Sort by</label>
				<select id="sort" bind:value={sort} on:change={applyFilters} class="sort-select">
					{#each sortOptions as opt}
						<option value={opt.value}>{opt.label}</option>
					{/each}
				</select>
			</div>
		</div>

		{#if data.courses.data.length}
			<div class="course-grid">
				{#each data.courses.data as course}
					<CourseCard {course} />
				{/each}
			</div>

			<!-- Pagination -->
			{#if data.courses.totalPages > 1}
				<div class="pagination">
					{#if data.courses.page > 1}
						<Button href="?page={data.courses.page - 1}" variant="outline" size="sm">← Prev</Button>
					{/if}
					<span class="page-info">Page {data.courses.page} of {data.courses.totalPages}</span>
					{#if data.courses.page < data.courses.totalPages}
						<Button href="?page={data.courses.page + 1}" variant="outline" size="sm">Next →</Button>
					{/if}
				</div>
			{/if}
		{:else}
			<div class="empty">
				<div class="empty__icon" aria-hidden="true">🔍</div>
				<h3>No courses found</h3>
				<p>Try adjusting your filters or search term.</p>
				<Button on:click={clearFilters} variant="secondary">Clear filters</Button>
			</div>
		{/if}
	</div>
</div>

<style>
.catalog {
	display: grid;
	grid-template-columns: 260px 1fr;
	gap: 2rem;
	max-width: 1200px;
	margin: 0 auto;
	padding: 2.5rem 1.5rem;
}

/* Sidebar */
.sidebar {
	position: sticky;
	top: calc(var(--header-h) + 1rem);
	height: fit-content;
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	padding: 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
}
.sidebar__section h3 { font-size: .8125rem; text-transform: uppercase; letter-spacing: .06em; color: var(--color-text-muted); margin-bottom: .625rem; }
.search-box { position: relative; }
.search-box input {
	width: 100%;
	padding: .5rem 2.25rem .5rem .75rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	font-size: .875rem;
	background: var(--color-bg-alt);
	outline: none;
	transition: border-color var(--transition);
}
.search-box input:focus { border-color: var(--color-primary); }
.search-box button { position: absolute; right: .625rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); }

.radio-opt {
	display: flex;
	align-items: center;
	gap: .5rem;
	font-size: .875rem;
	cursor: pointer;
	padding: .25rem 0;
	color: var(--color-text-muted);
}
.radio-opt input { accent-color: var(--color-primary); }
.cat-link {
	display: flex;
	align-items: center;
	gap: .4rem;
	font-size: .875rem;
	padding: .3rem .5rem;
	border-radius: var(--radius-sm);
	color: var(--color-text-muted);
	transition: all var(--transition);
}
.cat-link:hover, .cat-link--active {
	background: var(--color-primary-light);
	color: var(--color-primary);
}
.clear-btn {
	font-size: .8125rem;
	color: var(--color-danger);
	text-align: left;
	padding: .25rem 0;
}
.clear-btn:hover { text-decoration: underline; }

/* Main */
.main__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.result-count { font-size: .9rem; color: var(--color-text-muted); }
.sort-row { display: flex; align-items: center; gap: .5rem; }
.sort-label { font-size: .875rem; color: var(--color-text-muted); }
.sort-select {
	padding: .4rem .75rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	font-size: .875rem;
	background: #fff;
	cursor: pointer;
}

.course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 2.5rem; }
.page-info { font-size: .875rem; color: var(--color-text-muted); }

.empty { text-align: center; padding: 4rem 2rem; color: var(--color-text-muted); }
.empty__icon { font-size: 3rem; margin-bottom: 1rem; }
.empty h3 { font-size: 1.25rem; margin-bottom: .5rem; color: var(--color-text); }
.empty p { margin-bottom: 1.5rem; }

@media (max-width: 768px) {
	.catalog { grid-template-columns: 1fr; }
	.sidebar { position: static; }
}
</style>

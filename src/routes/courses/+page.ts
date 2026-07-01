import type { PageLoad } from './$types';
import { coursesApi } from '$lib/api/courses';
import type { CourseFilters } from '$lib/types';

export const load: PageLoad = async ({ url }) => {
	const filters: CourseFilters = {
		category: url.searchParams.get('category') ?? undefined,
		level: (url.searchParams.get('level') as CourseFilters['level']) ?? undefined,
		isFree: url.searchParams.has('isFree') ? url.searchParams.get('isFree') === 'true' : undefined,
		search: url.searchParams.get('search') ?? undefined,
		sort: (url.searchParams.get('sort') as CourseFilters['sort']) ?? 'newest',
		page: Number(url.searchParams.get('page') ?? 1),
		limit: 12
	};

	const [coursesResult, categoriesResult] = await Promise.allSettled([
		coursesApi.list(filters),
		coursesApi.getCategories()
	]);

	return {
		courses: coursesResult.status === 'fulfilled' ? coursesResult.value : { data: [], total: 0, page: 1, limit: 12, totalPages: 0 },
		categories: categoriesResult.status === 'fulfilled' ? categoriesResult.value : [],
		filters
	};
};

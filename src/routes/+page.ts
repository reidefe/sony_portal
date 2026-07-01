import type { PageLoad } from './$types';
import { coursesApi } from '$lib/api/courses';

export const load: PageLoad = async () => {
	const [featuredResult, categoriesResult] = await Promise.allSettled([
		coursesApi.getFeatured(),
		coursesApi.getCategories()
	]);

	return {
		featuredCourses: featuredResult.status === 'fulfilled' ? featuredResult.value : [],
		categories: categoriesResult.status === 'fulfilled' ? categoriesResult.value : []
	};
};

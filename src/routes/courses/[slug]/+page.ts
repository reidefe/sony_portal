import type { PageLoad } from './$types';
import { coursesApi } from '$lib/api/courses';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const [courseResult, sectionsResult] = await Promise.allSettled([
		coursesApi.getBySlug(params.slug),
		coursesApi.getSections(params.slug)
	]);

	if (courseResult.status === 'rejected') {
		throw error(404, 'Course not found');
	}

	return {
		course: courseResult.value,
		sections: sectionsResult.status === 'fulfilled' ? sectionsResult.value : []
	};
};

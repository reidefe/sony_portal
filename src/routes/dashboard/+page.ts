import type { PageLoad } from './$types';
import { coursesApi } from '$lib/api/courses';
import { progressApi } from '$lib/api/progress';

export const load: PageLoad = async () => {
	const [enrollmentsResult, myCoursesResult] = await Promise.allSettled([
		progressApi.getMyEnrollments(),
		coursesApi.listForUser({ sort: 'newest', limit: 6 })
	]);

	return {
		enrollments: enrollmentsResult.status === 'fulfilled' ? enrollmentsResult.value : [],
		myCourses: myCoursesResult.status === 'fulfilled'
			? myCoursesResult.value
			: { data: [], total: 0, page: 1, limit: 6, totalPages: 0 }
	};
};

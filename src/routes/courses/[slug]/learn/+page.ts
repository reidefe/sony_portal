import type { PageLoad } from './$types';
import { coursesApi } from '$lib/api/courses';
import { progressApi } from '$lib/api/progress';

export const load: PageLoad = async ({ params, url }) => {
	const [courseResult, sectionsResult, enrollmentResult] = await Promise.allSettled([
		coursesApi.getBySlug(params.slug),
		coursesApi.getSections(params.slug),
		progressApi.getEnrollment(params.slug)
	]);

	const course = courseResult.status === 'fulfilled' ? courseResult.value : null;
	const sections = sectionsResult.status === 'fulfilled' ? sectionsResult.value : [];
	const enrollment = enrollmentResult.status === 'fulfilled' ? enrollmentResult.value : null;

	const lessonId = url.searchParams.get('lesson');
	const allLessons = sections.flatMap(s => s.lessons);
	const currentLesson = lessonId
		? allLessons.find(l => l.id === lessonId) ?? allLessons[0]
		: (enrollment?.currentLessonId
			? allLessons.find(l => l.id === enrollment.currentLessonId)
			: null) ?? allLessons[0] ?? null;

	return { course, sections, enrollment, currentLesson };
};

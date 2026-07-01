import { api } from './client';
import type {
	Course,
	CourseFilters,
	CourseWithProgress,
	PaginatedResponse,
	Section
} from '$lib/types';

function buildQuery(filters: CourseFilters): string {
	const params = new URLSearchParams();
	if (filters.category) params.set('category', filters.category);
	if (filters.level) params.set('level', filters.level);
	if (filters.isFree !== undefined) params.set('isFree', String(filters.isFree));
	if (filters.search) params.set('search', filters.search);
	if (filters.sort) params.set('sort', filters.sort);
	if (filters.page) params.set('page', String(filters.page));
	if (filters.limit) params.set('limit', String(filters.limit));
	const qs = params.toString();
	return qs ? `?${qs}` : '';
}

export const coursesApi = {
	list: (filters: CourseFilters = {}) =>
		api.get<PaginatedResponse<Course>>(`/courses${buildQuery(filters)}`),

	listForUser: (filters: CourseFilters = {}) =>
		api.get<PaginatedResponse<CourseWithProgress>>(`/courses/me${buildQuery(filters)}`),

	getBySlug: (slug: string) =>
		api.get<Course>(`/courses/${slug}`),

	getBySlugForUser: (slug: string) =>
		api.get<CourseWithProgress>(`/courses/${slug}/me`),

	getSections: (slug: string) =>
		api.get<Section[]>(`/courses/${slug}/sections`),

	getFeatured: () =>
		api.get<Course[]>('/courses/featured'),

	getCategories: () =>
		api.get<{ id: string; name: string; slug: string; icon?: string }[]>('/categories'),

	enroll: (courseId: string) =>
		api.post<{ enrollmentId: string }>('/enrollments', { courseId }),

	unenroll: (courseId: string) =>
		api.delete<void>(`/enrollments/${courseId}`)
};

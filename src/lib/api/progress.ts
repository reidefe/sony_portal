import { api } from './client';
import type { Enrollment, LessonProgress } from '$lib/types';

export const progressApi = {
	getEnrollment: (courseId: string) =>
		api.get<Enrollment>(`/enrollments/${courseId}`),

	getMyEnrollments: () =>
		api.get<Enrollment[]>('/enrollments'),

	markLessonComplete: (courseId: string, lessonId: string) =>
		api.post<LessonProgress>(`/enrollments/${courseId}/lessons/${lessonId}/complete`, {}),

	updateWatchProgress: (courseId: string, lessonId: string, watchedSeconds: number) =>
		api.patch<LessonProgress>(`/enrollments/${courseId}/lessons/${lessonId}/progress`, {
			watchedSeconds
		}),

	setCurrentLesson: (courseId: string, lessonId: string) =>
		api.patch<void>(`/enrollments/${courseId}/current-lesson`, { lessonId }),

	getCertificate: (courseId: string) =>
		api.get<{ url: string; issuedAt: string }>(`/enrollments/${courseId}/certificate`)
};

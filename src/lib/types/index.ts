// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: 'student' | 'instructor' | 'admin';
	createdAt: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresAt: number;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface SignupPayload {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	tokens: AuthTokens;
}

// ─── Courses ─────────────────────────────────────────────────────────────────

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus = 'draft' | 'published' | 'archived';

export interface Category {
	id: string;
	name: string;
	slug: string;
	icon?: string;
}

export interface Instructor {
	id: string;
	name: string;
	avatar?: string;
	bio?: string;
	title?: string;
}

export interface Course {
	id: string;
	slug: string;
	title: string;
	description: string;
	shortDescription: string;
	thumbnail: string;
	previewVideoUrl?: string;
	instructor: Instructor;
	category: Category;
	level: CourseLevel;
	status: CourseStatus;
	price: number;
	isFree: boolean;
	duration: number;       // total minutes
	lessonCount: number;
	enrollmentCount: number;
	rating: number;
	ratingCount: number;
	tags: string[];
	whatYouLearn: string[];
	requirements: string[];
	createdAt: string;
	updatedAt: string;
}

// ─── Lessons ─────────────────────────────────────────────────────────────────

export type LessonType = 'video' | 'article' | 'quiz' | 'assignment';

export interface Lesson {
	id: string;
	sectionId: string;
	title: string;
	type: LessonType;
	duration: number;       // minutes
	isPreview: boolean;     // accessible without enrollment
	order: number;
	videoUrl?: string;
	content?: string;
}

export interface Section {
	id: string;
	courseId: string;
	title: string;
	order: number;
	lessons: Lesson[];
}

// ─── Progress ────────────────────────────────────────────────────────────────

export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface LessonProgress {
	lessonId: string;
	completed: boolean;
	watchedSeconds?: number;
	completedAt?: string;
}

export interface Enrollment {
	id: string;
	courseId: string;
	userId: string;
	status: EnrollmentStatus;
	progressPercent: number;
	completedLessons: string[];   // lesson IDs
	currentLessonId?: string;
	enrolledAt: string;
	completedAt?: string;
	certificate?: string;
}

export interface CourseWithProgress extends Course {
	enrollment?: Enrollment;
	isUnlocked: boolean;           // true when enrolled or free
	nextLessonId?: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface ApiError {
	message: string;
	code?: string;
	status: number;
}

export interface CourseFilters {
	category?: string;
	level?: CourseLevel;
	isFree?: boolean;
	search?: string;
	sort?: 'newest' | 'popular' | 'rating' | 'price_asc' | 'price_desc';
	page?: number;
	limit?: number;
}

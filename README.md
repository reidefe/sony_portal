# LearnHub Portal — Frontend

SvelteKit frontend for the LearnHub educational platform. Fully client-side rendered; all data comes from a REST backend.

## Setup

```sh
npm install
cp .env.example .env          # set VITE_API_BASE_URL
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` to your backend base path (no trailing slash):

```
VITE_API_BASE_URL=http://localhost:3000/api
```

---

# Backend API Contract

Every request that requires authentication must include:

```
Authorization: Bearer <accessToken>
```

All request and response bodies are `application/json` unless noted.  
Dates are ISO 8601 strings (`"2024-03-15T10:30:00.000Z"`).  
Durations are **integer minutes**.

---

## Global error shape

All error responses use this structure:

```json
{
  "message": "Human-readable description",
  "code": "MACHINE_READABLE_CODE",
  "status": 401
}
```

`code` is optional but recommended for client-side branching (e.g. `"INVALID_CREDENTIALS"`, `"EMAIL_TAKEN"`).

---

## Table of contents

1. [Auth](#1-auth)
2. [Users](#2-users)
3. [Courses](#3-courses)
4. [Categories](#4-categories)
5. [Enrollments & Progress](#5-enrollments--progress)

---

## 1. Auth

### POST `/auth/signup`

Create a new user account.

**Request body**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "mypassword123"
}
```

| Field      | Type   | Required | Notes                        |
|------------|--------|----------|------------------------------|
| `name`     | string | yes      | Full display name            |
| `email`    | string | yes      | Must be unique               |
| `password` | string | yes      | Minimum 8 characters         |

**Response `201`**

```json
{
  "user": {
    "id": "usr_01",
    "email": "jane@example.com",
    "name": "Jane Smith",
    "avatar": null,
    "role": "student",
    "createdAt": "2024-03-15T10:00:00.000Z"
  },
  "tokens": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "dGhpcyBp...",
    "expiresAt": 1710500000000
  }
}
```

`expiresAt` is a Unix timestamp **in milliseconds**.

---

### POST `/auth/login`

Authenticate an existing user.

**Request body**

```json
{
  "email": "jane@example.com",
  "password": "mypassword123"
}
```

| Field      | Type   | Required |
|------------|--------|----------|
| `email`    | string | yes      |
| `password` | string | yes      |

**Response `200`** — same shape as signup `201`.

**Error `401`** — wrong credentials.

---

### POST `/auth/logout`

Invalidate the current refresh token server-side.

**Auth:** required  
**Request body:** `{}` (empty)  
**Response `204`** — no body.

---

### POST `/auth/refresh`

Exchange a refresh token for a new token pair.

**Request body**

```json
{
  "refreshToken": "dGhpcyBp..."
}
```

**Response `200`** — same shape as signup `201` (new tokens + updated user snapshot).

**Error `401`** — token expired or not found.

---

### GET `/auth/me`

Return the authenticated user's profile.

**Auth:** required  
**Response `200`**

```json
{
  "id": "usr_01",
  "email": "jane@example.com",
  "name": "Jane Smith",
  "avatar": "https://cdn.example.com/avatars/usr_01.jpg",
  "role": "student",
  "createdAt": "2024-03-15T10:00:00.000Z"
}
```

---

### POST `/auth/forgot-password`

Send a password-reset email.

**Request body**

```json
{
  "email": "jane@example.com"
}
```

**Response `204`** — always returns 204, even if the email is not found (prevents enumeration).

---

### POST `/auth/reset-password`

Set a new password using the token from the reset email.

**Request body**

```json
{
  "token": "abc123resettoken",
  "password": "newpassword456"
}
```

| Field      | Type   | Required | Notes                        |
|------------|--------|----------|------------------------------|
| `token`    | string | yes      | From the reset email link    |
| `password` | string | yes      | Minimum 8 characters         |

**Response `204`** — no body.  
**Error `400`** — token expired or invalid.

---

### POST `/auth/verify-email`

Confirm a user's email address.

**Request body**

```json
{
  "token": "emailverifytoken123"
}
```

**Response `204`** — no body.  
**Error `400`** — token invalid or already used.

---

## 2. Users

All routes require authentication.

### GET `/users/me`

Returns the full profile of the authenticated user.

**Response `200`** — same shape as `GET /auth/me`.

---

### PATCH `/users/me`

Update profile fields. All fields are optional; only send what changed.

**Request body**

```json
{
  "name": "Jane A. Smith",
  "bio": "Frontend developer & lifelong learner.",
  "avatar": "https://cdn.example.com/avatars/usr_01.jpg"
}
```

| Field    | Type   | Required | Notes                              |
|----------|--------|----------|------------------------------------|
| `name`   | string | no       |                                    |
| `bio`    | string | no       |                                    |
| `avatar` | string | no       | URL — use upload endpoint instead  |

**Response `200`** — updated `User` object.

---

### POST `/users/me/avatar`

Upload a profile picture. Sent as `multipart/form-data`.

**Content-Type:** `multipart/form-data`  
**Form field:** `avatar` — the image file (`image/jpeg`, `image/png`, `image/webp`, max 5 MB recommended).

**Response `200`**

```json
{
  "url": "https://cdn.example.com/avatars/usr_01.jpg"
}
```

---

### POST `/users/me/change-password`

Change the authenticated user's password.

**Request body**

```json
{
  "currentPassword": "mypassword123",
  "newPassword": "newpassword456"
}
```

| Field             | Type   | Required | Notes                |
|-------------------|--------|----------|----------------------|
| `currentPassword` | string | yes      | Must match current   |
| `newPassword`     | string | yes      | Minimum 8 characters |

**Response `204`** — no body.  
**Error `400`** — `currentPassword` incorrect.

---

### DELETE `/users/me`

Permanently delete the authenticated user's account and all data.

**Response `204`** — no body.

---

## 3. Courses

Public endpoints (`GET /courses`, `GET /courses/:slug`) do **not** require auth.  
The `/me` variants require auth and include the user's enrollment + unlock state.

---

### GET `/courses`

Paginated public course catalog.

**Query parameters**

| Param      | Type    | Default   | Notes                                                      |
|------------|---------|-----------|------------------------------------------------------------|
| `category` | string  |           | Category slug, e.g. `web-dev`                              |
| `level`    | string  |           | `beginner` \| `intermediate` \| `advanced`                 |
| `isFree`   | boolean |           | `true` or `false`                                          |
| `search`   | string  |           | Full-text search on title, description, tags               |
| `sort`     | string  | `newest`  | `newest` \| `popular` \| `rating` \| `price_asc` \| `price_desc` |
| `page`     | integer | `1`       |                                                            |
| `limit`    | integer | `12`      | Max recommended: `48`                                      |

**Response `200`**

```json
{
  "data": [/* Course[] */],
  "total": 87,
  "page": 1,
  "limit": 12,
  "totalPages": 8
}
```

Each `Course` object:

```json
{
  "id": "crs_01",
  "slug": "intro-to-python",
  "title": "Introduction to Python",
  "description": "Full description (HTML or markdown allowed).",
  "shortDescription": "One-sentence summary shown on cards.",
  "thumbnail": "https://cdn.example.com/courses/crs_01/thumb.jpg",
  "previewVideoUrl": "https://cdn.example.com/courses/crs_01/preview.mp4",
  "instructor": {
    "id": "usr_99",
    "name": "Dr. Ada Lovelace",
    "avatar": "https://cdn.example.com/avatars/usr_99.jpg",
    "bio": "Computer science pioneer.",
    "title": "Senior Software Engineer"
  },
  "category": {
    "id": "cat_01",
    "name": "Programming",
    "slug": "programming",
    "icon": "💻"
  },
  "level": "beginner",
  "status": "published",
  "price": 29.99,
  "isFree": false,
  "duration": 480,
  "lessonCount": 42,
  "enrollmentCount": 1204,
  "rating": 4.8,
  "ratingCount": 312,
  "tags": ["python", "programming", "beginner"],
  "whatYouLearn": [
    "Write Python scripts from scratch",
    "Understand variables, loops, and functions"
  ],
  "requirements": [
    "No prior programming experience needed",
    "A computer with internet access"
  ],
  "createdAt": "2024-01-10T00:00:00.000Z",
  "updatedAt": "2024-03-01T00:00:00.000Z"
}
```

| Field               | Type             | Notes                                            |
|---------------------|------------------|--------------------------------------------------|
| `id`                | string           | Stable UUID or prefixed ID                       |
| `slug`              | string           | URL-safe, unique, immutable                      |
| `description`       | string           | May contain HTML — frontend renders it           |
| `shortDescription`  | string           | Plain text, ~120 chars                           |
| `thumbnail`         | string           | Absolute URL, 16:9 ratio recommended             |
| `previewVideoUrl`   | string \| null   | Public (no auth) playable URL                    |
| `level`             | string           | `beginner` \| `intermediate` \| `advanced`       |
| `status`            | string           | `draft` \| `published` \| `archived`             |
| `price`             | number           | Decimal, e.g. `29.99`. `0` if free               |
| `isFree`            | boolean          | Shorthand; should match `price === 0`            |
| `duration`          | integer          | Total minutes across all lessons                 |
| `lessonCount`       | integer          |                                                  |
| `enrollmentCount`   | integer          |                                                  |
| `rating`            | number           | `0.0`–`5.0`                                      |
| `ratingCount`       | integer          |                                                  |
| `tags`              | string[]         |                                                  |
| `whatYouLearn`      | string[]         | Bullet points shown on course detail page        |
| `requirements`      | string[]         | Prerequisites shown on course detail page        |

---

### GET `/courses/featured`

Returns a curated list of featured courses (no pagination).

**Response `200`** — `Course[]` (same shape as above), typically 4–8 items.

---

### GET `/courses/me`

Authenticated version of the catalog — same query params as `GET /courses` — but each course includes the user's enrollment data and unlock state.

**Auth:** required

**Response `200`**

```json
{
  "data": [/* CourseWithProgress[] */],
  "total": 6,
  "page": 1,
  "limit": 6,
  "totalPages": 1
}
```

Each `CourseWithProgress` extends `Course` with:

```json
{
  "...all Course fields...",
  "isUnlocked": true,
  "nextLessonId": "les_07",
  "enrollment": {
    "id": "enr_01",
    "courseId": "crs_01",
    "userId": "usr_01",
    "status": "active",
    "progressPercent": 42,
    "completedLessons": ["les_01", "les_02", "les_03"],
    "currentLessonId": "les_04",
    "enrolledAt": "2024-02-01T00:00:00.000Z",
    "completedAt": null,
    "certificate": null
  }
}
```

---

### GET `/courses/:slug`

Public course detail. No enrollment data.

**Response `200`** — single `Course` object.  
**Error `404`** — course not found or not published.

---

### GET `/courses/:slug/me`

Authenticated course detail — includes enrollment and unlock state.

**Auth:** required  
**Response `200`** — single `CourseWithProgress` object.

---

### GET `/courses/:slug/sections`

Returns the full curriculum for a course (sections with nested lessons).

**Auth:** not required — lesson `videoUrl` / `content` may be omitted for locked lessons if desired.

**Response `200`**

```json
[
  {
    "id": "sec_01",
    "courseId": "crs_01",
    "title": "Getting Started",
    "order": 1,
    "lessons": [
      {
        "id": "les_01",
        "sectionId": "sec_01",
        "title": "Welcome & Course Overview",
        "type": "video",
        "duration": 5,
        "isPreview": true,
        "order": 1,
        "videoUrl": "https://cdn.example.com/lessons/les_01.mp4",
        "content": null
      },
      {
        "id": "les_02",
        "sectionId": "sec_01",
        "title": "Setting Up Your Environment",
        "type": "video",
        "duration": 12,
        "isPreview": false,
        "order": 2,
        "videoUrl": "https://cdn.example.com/lessons/les_02.mp4",
        "content": null
      }
    ]
  }
]
```

| Field        | Type            | Notes                                                       |
|--------------|-----------------|-------------------------------------------------------------|
| `type`       | string          | `video` \| `article` \| `quiz` \| `assignment`              |
| `duration`   | integer         | Minutes                                                     |
| `isPreview`  | boolean         | If `true`, unauthenticated users can view this lesson        |
| `order`      | integer         | 1-based sort order within the section                       |
| `videoUrl`   | string \| null  | Direct playable URL; omit or `null` for non-video lessons   |
| `content`    | string \| null  | HTML string for article lessons; `null` otherwise           |

---

## 4. Categories

### GET `/categories`

Returns all active categories for the filter sidebar and landing page.

**Auth:** not required

**Response `200`**

```json
[
  {
    "id": "cat_01",
    "name": "Programming",
    "slug": "programming",
    "icon": "💻"
  },
  {
    "id": "cat_02",
    "name": "Design",
    "slug": "design",
    "icon": "🎨"
  }
]
```

| Field  | Type            | Notes                                   |
|--------|-----------------|-----------------------------------------|
| `icon` | string \| null  | Emoji or icon identifier — optional     |

---

## 5. Enrollments & Progress

All routes in this section require authentication.

---

### POST `/enrollments`

Enroll the authenticated user in a course.

**Request body**

```json
{
  "courseId": "crs_01"
}
```

**Response `201`**

```json
{
  "enrollmentId": "enr_01"
}
```

**Error `409`** — user is already enrolled.  
**Error `402`** — course requires payment (payment flow not yet implemented in frontend).

---

### GET `/enrollments`

Return all enrollments for the authenticated user.

**Response `200`**

```json
[
  {
    "id": "enr_01",
    "courseId": "crs_01",
    "userId": "usr_01",
    "status": "active",
    "progressPercent": 42,
    "completedLessons": ["les_01", "les_02", "les_03"],
    "currentLessonId": "les_04",
    "enrolledAt": "2024-02-01T00:00:00.000Z",
    "completedAt": null,
    "certificate": null
  }
]
```

| Field              | Type                   | Notes                                                        |
|--------------------|------------------------|--------------------------------------------------------------|
| `status`           | string                 | `active` \| `completed` \| `cancelled`                       |
| `progressPercent`  | integer                | `0`–`100`; backend computes from `completedLessons / total`  |
| `completedLessons` | string[]               | Ordered list of completed lesson IDs                         |
| `currentLessonId`  | string \| null         | Last lesson the user was on                                  |
| `completedAt`      | string \| null         | ISO date; set when `progressPercent` reaches 100             |
| `certificate`      | string \| null         | Absolute URL to the certificate PDF/image                    |

---

### GET `/enrollments/:courseId`

Get the enrollment record for one course.

**Response `200`** — single `Enrollment` object (same shape as above).  
**Error `404`** — user is not enrolled in this course.

---

### DELETE `/enrollments/:courseId`

Unenroll from a course.

**Response `204`** — no body.  
**Error `404`** — enrollment not found.

---

### POST `/enrollments/:courseId/lessons/:lessonId/complete`

Mark a lesson as completed and update `progressPercent`.

**Auth:** required  
**Request body:** `{}` (empty)

**Response `200`**

```json
{
  "lessonId": "les_03",
  "completed": true,
  "watchedSeconds": null,
  "completedAt": "2024-03-15T11:45:00.000Z"
}
```

The backend should also recalculate and store the new `progressPercent` on the enrollment record. If all lessons are completed, set `enrollment.status = "completed"` and `completedAt`.

---

### PATCH `/enrollments/:courseId/lessons/:lessonId/progress`

Save a video watch position (called periodically while a video plays).

**Request body**

```json
{
  "watchedSeconds": 347
}
```

| Field           | Type    | Required | Notes                         |
|-----------------|---------|----------|-------------------------------|
| `watchedSeconds`| integer | yes      | Seconds watched so far        |

**Response `200`**

```json
{
  "lessonId": "les_03",
  "completed": false,
  "watchedSeconds": 347,
  "completedAt": null
}
```

---

### PATCH `/enrollments/:courseId/current-lesson`

Update which lesson the user is currently viewing (used to resume on next visit).

**Request body**

```json
{
  "lessonId": "les_05"
}
```

**Response `204`** — no body.

---

### GET `/enrollments/:courseId/certificate`

Retrieve the certificate for a completed course.

**Response `200`**

```json
{
  "url": "https://cdn.example.com/certificates/enr_01.pdf",
  "issuedAt": "2024-03-20T09:00:00.000Z"
}
```

**Error `403`** — course not yet completed.  
**Error `404`** — enrollment not found.

---

## Shared type reference

### `User`
```json
{
  "id": "usr_01",
  "email": "jane@example.com",
  "name": "Jane Smith",
  "avatar": "https://cdn.example.com/avatars/usr_01.jpg",
  "role": "student",
  "createdAt": "2024-03-15T10:00:00.000Z"
}
```
`role`: `"student"` | `"instructor"` | `"admin"`

---

### `AuthTokens`
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "dGhpcyBp...",
  "expiresAt": 1710500000000
}
```
`expiresAt` — Unix timestamp in **milliseconds**. The frontend refreshes when within 5 minutes of expiry.

---

### Progress unlock logic (frontend behaviour)

The frontend locks lesson items in the sidebar using this rule:

```
lesson is accessible if:
  lesson.isPreview === true
  OR user is enrolled in the course (enrollment exists)
```

Individual lesson ordering within a section is enforced by the `order` field — the backend does not need to block API access per-lesson; the frontend simply doesn't render navigation links to locked lessons.

If you want strict server-side enforcement, return `403` on `POST /enrollments/:courseId/lessons/:lessonId/complete` when the previous lesson has not been completed.

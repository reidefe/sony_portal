import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { sendContactEmail } from '$lib/server/mailer';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = (form.get('name') as string | null)?.trim() ?? '';
		const email = (form.get('email') as string | null)?.trim() ?? '';
		const subject = (form.get('subject') as string | null)?.trim() ?? '';
		const message = (form.get('message') as string | null)?.trim() ?? '';

		if (!name || !email || !subject || !message) {
			return fail(400, { error: 'All fields are required.', values: { name, email, subject, message } });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', values: { name, email, subject, message } });
		}

		// Send via Resend
		try {
			await sendContactEmail({ name, email, subject, message });
		} catch (err) {
			console.error('Resend error:', err);
			return fail(500, { error: 'Failed to send your message. Please try again later.', values: { name, email, subject, message } });
		}

		// Mirror to backend API (best-effort — don't fail the form if the API is down)
		const apiBase = env.API_BASE_URL ?? env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';
		try {
			await fetch(`${apiBase}/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, subject, message })
			});
		} catch (err) {
			console.warn('Backend contact API error (non-fatal):', err);
		}

		return { success: true };
	}
} satisfies Actions;

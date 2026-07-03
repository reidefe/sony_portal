import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { sendSupportEmail } from '$lib/server/mailer';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = (form.get('name') as string | null)?.trim() ?? '';
		const email = (form.get('email') as string | null)?.trim() ?? '';
		const category = (form.get('category') as string | null)?.trim() ?? '';
		const message = (form.get('message') as string | null)?.trim() ?? '';

		if (!name || !email || !category || !message) {
			return fail(400, { error: 'All fields are required.', values: { name, email, category, message } });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', values: { name, email, category, message } });
		}

		// Send via Resend (subject line: "Support: <category>")
		try {
			await sendSupportEmail({ name, email, category, message });
		} catch (err) {
			console.error('Resend support error:', err);
			return fail(500, { error: 'Failed to submit your request. Please try again later.', values: { name, email, category, message } });
		}

		// Mirror to backend support API (best-effort)
		const apiBase = env.API_BASE_URL ?? env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';
		try {
			await fetch(`${apiBase}/support`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, category, message })
			});
		} catch (err) {
			console.warn('Backend support API error (non-fatal):', err);
		}

		return { success: true };
	}
} satisfies Actions;

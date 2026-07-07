import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

let resend: Resend | null = null;

function getResend(): Resend {
	if (!resend) resend = new Resend(env.RESEND_API_KEY);
	return resend;
}

const FROM = env.RESEND_FROM ?? 'S&L IT Services <no-reply@slitservices.com>';

export async function sendContactEmail(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}) {
	const to = env.CONTACT_TO_EMAIL ?? 'contact@slitservices.com';
	return getResend().emails.send({
		from: FROM,
		to: [to],
		replyTo: data.email,
		subject: `[Contact] ${data.subject}`,
		html: `
			<h2>New Contact Form Submission</h2>
			<p><strong>Name:</strong> ${escHtml(data.name)}</p>
			<p><strong>Email:</strong> ${escHtml(data.email)}</p>
			<p><strong>Subject:</strong> ${escHtml(data.subject)}</p>
			<hr />
			<p><strong>Message:</strong></p>
			<p>${escHtml(data.message).replace(/\n/g, '<br>')}</p>
		`
	});
}

export async function sendSupportEmail(data: {
	name: string;
	email: string;
	category: string;
	message: string;
}) {
	const to = env.SUPPORT_TO_EMAIL ?? env.CONTACT_TO_EMAIL ?? 'support@slitservices.com';
	return getResend().emails.send({
		from: FROM,
		to: [to],
		replyTo: data.email,
		subject: `Support: ${data.category}`,
		html: `
			<h2>Support Request</h2>
			<p><strong>Name:</strong> ${escHtml(data.name)}</p>
			<p><strong>Email:</strong> ${escHtml(data.email)}</p>
			<p><strong>Category:</strong> ${escHtml(data.category)}</p>
			<hr />
			<p><strong>Message:</strong></p>
			<p>${escHtml(data.message).replace(/\n/g, '<br>')}</p>
		`
	});
}

function escHtml(str: string): string {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

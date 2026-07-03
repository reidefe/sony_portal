<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let submitting = false;

	const subjects = [
		'General enquiry',
		'Course question',
		'Technical issue',
		'Billing & payments',
		'Partnership or business',
		'Media & press',
		'Other'
	];
</script>

<svelte:head>
	<title>Contact Us — LearnHub</title>
	<meta name="description" content="Get in touch with the LearnHub team. We're here to help." />
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
<section class="page-hero">
	<div class="container page-hero__inner">
		<span class="eyebrow">Get in touch</span>
		<h1>We'd love to hear from you</h1>
		<p>Have a question, feedback, or just want to say hello? Fill in the form below and our team will get back to you within one business day.</p>
	</div>
</section>

<!-- ─── Content ───────────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container contact-grid">

		<!-- Info column -->
		<aside class="contact-info">
			<h2>Contact information</h2>
			<p class="info-intro">Our team is based in San Francisco and available Monday to Friday, 9 am – 6 pm PST.</p>

			<div class="info-cards">
				{#each contactCards as card}
					<div class="info-card">
						<div class="info-card__icon">{card.icon}</div>
						<div>
							<h3>{card.label}</h3>
							{#if card.href}
								<a href={card.href}>{card.value}</a>
							{:else}
								<p>{card.value}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<div class="social-links">
				<p class="social-label">Follow us</p>
				<div class="social-row">
					{#each socials as s}
						<a href={s.href} class="social-btn" aria-label={s.label}>{s.icon}</a>
					{/each}
				</div>
			</div>
		</aside>

		<!-- Form column -->
		<div class="contact-form-wrap">
			{#if form?.success}
				<div class="success-state">
					<div class="success-state__icon">✅</div>
					<h2>Message sent!</h2>
					<p>Thanks for reaching out. We'll get back to you within one business day.</p>
					<button class="btn btn--primary" on:click={() => window.location.reload()}>Send another message</button>
				</div>
			{:else}
				{#if form?.error}
					<div class="alert alert--error" role="alert">
						<strong>Error:</strong> {form.error}
					</div>
				{/if}

				<form
					method="POST"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update();
							submitting = false;
						};
					}}
					class="contact-form"
					novalidate
				>
					<div class="form-row">
						<div class="form-group">
							<label for="name">Full name <span class="required">*</span></label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Jane Smith"
								value={form?.values?.name ?? ''}
								required
								autocomplete="name"
							/>
						</div>
						<div class="form-group">
							<label for="email">Email address <span class="required">*</span></label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="jane@example.com"
								value={form?.values?.email ?? ''}
								required
								autocomplete="email"
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="subject">Subject <span class="required">*</span></label>
						<select id="subject" name="subject" required>
							<option value="" disabled selected={!form?.values?.subject}>Select a topic…</option>
							{#each subjects as s}
								<option value={s} selected={form?.values?.subject === s}>{s}</option>
							{/each}
						</select>
					</div>

					<div class="form-group">
						<label for="message">Message <span class="required">*</span></label>
						<textarea
							id="message"
							name="message"
							rows="6"
							placeholder="Tell us how we can help…"
							required
						>{form?.values?.message ?? ''}</textarea>
					</div>

					<button type="submit" class="btn btn--primary btn--full" disabled={submitting}>
						{submitting ? 'Sending…' : 'Send message'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<script lang="ts" context="module">
	const contactCards = [
		{ icon: '📧', label: 'Email us', value: 'hello@learnhub.com', href: 'mailto:hello@learnhub.com' },
		{ icon: '📞', label: 'Call us', value: '+1 (415) 555-0192', href: 'tel:+14155550192' },
		{ icon: '📍', label: 'Office', value: '100 Market Street, Suite 400\nSan Francisco, CA 94105', href: null },
		{ icon: '🕐', label: 'Working hours', value: 'Mon – Fri, 9 am – 6 pm PST', href: null }
	];

	const socials = [
		{ icon: '𝕏', label: 'Twitter / X', href: '#' },
		{ icon: '🔗', label: 'LinkedIn', href: '#' },
		{ icon: '▶', label: 'YouTube', href: '#' },
		{ icon: '📸', label: 'Instagram', href: '#' }
	];
</script>

<style>
/* Hero */
.page-hero {
	background: linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%);
	padding: 5rem 0 4rem;
	text-align: center;
}
.page-hero__inner { max-width: 640px; margin: 0 auto; }
.eyebrow {
	font-size: .8125rem; font-weight: 700;
	text-transform: uppercase; letter-spacing: .1em;
	color: var(--color-primary);
}
.page-hero h1 {
	font-size: clamp(2rem, 4vw, 2.875rem);
	font-weight: 800;
	margin: .75rem 0 1rem;
}
.page-hero p { color: var(--color-text-muted); font-size: 1.0625rem; line-height: 1.7; }

/* Section */
.section { padding: 5rem 0; }

/* Contact grid */
.contact-grid { display: grid; grid-template-columns: 340px 1fr; gap: 4rem; align-items: start; }

/* Info column */
.contact-info h2 { font-size: 1.375rem; font-weight: 700; margin-bottom: .5rem; }
.info-intro { font-size: .9375rem; color: var(--color-text-muted); margin-bottom: 2rem; line-height: 1.6; }
.info-cards { display: flex; flex-direction: column; gap: 1.25rem; }
.info-card { display: flex; gap: 1rem; align-items: flex-start; }
.info-card__icon {
	font-size: 1.25rem;
	width: 44px; height: 44px;
	background: var(--color-primary-light);
	border-radius: var(--radius-md);
	display: flex; align-items: center; justify-content: center;
	flex-shrink: 0;
}
.info-card h3 { font-size: .8125rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: .05em; margin-bottom: .25rem; }
.info-card p, .info-card a { font-size: .9375rem; white-space: pre-line; }
.info-card a { color: var(--color-primary); }
.info-card a:hover { text-decoration: underline; }

.social-links { margin-top: 2.5rem; }
.social-label { font-size: .8125rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: .05em; margin-bottom: .75rem; }
.social-row { display: flex; gap: .5rem; }
.social-btn {
	width: 38px; height: 38px;
	border-radius: 50%;
	background: var(--color-bg-alt);
	border: 1px solid var(--color-border);
	display: flex; align-items: center; justify-content: center;
	font-size: .875rem;
	transition: all var(--transition);
}
.social-btn:hover { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

/* Form */
.contact-form-wrap {
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-xl);
	padding: 2.5rem;
	box-shadow: var(--shadow-sm);
}
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: .375rem; }
label { font-size: .875rem; font-weight: 600; }
.required { color: var(--color-danger); }
input, select, textarea {
	padding: .75rem 1rem;
	border: 1.5px solid var(--color-border);
	border-radius: var(--radius-md);
	font-size: .9375rem;
	font-family: inherit;
	transition: border-color var(--transition);
	background: var(--color-bg);
	width: 100%;
	color: var(--color-text);
}
input:focus, select:focus, textarea:focus {
	outline: none;
	border-color: var(--color-primary);
	box-shadow: 0 0 0 3px rgba(108,99,255,.12);
}
textarea { resize: vertical; min-height: 140px; }
select { cursor: pointer; }

/* Alert */
.alert { padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-bottom: 1rem; font-size: .9375rem; }
.alert--error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; }

/* Buttons */
.btn {
	display: inline-flex; align-items: center; justify-content: center;
	padding: .875rem 1.75rem;
	border-radius: var(--radius-full);
	font-weight: 700; font-size: 1rem;
	transition: all var(--transition);
	cursor: pointer;
	border: none;
	font-family: inherit;
}
.btn--primary { background: var(--color-primary); color: #fff; }
.btn--primary:hover:not(:disabled) { background: var(--color-primary-dark); }
.btn--primary:disabled { opacity: .65; cursor: not-allowed; }
.btn--full { width: 100%; }

/* Success */
.success-state { text-align: center; padding: 3rem 2rem; }
.success-state__icon { font-size: 3rem; margin-bottom: 1rem; }
.success-state h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: .5rem; }
.success-state p { color: var(--color-text-muted); margin-bottom: 2rem; }

@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .form-row { grid-template-columns: 1fr; } .contact-form-wrap { padding: 1.5rem; } }
</style>

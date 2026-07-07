<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let submitting = false;
	let openFaq: string | null = null;

	function toggleFaq(id: string) {
		openFaq = openFaq === id ? null : id;
	}

	const categories = [
		{ icon: '👤', label: 'Account & Profile', id: 'account' },
		{ icon: '🎓', label: 'Courses & Learning', id: 'courses' },
		{ icon: '💳', label: 'Billing & Payments', id: 'billing' },
		{ icon: '🔧', label: 'Technical Support', id: 'technical' },
		{ icon: '📜', label: 'Certificates', id: 'certificates' },
		{ icon: '🤝', label: 'Instructor Info', id: 'instructor' }
	];

	const faqs = [
		{
			id: 'a1',
			category: 'account',
			q: 'How do I create an account?',
			a: 'Click "Get started" at the top right of any page. Enter your name, email address and create a password. You\'ll receive a confirmation email — click the link to verify your account and you\'re all set.'
		},
		{
			id: 'a2',
			category: 'account',
			q: 'I forgot my password. How do I reset it?',
			a: 'Go to the Login page and click "Forgot password?". Enter your email address and we\'ll send you a secure reset link within a few minutes. Check your spam folder if you don\'t see it.'
		},
		{
			id: 'a3',
			category: 'account',
			q: 'Can I change my email address?',
			a: 'Yes. Head to Profile → Account Settings, update your email, and save. You\'ll receive a confirmation to your new address before the change takes effect.'
		},
		{
			id: 'c1',
			category: 'courses',
			q: 'Can I access course content offline?',
			a: 'Video lessons can be downloaded via our mobile app for offline viewing. Written content and quizzes require an internet connection.'
		},
		{
			id: 'c2',
			category: 'courses',
			q: 'Is there a time limit to complete a course?',
			a: 'No — all enrolled courses are available to you for life. Learn at your own pace with no deadlines or expiry dates.'
		},
		{
			id: 'c3',
			category: 'courses',
			q: 'How do lessons unlock?',
			a: 'Lessons unlock sequentially as you complete each one. This ensures you build on prior knowledge before moving forward. You can revisit any completed lesson at any time.'
		},
		{
			id: 'b1',
			category: 'billing',
			q: 'What payment methods do you accept?',
			a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. All payments are processed securely via Stripe.'
		},
		{
			id: 'b2',
			category: 'billing',
			q: 'Can I get a refund?',
			a: 'We offer a 30-day money-back guarantee on all paid courses. If you\'re not satisfied, contact us within 30 days of purchase and we\'ll issue a full refund — no questions asked.'
		},
		{
			id: 'b3',
			category: 'billing',
			q: 'Are there free courses available?',
			a: 'Yes! We offer a growing selection of free courses. Browse them at slitservices.com/courses?isFree=true.'
		},
		{
			id: 't1',
			category: 'technical',
			q: 'Videos won\'t play — what should I do?',
			a: 'Try refreshing the page, clearing your browser cache, or switching to a different browser. Ensure you have a stable internet connection (5 Mbps+ recommended for HD). If the issue persists, please contact our support team.'
		},
		{
			id: 't2',
			category: 'technical',
			q: 'Which browsers are supported?',
			a: 'S&L IT Services works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser up to date for the best experience.'
		},
		{
			id: 'cert1',
			category: 'certificates',
			q: 'How do I earn a certificate?',
			a: 'Complete all lessons in a course and pass the final assessment (if applicable). Your certificate is automatically generated and available to download and share from your dashboard.'
		},
		{
			id: 'cert2',
			category: 'certificates',
			q: 'Are S&L IT Services certificates recognised by employers?',
			a: 'Our certificates are recognised by many leading employers worldwide. You can add them directly to your LinkedIn profile or resume. Each certificate includes a unique verification code.'
		}
	];

	const supportCategories = [
		'Account & Login',
		'Course Access',
		'Billing & Refunds',
		'Technical Issue',
		'Certificate Request',
		'Content Feedback',
		'Other'
	];

	let filterCat: string | null = null;

	$: filteredFaqs = filterCat ? faqs.filter(f => f.category === filterCat) : faqs;
</script>

<svelte:head>
	<title>Help Center — S&L IT Services</title>
	<meta name="description" content="Find answers to common questions or contact our support team. We're here to help." />
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
<section class="help-hero">
	<div class="container help-hero__inner">
		<span class="eyebrow">Help Center</span>
		<h1>How can we help?</h1>
		<p>Find answers to common questions below, or reach out to our team directly.</p>
	</div>
</section>

<!-- ─── Categories ────────────────────────────────────────────────────────── -->
<section class="section section--alt">
	<div class="container">
		<h2 class="section-title text-center">Browse by topic</h2>
		<div class="cat-grid">
			{#each categories as cat}
				<button
					class="cat-card"
					class:cat-card--active={filterCat === cat.id}
					on:click={() => filterCat = filterCat === cat.id ? null : cat.id}
				>
					<span class="cat-card__icon">{cat.icon}</span>
					<span>{cat.label}</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- ─── FAQs ───────────────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container faq-container">
		<div class="faq-header">
			<h2 class="section-title">
				{filterCat ? categories.find(c => c.id === filterCat)?.label + ' FAQ' : 'Frequently asked questions'}
			</h2>
			{#if filterCat}
				<button class="clear-filter" on:click={() => filterCat = null}>Clear filter ×</button>
			{/if}
		</div>

		{#if filteredFaqs.length === 0}
			<p class="empty-faqs">No FAQs found for this category yet.</p>
		{:else}
			<div class="faq-list">
				{#each filteredFaqs as faq}
					<div class="faq-item" class:faq-item--open={openFaq === faq.id}>
						<button class="faq-question" on:click={() => toggleFaq(faq.id)} aria-expanded={openFaq === faq.id}>
							<span>{faq.q}</span>
							<span class="faq-chevron" aria-hidden="true">{openFaq === faq.id ? '▲' : '▼'}</span>
						</button>
						{#if openFaq === faq.id}
							<div class="faq-answer">
								<p>{faq.a}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- ─── Support Form ───────────────────────────────────────────────────────── -->
<section class="section section--alt" id="support">
	<div class="container support-wrap">
		<div class="support-intro">
			<span class="eyebrow">Still need help?</span>
			<h2>Contact our support team</h2>
			<p>
				Can't find the answer you're looking for? Fill out the form and our support team will
				get back to you via email, typically within 4–8 business hours.
			</p>
			<ul class="support-promises">
				<li>✅ Average first response in under 4 hours</li>
				<li>✅ Dedicated support agents, not bots</li>
				<li>✅ Available Monday – Friday, 9 am – 6 pm PST</li>
				<li>✅ All queries handled with care and confidentiality</li>
			</ul>
		</div>

		<div class="support-form-wrap">
			{#if form?.success}
				<div class="success-state">
					<div class="success-state__icon">🎉</div>
					<h2>Request received!</h2>
					<p>We've logged your support request and our team will respond to you within 4–8 business hours.</p>
					<button class="btn btn--primary" on:click={() => window.location.reload()}>Submit another request</button>
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
					class="support-form"
					novalidate
				>
					<div class="form-row">
						<div class="form-group">
							<label for="s-name">Your name <span class="required">*</span></label>
							<input
								id="s-name"
								name="name"
								type="text"
								placeholder="Jane Smith"
								value={form?.values?.name ?? ''}
								required
								autocomplete="name"
							/>
						</div>
						<div class="form-group">
							<label for="s-email">Email address <span class="required">*</span></label>
							<input
								id="s-email"
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
						<label for="s-category">Issue category <span class="required">*</span></label>
						<select id="s-category" name="category" required>
							<option value="" disabled selected={!form?.values?.category}>Select a category…</option>
							{#each supportCategories as c}
								<option value={c} selected={form?.values?.category === c}>{c}</option>
							{/each}
						</select>
					</div>

					<div class="form-group">
						<label for="s-message">Describe your issue <span class="required">*</span></label>
						<textarea
							id="s-message"
							name="message"
							rows="6"
							placeholder="Please describe your issue in as much detail as possible. Include any error messages, the browser you're using, and steps to reproduce the problem if relevant."
							required
						>{form?.values?.message ?? ''}</textarea>
					</div>

					<button type="submit" class="btn btn--primary btn--full" disabled={submitting}>
						{submitting ? 'Submitting…' : 'Submit support request'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
/* Hero */
.help-hero {
	background: linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%);
	padding: 5rem 0 4rem;
	text-align: center;
}
.help-hero__inner { max-width: 560px; margin: 0 auto; }
.eyebrow {
	font-size: .8125rem; font-weight: 700;
	text-transform: uppercase; letter-spacing: .1em;
	color: var(--color-primary);
}
.help-hero h1 { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; margin: .75rem 0 .75rem; }
.help-hero p { color: var(--color-text-muted); font-size: 1.0625rem; line-height: 1.6; }

/* Sections */
.section { padding: 5rem 0; }
.section--alt { background: var(--color-bg-alt); }
.section-title { font-size: clamp(1.375rem, 2.5vw, 1.875rem); font-weight: 800; margin-bottom: 2rem; }
.text-center { text-align: center; }

/* Categories */
.cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.cat-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: .625rem;
	padding: 1.75rem 1rem;
	background: #fff;
	border: 1.5px solid var(--color-border);
	border-radius: var(--radius-lg);
	font-size: .9375rem;
	font-weight: 600;
	font-family: inherit;
	cursor: pointer;
	transition: all var(--transition);
}
.cat-card:hover { border-color: var(--color-primary); color: var(--color-primary); box-shadow: var(--shadow-sm); }
.cat-card--active { border-color: var(--color-primary); background: var(--color-primary-light); color: var(--color-primary); }
.cat-card__icon { font-size: 1.75rem; }

/* FAQ */
.faq-container { max-width: 760px; margin: 0 auto; }
.faq-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1.5rem; }
.faq-header .section-title { margin-bottom: 0; }
.clear-filter { font-size: .875rem; color: var(--color-primary); background: none; border: none; cursor: pointer; font-family: inherit; }
.empty-faqs { color: var(--color-text-muted); text-align: center; padding: 2rem 0; }
.faq-list { display: flex; flex-direction: column; gap: .75rem; }
.faq-item {
	background: #fff;
	border: 1.5px solid var(--color-border);
	border-radius: var(--radius-md);
	overflow: hidden;
	transition: border-color var(--transition);
}
.faq-item--open { border-color: var(--color-primary); }
.faq-question {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 1.125rem 1.375rem;
	font-size: 1rem;
	font-weight: 600;
	font-family: inherit;
	background: none;
	border: none;
	cursor: pointer;
	text-align: left;
	transition: background var(--transition);
}
.faq-question:hover { background: var(--color-bg-alt); }
.faq-chevron { font-size: .75rem; color: var(--color-primary); flex-shrink: 0; }
.faq-answer { padding: 0 1.375rem 1.25rem; }
.faq-answer p { color: var(--color-text-muted); line-height: 1.7; font-size: .9375rem; }

/* Support section */
.support-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
.support-intro h2 { font-size: clamp(1.375rem, 2.5vw, 1.875rem); font-weight: 800; margin: .5rem 0 1rem; }
.support-intro p { color: var(--color-text-muted); line-height: 1.75; margin-bottom: 1.5rem; }
.support-promises { list-style: none; display: flex; flex-direction: column; gap: .625rem; }
.support-promises li { font-size: .9375rem; color: var(--color-text-muted); }

.support-form-wrap {
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-xl);
	padding: 2.5rem;
	box-shadow: var(--shadow-sm);
}
.support-form { display: flex; flex-direction: column; gap: 1.25rem; }
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
.success-state { text-align: center; padding: 2.5rem 1.5rem; }
.success-state__icon { font-size: 2.5rem; margin-bottom: 1rem; }
.success-state h2 { font-size: 1.375rem; font-weight: 700; margin-bottom: .5rem; }
.success-state p { color: var(--color-text-muted); margin-bottom: 2rem; line-height: 1.6; }

@media (max-width: 900px) {
	.support-wrap { grid-template-columns: 1fr; }
	.cat-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
	.form-row { grid-template-columns: 1fr; }
	.support-form-wrap { padding: 1.5rem; }
	.cat-grid { grid-template-columns: repeat(2, 1fr); }
	.faq-header { flex-direction: column; gap: .5rem; }
}
</style>

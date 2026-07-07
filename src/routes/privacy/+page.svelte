<svelte:head>
	<title>Privacy Policy — S&L IT Services</title>
	<meta name="description" content="S&L IT Services' privacy policy — how we collect, use, and protect your personal information." />
</svelte:head>

<section class="page-hero">
	<div class="container page-hero__inner">
		<span class="eyebrow">Legal</span>
		<h1>Privacy Policy</h1>
		<p>Last updated: <time datetime="2026-07-01">1 July 2026</time></p>
	</div>
</section>

<section class="section">
	<div class="container doc-layout">
		<!-- Sidebar TOC -->
		<nav class="doc-toc" aria-label="Table of contents">
			<p class="toc-heading">On this page</p>
			<ol class="toc-list">
				{#each tocItems as item}
					<li><a href="#{item.id}">{item.label}</a></li>
				{/each}
			</ol>
		</nav>

		<!-- Main content -->
		<article class="doc-body">
			<div class="doc-intro">
				<p>
					S&L IT Services ("we", "us", or "our") is committed to protecting your privacy. This Privacy
					Policy explains how we collect, use, disclose, and safeguard your information when you
					use our website and learning platform (collectively, the "Service"). Please read this
					policy carefully. By using our Service you agree to the practices described here.
				</p>
				<p>
					If you are located in the European Economic Area (EEA), the United Kingdom, or
					California, additional rights and disclosures apply to you — these are noted
					throughout the document.
				</p>
			</div>

			<!-- 1 -->
			<section class="doc-section" id="information-we-collect">
				<h2>1. Information we collect</h2>

				<h3>1.1 Information you provide to us</h3>
				<p>We collect information you voluntarily provide when you:</p>
				<ul>
					<li><strong>Create an account:</strong> name, email address, password (stored as a one-way hash), and optional profile photo.</li>
					<li><strong>Enrol in a course:</strong> payment information processed and stored by our payment provider (Stripe); we do not store raw card details.</li>
					<li><strong>Complete your profile:</strong> bio, job title, location, social links.</li>
					<li><strong>Contact us:</strong> messages submitted via the contact or help forms, including your name, email, and message content.</li>
					<li><strong>Participate in the community:</strong> forum posts, course reviews, peer feedback, and discussion comments.</li>
				</ul>

				<h3>1.2 Information collected automatically</h3>
				<p>When you use the Service, we automatically collect:</p>
				<ul>
					<li><strong>Usage data:</strong> pages visited, courses viewed, lessons completed, time spent, clickstream data.</li>
					<li><strong>Device & technical data:</strong> IP address, browser type and version, operating system, device identifiers, referral URL.</li>
					<li><strong>Cookies and similar technologies:</strong> see Section 5 for details.</li>
				</ul>

				<h3>1.3 Information from third parties</h3>
				<p>If you choose to sign in via Google or another OAuth provider, we receive basic profile information (name, email, profile picture) from that provider in accordance with your permissions. We do not receive your password from third-party providers.</p>
			</section>

			<!-- 2 -->
			<section class="doc-section" id="how-we-use-information">
				<h2>2. How we use your information</h2>
				<p>We use the information we collect to:</p>
				<ul>
					<li>Provide, operate, and improve the Service;</li>
					<li>Process enrolments and payments, and issue receipts and certificates;</li>
					<li>Personalise your learning experience and recommend relevant courses;</li>
					<li>Send transactional emails (e.g., purchase confirmations, password resets, certificate notifications);</li>
					<li>Send marketing communications where you have opted in (you may opt out at any time);</li>
					<li>Respond to your enquiries and provide customer support;</li>
					<li>Monitor and analyse usage trends to improve our platform;</li>
					<li>Detect, investigate, and prevent fraudulent or illegal activity;</li>
					<li>Comply with legal obligations.</li>
				</ul>
				<p><strong>Legal basis (EEA/UK users):</strong> We process your data on the basis of contractual necessity (to provide the Service you signed up for), legitimate interests (security, analytics, fraud prevention), your consent (marketing emails), and legal obligation.</p>
			</section>

			<!-- 3 -->
			<section class="doc-section" id="sharing-your-information">
				<h2>3. Sharing your information</h2>
				<p>We do not sell, rent, or trade your personal data. We may share your information with:</p>
				<ul>
					<li><strong>Service providers:</strong> third-party companies that help us operate the Service (e.g., cloud hosting, payment processing, email delivery, analytics). These providers process data only on our behalf under data processing agreements.</li>
					<li><strong>Instructors:</strong> when you enrol in a course, the instructor receives your display name and enrolment date — not your payment information or email address — unless you choose to contact them directly.</li>
					<li><strong>Business transfers:</strong> if S&L IT Services is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your data is subject to a different privacy policy.</li>
					<li><strong>Legal requirements:</strong> we may disclose your information if required by law or in response to a valid legal process.</li>
				</ul>
			</section>

			<!-- 4 -->
			<section class="doc-section" id="data-retention">
				<h2>4. Data retention</h2>
				<p>We retain your personal data for as long as your account is active or as needed to provide the Service. You may request deletion of your account at any time (see Section 7). After deletion:</p>
				<ul>
					<li>Your profile and personal data are permanently erased within 30 days;</li>
					<li>We may retain anonymised or aggregated data (which cannot identify you) for analytics purposes;</li>
					<li>We may retain certain data for up to 7 years where required by applicable law (e.g., financial records).</li>
				</ul>
			</section>

			<!-- 5 -->
			<section class="doc-section" id="cookies">
				<h2>5. Cookies and tracking technologies</h2>
				<p>We use cookies and similar technologies to:</p>
				<ul>
					<li>Keep you signed in across sessions (authentication cookies — strictly necessary);</li>
					<li>Remember your preferences (functional cookies);</li>
					<li>Understand how the platform is used (analytics cookies — e.g., via an anonymised analytics tool);</li>
					<li>Deliver relevant advertisements if you have opted in (marketing cookies).</li>
				</ul>
				<p>You can manage your cookie preferences via our cookie banner or your browser settings. Disabling strictly necessary cookies will prevent the Service from functioning correctly.</p>
				<p><strong>Do Not Track:</strong> some browsers offer a "Do Not Track" signal. We currently do not change our data collection practices in response to this signal, but we continue to monitor regulatory guidance in this area.</p>
			</section>

			<!-- 6 -->
			<section class="doc-section" id="security">
				<h2>6. Security</h2>
				<p>We implement industry-standard security measures including:</p>
				<ul>
					<li>TLS encryption for all data in transit;</li>
					<li>Encrypted storage of passwords using bcrypt;</li>
					<li>Access controls limiting employee access to personal data on a need-to-know basis;</li>
					<li>Regular security audits and penetration testing.</li>
				</ul>
				<p>No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. If you believe your account has been compromised, please contact us immediately at <a href="mailto:security@slitservices.com">security@slitservices.com</a>.</p>
			</section>

			<!-- 7 -->
			<section class="doc-section" id="your-rights">
				<h2>7. Your rights</h2>
				<p>Depending on your location, you may have the following rights regarding your personal data:</p>

				<div class="rights-grid">
					<div class="right-card">
						<h4>Access</h4>
						<p>Request a copy of the personal data we hold about you.</p>
					</div>
					<div class="right-card">
						<h4>Rectification</h4>
						<p>Ask us to correct inaccurate or incomplete data.</p>
					</div>
					<div class="right-card">
						<h4>Erasure</h4>
						<p>Request deletion of your personal data ("right to be forgotten").</p>
					</div>
					<div class="right-card">
						<h4>Portability</h4>
						<p>Receive your data in a structured, machine-readable format.</p>
					</div>
					<div class="right-card">
						<h4>Restriction</h4>
						<p>Ask us to stop processing your data under certain circumstances.</p>
					</div>
					<div class="right-card">
						<h4>Objection</h4>
						<p>Object to processing based on legitimate interests or for direct marketing.</p>
					</div>
				</div>

				<p><strong>California residents (CCPA):</strong> you have the right to know what personal information is collected, shared, or sold; the right to opt out of the sale of personal information (we do not sell personal information); and the right to non-discrimination for exercising your rights.</p>

				<p>To exercise any of these rights, contact us at <a href="mailto:privacy@slitservices.com">privacy@slitservices.com</a>. We will respond within 30 days (GDPR) or 45 days (CCPA). We may need to verify your identity before fulfilling your request.</p>
			</section>

			<!-- 8 -->
			<section class="doc-section" id="international-transfers">
				<h2>8. International data transfers</h2>
				<p>S&L IT Services is based in the United States. If you are accessing the Service from outside the US, your data may be transferred to and processed in the US or other countries that may have different data protection laws than your country of residence.</p>
				<p>For transfers from the EEA/UK to third countries, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission, or other appropriate safeguards, to ensure your data is protected to an adequate standard.</p>
			</section>

			<!-- 9 -->
			<section class="doc-section" id="childrens-privacy">
				<h2>9. Children's privacy</h2>
				<p>Our Service is not directed at children under 13 years of age (or under 16 in the EEA/UK). We do not knowingly collect personal information from children. If we learn that we have inadvertently collected personal data from a child, we will delete it promptly. If you believe a child has provided us with personal data, please contact us at <a href="mailto:privacy@slitservices.com">privacy@slitservices.com</a>.</p>
			</section>

			<!-- 10 -->
			<section class="doc-section" id="third-party-links">
				<h2>10. Third-party links</h2>
				<p>Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties and encourage you to read their privacy policies before providing any personal information.</p>
			</section>

			<!-- 11 -->
			<section class="doc-section" id="changes">
				<h2>11. Changes to this policy</h2>
				<p>We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email (if you have an account) and/or by posting a prominent notice on our website at least 14 days before the changes take effect. The "Last updated" date at the top of this page reflects when the policy was last revised. Continued use of the Service after changes take effect constitutes acceptance of the updated policy.</p>
			</section>

			<!-- 12 -->
			<section class="doc-section" id="contact">
				<h2>12. Contact us</h2>
				<p>If you have questions, concerns, or requests related to this Privacy Policy or the processing of your personal data, please contact our Data Protection Officer:</p>
				<div class="contact-block">
					<p><strong>S&L IT Services, Inc.</strong><br />
					100 Market Street, Suite 400<br />
					San Francisco, CA 94105<br />
					United States</p>
					<p>Email: <a href="mailto:privacy@slitservices.com">privacy@slitservices.com</a></p>
					<p>You also have the right to lodge a complaint with your local data protection supervisory authority if you believe we have not handled your personal data in accordance with applicable law.</p>
				</div>
			</section>
		</article>
	</div>
</section>

<script lang="ts">
	const tocItems = [
		{ id: 'information-we-collect', label: '1. Information we collect' },
		{ id: 'how-we-use-information', label: '2. How we use your information' },
		{ id: 'sharing-your-information', label: '3. Sharing your information' },
		{ id: 'data-retention', label: '4. Data retention' },
		{ id: 'cookies', label: '5. Cookies & tracking' },
		{ id: 'security', label: '6. Security' },
		{ id: 'your-rights', label: '7. Your rights' },
		{ id: 'international-transfers', label: '8. International transfers' },
		{ id: 'childrens-privacy', label: "9. Children's privacy" },
		{ id: 'third-party-links', label: '10. Third-party links' },
		{ id: 'changes', label: '11. Changes to this policy' },
		{ id: 'contact', label: '12. Contact us' }
	];
</script>

<style>
/* Hero */
.page-hero {
	background: linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%);
	padding: 4rem 0 3rem;
	text-align: center;
}
.page-hero__inner { max-width: 640px; margin: 0 auto; }
.eyebrow { font-size: .8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--color-primary); }
.page-hero h1 { font-size: clamp(1.875rem, 4vw, 2.75rem); font-weight: 800; margin: .75rem 0 .5rem; }
.page-hero p { color: var(--color-text-muted); font-size: .9375rem; }

/* Section */
.section { padding: 4rem 0 6rem; }

/* Doc layout */
.doc-layout { display: grid; grid-template-columns: 220px 1fr; gap: 4rem; align-items: start; }

/* TOC */
.doc-toc { position: sticky; top: calc(var(--header-h) + 2rem); }
.toc-heading { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--color-text-muted); margin-bottom: .75rem; }
.toc-list { list-style: none; display: flex; flex-direction: column; gap: .375rem; padding-left: 0; }
.toc-list a { font-size: .875rem; color: var(--color-text-muted); transition: color var(--transition); line-height: 1.5; }
.toc-list a:hover { color: var(--color-primary); }

/* Doc body */
.doc-intro {
	background: var(--color-bg-alt);
	border-left: 4px solid var(--color-primary);
	border-radius: 0 var(--radius-md) var(--radius-md) 0;
	padding: 1.5rem;
	margin-bottom: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: .75rem;
}
.doc-intro p { font-size: .9375rem; color: var(--color-text-muted); line-height: 1.75; }

.doc-section { margin-bottom: 3rem; }
.doc-section h2 {
	font-size: 1.375rem;
	font-weight: 800;
	margin-bottom: 1rem;
	padding-top: 1rem;
	border-top: 1px solid var(--color-border);
}
.doc-section h3 { font-size: 1rem; font-weight: 700; margin: 1.25rem 0 .5rem; }
.doc-section p { font-size: .9375rem; color: var(--color-text-muted); line-height: 1.75; margin-bottom: .75rem; }
.doc-section ul { padding-left: 1.5rem; display: flex; flex-direction: column; gap: .5rem; margin-bottom: .75rem; }
.doc-section li { font-size: .9375rem; color: var(--color-text-muted); line-height: 1.65; }
.doc-section a { color: var(--color-primary); }
.doc-section a:hover { text-decoration: underline; }

/* Rights grid */
.rights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0 1rem; }
.right-card { background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.125rem; }
.right-card h4 { font-size: .9375rem; font-weight: 700; margin-bottom: .375rem; }
.right-card p { font-size: .875rem; color: var(--color-text-muted); line-height: 1.55; margin-bottom: 0; }

/* Contact block */
.contact-block {
	background: var(--color-bg-alt);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: .75rem;
	margin-top: 1rem;
}
.contact-block p { margin-bottom: 0; }

@media (max-width: 900px) {
	.doc-layout { grid-template-columns: 1fr; }
	.doc-toc { position: static; }
	.rights-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
	.rights-grid { grid-template-columns: 1fr; }
}
</style>

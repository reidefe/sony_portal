<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container footer__inner">
		<div class="footer__brand">
			<a href="/" class="footer__logo">
				<svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
					<rect width="28" height="28" rx="8" fill="var(--color-primary)" />
					<path d="M7 9h14M7 14h9M7 19h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
				</svg>
				LearnHub
			</a>
			<p>Unlock your potential with world-class courses from expert instructors.</p>
		</div>

		<div class="footer__links">
			<div class="footer__col">
				<h4>Learn</h4>
				<a href="/courses">All Courses</a>
				<a href="/courses?isFree=true">Free Courses</a>
				<a href="/courses?level=beginner">For Beginners</a>
			</div>
			<div class="footer__col">
				<h4>Company</h4>
				<a href="/about">About Us</a>
				<a href="/careers">Careers</a>
				<a href="/blog">Blog</a>
			</div>
			<div class="footer__col">
				<h4>Support</h4>
				<a href="/help">Help Center</a>
				<a href="/contact">Contact Us</a>
				<a href="/privacy">Privacy Policy</a>
				<a href="/terms">Terms of Service</a>
			</div>
		</div>
	</div>
	<div class="footer__bottom container">
		<p>&copy; {year} LearnHub. All rights reserved.</p>
	</div>
</footer>

<style>
.footer {
	background: var(--color-text);
	color: #cbd5e1;
	padding-top: 3rem;
}
.footer__inner {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 3rem;
	padding-bottom: 2.5rem;
}
.footer__logo {
	display: inline-flex;
	align-items: center;
	gap: .5rem;
	font-weight: 800;
	font-size: 1.1rem;
	color: #fff;
	margin-bottom: .75rem;
}
.footer__brand p { font-size: .875rem; line-height: 1.7; max-width: 280px; }
.footer__links {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
}
.footer__col { display: flex; flex-direction: column; gap: .6rem; }
.footer__col h4 { color: #fff; font-size: .8125rem; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .25rem; }
.footer__col a { font-size: .875rem; transition: color var(--transition); }
.footer__col a:hover { color: #fff; }
.footer__bottom {
	border-top: 1px solid rgba(255,255,255,.1);
	padding: 1.25rem 1.5rem;
	font-size: .8125rem;
}

@media (max-width: 768px) {
	.footer__inner { grid-template-columns: 1fr; gap: 2rem; }
	.footer__links { grid-template-columns: repeat(2, 1fr); }
}
</style>

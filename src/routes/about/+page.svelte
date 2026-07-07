<svelte:head>
	<title>About Us — S&L IT Services</title>
	<meta name="description" content="Learn about S&L IT Services' mission to democratize education and the team behind the platform." />
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
<section class="about-hero">
	<div class="container about-hero__inner">
		<span class="eyebrow">Our story</span>
		<h1>Education should be a<br /><span class="gradient-text">right, not a privilege</span></h1>
		<p class="about-hero__sub">
			S&L IT Services was founded with one belief: that world-class education should be accessible to
			anyone, anywhere — regardless of their background, location, or income. Since 2019, we've
			been building a platform that puts learners first.
		</p>
	</div>
</section>

<!-- ─── Stats ─────────────────────────────────────────────────────────────── -->
<section class="stats-bar">
	<div class="container stats-bar__grid">
		{#each stats as s}
			<div class="stat">
				<span class="stat__value">{s.value}</span>
				<span class="stat__label">{s.label}</span>
			</div>
		{/each}
	</div>
</section>

<!-- ─── Mission & Vision ───────────────────────────────────────────────────── -->
<section class="section">
	<div class="container mv-grid">
		<div class="mv-card mv-card--mission">
			<div class="mv-card__icon">🎯</div>
			<h2>Our Mission</h2>
			<p>
				To democratize access to high-quality education by connecting passionate learners with
				expert instructors worldwide. We believe skill development should be affordable,
				flexible, and designed around real career outcomes.
			</p>
		</div>
		<div class="mv-card mv-card--vision">
			<div class="mv-card__icon">🌍</div>
			<h2>Our Vision</h2>
			<p>
				A world where geography, socioeconomic status, or circumstance are no longer barriers
				to learning. We're building toward a future where every individual can continuously
				grow, adapt, and thrive in a rapidly changing world.
			</p>
		</div>
	</div>
</section>

<!-- ─── Our Story ─────────────────────────────────────────────────────────── -->
<section class="section section--alt">
	<div class="container story-grid">
		<div class="story-copy">
			<span class="eyebrow">Our story</span>
			<h2>From a classroom idea to a global platform</h2>
			<p>
				S&L IT Services started in 2019 when three former educators — frustrated by the high cost and
				rigid schedule of traditional education — decided to build something different. Armed with
				laptops and a shared conviction, they launched with just 12 courses.
			</p>
			<p>
				Within two years, the community grew to over 10,000 learners. Instructors from top
				universities and leading companies joined to share their expertise. We expanded our
				catalog, added interactive quizzes, project-based learning, and issued our first
				verified certificates.
			</p>
			<p>
				Today, S&L IT Services hosts 200+ courses across technology, design, business, and the creative
				arts. Our community spans 40+ countries and our learners have gone on to land roles at
				some of the world's most respected organisations.
			</p>
		</div>
		<div class="story-timeline">
			{#each timeline as event}
				<div class="timeline-item">
					<div class="timeline-dot" />
					<div class="timeline-content">
						<span class="timeline-year">{event.year}</span>
						<p>{event.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Core Values ───────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container">
		<h2 class="section-title text-center">What we stand for</h2>
		<div class="values-grid">
			{#each values as v}
				<div class="value-card">
					<div class="value-card__icon">{v.icon}</div>
					<h3>{v.title}</h3>
					<p>{v.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Team ──────────────────────────────────────────────────────────────── -->
<section class="section section--alt">
	<div class="container">
		<span class="eyebrow text-center" style="display:block">The people behind S&L IT Services</span>
		<h2 class="section-title text-center">Meet the team</h2>
		<div class="team-grid">
			{#each team as member}
				<div class="team-card">
					<div class="team-card__avatar" style="background:{member.color}">
						{member.initials}
					</div>
					<h3>{member.name}</h3>
					<span class="team-card__role">{member.role}</span>
					<p>{member.bio}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Why S&L IT Services ──────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container">
		<h2 class="section-title text-center">Why learners choose S&L IT Services</h2>
		<div class="features-grid">
			{#each features as f}
				<div class="feature">
					<div class="feature__icon">{f.icon}</div>
					<div>
						<h3>{f.title}</h3>
						<p>{f.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Partners ──────────────────────────────────────────────────────────── -->
<section class="section section--alt">
	<div class="container">
		<p class="partners-label">Trusted by learners from</p>
		<div class="partners-row">
			{#each partners as p}
				<div class="partner-badge">{p}</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── CTA ───────────────────────────────────────────────────────────────── -->
<section class="about-cta">
	<div class="container about-cta__inner">
		<h2>Ready to start learning?</h2>
		<p>Join 50,000+ learners already building their future on S&L IT Services.</p>
		<div class="about-cta__actions">
			<a href="/auth/signup" class="btn btn--white">Create free account</a>
			<a href="/courses" class="btn btn--outline-white">Browse courses</a>
		</div>
	</div>
</section>

<script lang="ts">
	const stats = [
		{ value: '50K+', label: 'Active learners' },
		{ value: '200+', label: 'Expert courses' },
		{ value: '150+', label: 'Instructors worldwide' },
		{ value: '40+', label: 'Countries represented' }
	];

	const timeline = [
		{ year: '2019', text: 'Founded by three educators with 12 courses and a big idea.' },
		{ year: '2020', text: 'Reached 10,000 learners; launched certificate program.' },
		{ year: '2021', text: 'Expanded to 100+ courses and onboarded industry instructors.' },
		{ year: '2022', text: 'Series A funding; launched mobile-responsive platform.' },
		{ year: '2023', text: '30,000 learners; added project-based learning & peer reviews.' },
		{ year: '2024', text: '50,000+ learners across 40 countries; 200+ courses live.' }
	];

	const values = [
		{
			icon: '🎓',
			title: 'Excellence',
			desc: 'Every course on our platform meets a rigorous quality bar set by our editorial team and vetted instructors.'
		},
		{
			icon: '🌐',
			title: 'Accessibility',
			desc: 'We offer free courses, flexible payment options, and content available in multiple languages.'
		},
		{
			icon: '💡',
			title: 'Innovation',
			desc: 'We continuously invest in new learning technologies — from interactive exercises to AI-powered study tools.'
		},
		{
			icon: '🤝',
			title: 'Community',
			desc: 'Learning is better together. Our forums, peer reviews, and cohort features connect learners globally.'
		},
		{
			icon: '🛡️',
			title: 'Integrity',
			desc: 'We are transparent about how we operate, how we use your data, and how our instructors are selected.'
		},
		{
			icon: '📈',
			title: 'Growth',
			desc: 'We measure success by the career outcomes and personal growth of every learner on our platform.'
		}
	];

	const team = [
		{
			initials: 'AO',
			name: 'Amara Osei',
			role: 'Co-founder & CEO',
			bio: 'Former high school teacher turned entrepreneur. Passionate about closing the global education gap through technology.',
			color: '#6c63ff'
		},
		{
			initials: 'JP',
			name: 'James Park',
			role: 'Co-founder & CTO',
			bio: 'Ex-Google engineer with a decade of experience building scalable EdTech products. Leads all product and engineering.',
			color: '#ff6584'
		},
		{
			initials: 'NS',
			name: 'Nina Schulz',
			role: 'Co-founder & Head of Content',
			bio: 'Curriculum designer and former university lecturer. Ensures every course delivers measurable real-world skills.',
			color: '#10b981'
		},
		{
			initials: 'DM',
			name: 'David Mensah',
			role: 'Head of Design',
			bio: 'Award-winning UX designer dedicated to creating learning experiences that are intuitive, engaging, and beautiful.',
			color: '#f59e0b'
		},
		{
			initials: 'LT',
			name: 'Layla Torres',
			role: 'Head of Learner Success',
			bio: 'Leads the support team and ensures every learner has the resources they need to complete their learning journey.',
			color: '#3b82f6'
		},
		{
			initials: 'RK',
			name: 'Raj Kumar',
			role: 'Head of Partnerships',
			bio: 'Builds and nurtures relationships with instructors, enterprise clients, and educational institutions worldwide.',
			color: '#8b5cf6'
		}
	];

	const features = [
		{ icon: '🎬', title: 'HD video lessons', desc: 'Studio-quality video content, downloadable for offline viewing.' },
		{ icon: '🔄', title: 'Learn at your pace', desc: 'No deadlines, no pressure. Courses are available lifetime once enrolled.' },
		{ icon: '📜', title: 'Verified certificates', desc: 'Shareable certificates recognised by leading employers and institutions.' },
		{ icon: '💬', title: 'Expert Q&A', desc: 'Ask questions directly to instructors and get answers within 48 hours.' },
		{ icon: '📱', title: 'Mobile-first design', desc: 'Study on any device — desktop, tablet, or smartphone — with a seamless experience.' },
		{ icon: '🧩', title: 'Hands-on projects', desc: 'Apply what you learn with real-world projects and peer-reviewed assessments.' }
	];

	const partners = ['Google', 'Microsoft', 'Amazon', 'Shopify', 'Stripe', 'Figma', 'Notion', 'Atlassian'];
</script>

<style>
/* Hero */
.about-hero {
	background: linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%);
	padding: 6rem 0 5rem;
	text-align: center;
}
.about-hero__inner { max-width: 720px; margin: 0 auto; }
.about-hero h1 {
	font-size: clamp(2.25rem, 5vw, 3.5rem);
	font-weight: 800;
	line-height: 1.15;
	margin: 1rem 0 1.5rem;
}
.gradient-text {
	background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}
.about-hero__sub {
	font-size: 1.0625rem;
	color: var(--color-text-muted);
	line-height: 1.75;
	max-width: 600px;
	margin: 0 auto;
}

/* Eyebrow */
.eyebrow {
	font-size: .8125rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: .1em;
	color: var(--color-primary);
}

/* Stats bar */
.stats-bar { background: #fff; padding: 0; }
.stats-bar__grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
	padding: 2.5rem 1.5rem;
	border-bottom: 1px solid var(--color-border);
}
.stat { text-align: center; }
.stat__value { display: block; font-size: 2rem; font-weight: 800; color: var(--color-primary); }
.stat__label { font-size: .875rem; color: var(--color-text-muted); }

/* Sections */
.section { padding: 5rem 0; }
.section--alt { background: var(--color-bg-alt); }
.section-title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; margin-bottom: 3rem; }
.text-center { text-align: center; }

/* Mission / Vision */
.mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.mv-card {
	padding: 2.5rem;
	border-radius: var(--radius-lg);
	border: 1px solid var(--color-border);
	background: #fff;
}
.mv-card--mission { border-top: 4px solid var(--color-primary); }
.mv-card--vision { border-top: 4px solid var(--color-secondary); }
.mv-card__icon { font-size: 2.5rem; margin-bottom: 1rem; }
.mv-card h2 { font-size: 1.375rem; font-weight: 700; margin-bottom: 1rem; }
.mv-card p { color: var(--color-text-muted); line-height: 1.75; }

/* Story */
.story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
.story-copy { display: flex; flex-direction: column; gap: 1.25rem; }
.story-copy h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 800; margin-top: .5rem; }
.story-copy p { color: var(--color-text-muted); line-height: 1.75; }
.story-timeline { display: flex; flex-direction: column; gap: 0; padding-top: 1rem; }
.timeline-item { display: flex; gap: 1.25rem; padding-bottom: 2rem; position: relative; }
.timeline-item:not(:last-child)::before {
	content: '';
	position: absolute;
	left: 7px;
	top: 16px;
	bottom: 0;
	width: 2px;
	background: var(--color-border);
}
.timeline-dot {
	width: 16px; height: 16px;
	border-radius: 50%;
	background: var(--color-primary);
	flex-shrink: 0;
	margin-top: 2px;
}
.timeline-year { font-size: .8125rem; font-weight: 700; color: var(--color-primary); display: block; margin-bottom: .25rem; }
.timeline-content p { font-size: .9375rem; color: var(--color-text-muted); line-height: 1.6; }

/* Values */
.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.value-card {
	padding: 2rem;
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	transition: box-shadow var(--transition), transform var(--transition);
}
.value-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.value-card__icon { font-size: 2rem; margin-bottom: 1rem; }
.value-card h3 { font-size: 1.0625rem; font-weight: 700; margin-bottom: .5rem; }
.value-card p { font-size: .9375rem; color: var(--color-text-muted); line-height: 1.65; }

/* Team */
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: .5rem; }
.team-card {
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	padding: 2rem;
	text-align: center;
	transition: box-shadow var(--transition);
}
.team-card:hover { box-shadow: var(--shadow-md); }
.team-card__avatar {
	width: 72px; height: 72px;
	border-radius: 50%;
	color: #fff;
	font-size: 1.375rem;
	font-weight: 700;
	display: flex; align-items: center; justify-content: center;
	margin: 0 auto 1rem;
}
.team-card h3 { font-size: 1.0625rem; font-weight: 700; }
.team-card__role { font-size: .8125rem; color: var(--color-primary); font-weight: 600; display: block; margin: .25rem 0 .75rem; }
.team-card p { font-size: .875rem; color: var(--color-text-muted); line-height: 1.6; }

/* Features */
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.feature { display: flex; gap: 1.25rem; align-items: flex-start; }
.feature__icon { font-size: 1.75rem; flex-shrink: 0; margin-top: .1rem; }
.feature h3 { font-size: 1rem; font-weight: 700; margin-bottom: .375rem; }
.feature p { font-size: .875rem; color: var(--color-text-muted); line-height: 1.6; }

/* Partners */
.partners-label { text-align: center; font-size: .875rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 2rem; }
.partners-row { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.partner-badge {
	padding: .625rem 1.25rem;
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-full);
	font-size: .875rem;
	font-weight: 600;
	color: var(--color-text-muted);
}

/* CTA */
.about-cta {
	background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
	color: #fff;
	padding: 6rem 0;
}
.about-cta__inner { text-align: center; }
.about-cta h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: .75rem; }
.about-cta p { font-size: 1.0625rem; opacity: .85; margin-bottom: 2rem; }
.about-cta__actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn {
	display: inline-flex; align-items: center; justify-content: center;
	padding: .875rem 2rem;
	border-radius: var(--radius-full);
	font-weight: 700; font-size: 1rem;
	transition: all var(--transition);
	cursor: pointer;
}
.btn--white { background: #fff; color: var(--color-primary); }
.btn--white:hover { background: var(--color-primary-light); }
.btn--outline-white { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.5); }
.btn--outline-white:hover { background: rgba(255,255,255,.1); border-color: #fff; }

@media (max-width: 1024px) {
	.features-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
	.stats-bar__grid { grid-template-columns: repeat(2, 1fr); }
	.mv-grid { grid-template-columns: 1fr; }
	.story-grid { grid-template-columns: 1fr; gap: 3rem; }
	.values-grid { grid-template-columns: repeat(2, 1fr); }
	.team-grid { grid-template-columns: repeat(2, 1fr); }
	.features-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
	.values-grid { grid-template-columns: 1fr; }
	.team-grid { grid-template-columns: 1fr; }
}
</style>

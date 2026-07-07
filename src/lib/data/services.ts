export interface ServiceLink {
	label: string;
	href: string;
}

export interface Service {
	id: string;
	slug: string;
	icon: string;
	color: string;
	bg: string;
	gradient: string;
	label: string;
	menuDesc: string;
	tagline: string;
	desc: string;
	href: string;
	links: ServiceLink[];
	highlights: string[];
}

export const services: Service[] = [
	{
		id: 'it',
		slug: 'it',
		icon: '💻',
		color: '#6c63ff',
		bg: '#ede9ff',
		gradient: 'linear-gradient(135deg, #ede9ff 0%, #f8f7ff 100%)',
		label: 'IT & Technology',
		menuDesc: 'Software, cloud & security courses',
		tagline: 'Skills that get you hired.',
		desc: 'From web development and cloud computing to cybersecurity and AI — build the tech skills that top employers are hiring for right now.',
		href: '/services/it',
		links: [
			{ label: 'Web Development', href: '/courses?category=web-development' },
			{ label: 'Data Science & ML', href: '/courses?category=data-science' },
			{ label: 'Cybersecurity', href: '/courses?category=cybersecurity' },
			{ label: 'Cloud Computing', href: '/courses?category=cloud' },
			{ label: 'CompTIA A+ & Security+', href: '/courses?category=comptia' },
			{ label: 'Python & JavaScript', href: '/courses?category=programming' }
		],
		highlights: [
			'Web Development',
			'Data Science & ML',
			'Cybersecurity',
			'Cloud & DevOps',
			'CompTIA A+ / Security+',
			'Python & JavaScript'
		]
	},
	{
		id: 'networking',
		slug: 'networking',
		icon: '🌐',
		color: '#0ea5e9',
		bg: '#e0f2fe',
		gradient: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
		label: 'Networking',
		menuDesc: 'CCNA, CCNP & industry certs',
		tagline: 'Certified. Connected. In demand.',
		desc: 'Master Cisco, CompTIA and industry-standard networking certifications. From CCNA fundamentals to advanced CCNP and CISSP.',
		href: '/services/networking',
		links: [
			{ label: 'Cisco CCNA', href: '/courses?category=ccna' },
			{ label: 'Cisco CCNP', href: '/courses?category=ccnp' },
			{ label: 'CompTIA Network+', href: '/courses?category=network-plus' },
			{ label: 'CISSP', href: '/courses?category=cissp' },
			{ label: 'Wireless Networking', href: '/courses?category=wireless' },
			{ label: 'Network Security', href: '/courses?category=network-security' }
		],
		highlights: [
			'Cisco CCNA',
			'Cisco CCNP',
			'CompTIA Network+',
			'CISSP',
			'Wireless Networking',
			'Network Security'
		]
	},
	{
		id: 'health',
		slug: 'health',
		icon: '🏥',
		color: '#10b981',
		bg: '#d1fae5',
		gradient: 'linear-gradient(135deg, #d1fae5 0%, #f0fdf4 100%)',
		label: 'Health & Medical',
		menuDesc: 'Nursing, therapy & healthcare',
		tagline: 'Care for others. Build your career.',
		desc: 'Pursue a career in healthcare with nursing exam prep, speech therapy certification, medical coding and mental health support courses.',
		href: '/services/health',
		links: [
			{ label: 'CNA Certification Prep', href: '/courses?category=cna' },
			{ label: 'LPN / RN Exam Prep', href: '/courses?category=nursing' },
			{ label: 'Speech Therapist Cert.', href: '/courses?category=speech-therapy' },
			{ label: 'Medical Coding & Billing', href: '/courses?category=medical-coding' },
			{ label: 'Healthcare Administration', href: '/courses?category=healthcare-admin' },
			{ label: 'Mental Health Support', href: '/courses?category=mental-health' }
		],
		highlights: [
			'CNA Certification',
			'LPN / RN Exam Prep',
			'Speech Therapist Cert.',
			'Medical Coding & Billing',
			'Healthcare Admin',
			'Mental Health Support'
		]
	},
	{
		id: 'immigration',
		slug: 'immigration',
		icon: '✈️',
		color: '#f59e0b',
		bg: '#fef3c7',
		gradient: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
		label: 'Immigration',
		menuDesc: 'Visas, citizenship & language',
		tagline: 'Navigate your journey with confidence.',
		desc: 'Navigate the immigration process with confidence. Visa preparation, citizenship test prep, IELTS/TOEFL training and documentation guidance.',
		href: '/services/immigration',
		links: [
			{ label: 'US Visa Preparation', href: '/courses?category=us-visa' },
			{ label: 'Citizenship Test Prep', href: '/courses?category=citizenship' },
			{ label: 'IELTS Preparation', href: '/courses?category=ielts' },
			{ label: 'TOEFL Preparation', href: '/courses?category=toefl' },
			{ label: 'Work Permit Guidance', href: '/courses?category=work-permit' },
			{ label: 'Immigration Documentation', href: '/courses?category=immigration-docs' }
		],
		highlights: [
			'US Visa Preparation',
			'Citizenship Test Prep',
			'IELTS Preparation',
			'TOEFL Preparation',
			'Work Permit Guidance',
			'Immigration Documentation'
		]
	}
];

export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((s) => s.slug === slug);
}

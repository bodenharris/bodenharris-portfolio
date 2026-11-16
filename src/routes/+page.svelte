<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';

	let theme: Theme = 'dark';
	let formStatus = '';
	let isSubmitting = false;

	type Project = {
		name: string;
		dates?: string;
		description: string;
		technologies: string[];
		href?: string;
		linkLabel?: string;
		featured?: boolean;
	};

	const projects: Project[] = [
		{
			name: 'YourSplit',
			dates: 'Apr 2026 – Present',
			description:
				'A workout-planning website where users create, save, browse, share, and favorite training routines. Built with a three-person team; I developed the SvelteKit backend with Supabase authentication and PostgreSQL to manage user accounts and stored routines.',
			technologies: ['SvelteKit', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
			href: 'https://yoursplit.com',
			linkLabel: 'Visit live app',
			featured: true
		},
		{
			name: 'PlaylistGenerator',
			dates: 'Oct 2025',
			description:
				'A Python tool that turns Last.fm listening history into Spotify playlists: it ranks tracks by play count, matches songs through Spotify search, and creates public playlists with OAuth.',
			technologies: ['Python', 'Requests', 'Spotipy', 'OAuth']
		},
		{
			name: 'Chess Engine',
			dates: 'Jul 2025',
			description:
				'A playable C# chess engine with legal move generation, position evaluation, and minimax search with alpha-beta pruning, integrated with an interactive Unity interface.',
			technologies: ['C#', 'Unity', 'Algorithms'],
			href: 'https://github.com/bodenharris/Chess-Engine-Unity',
			linkLabel: 'View source'
		},
		{
			name: 'Assembly Interpreter',
			dates: 'Mar 2025',
			description:
				'An interpreter in C that reads external assembly programs, parses instructions, maintains register state, and executes operations, tested on Linux to emulate low-level CPU state changes.',
			technologies: ['C', 'Linux', 'Systems'],
			href: 'https://github.com/bodenharris/Assembly-Interpreter',
			linkLabel: 'View source'
		},
		{
			name: 'Independent Games',
			dates: 'Nov 2024 – Present',
			description:
				'Puzzle games designed and shipped through iterative level design, gameplay scripting, and playtesting. Delicate Logic was selected for the 2025 Confounding Calendar puzzle-game contest.',
			technologies: ['Unity', 'PuzzleScript', 'Game Design'],
			href: 'https://dollamenu.itch.io/',
			linkLabel: 'Play on itch.io'
		},
		{
			name: 'Portfolio Website',
			dates: 'Dec 2024 – Present',
			description:
				'This site: a responsive portfolio presenting my projects, experience, and skills, with source managed in Git and continuous deployment through Vercel.',
			technologies: ['SvelteKit', 'Tailwind CSS', 'Vercel'],
			href: 'https://github.com/bodenharris/bodenharris-portfolio',
			linkLabel: 'View source'
		}
	];

	type Role = { org: string; title: string; location?: string; dates?: string; points: string[] };

	const experienceGroups: { label: string; roles: Role[] }[] = [
		{
			label: 'Work experience',
			roles: [
				{
					org: 'Colorworks Construction',
					title: 'Construction Worker / Assistant Contractor',
					location: 'Belmont, MA',
					dates: 'Summers 2024 – 2026',
					points: [
						'Advanced to assistant contractor in Summer 2026, supporting residential improvement project planning and execution, managing shift schedules, and communicating deadlines to clients.',
						'Worked with a small construction team on home repairs, deck construction, power washing, and painting projects.'
					]
				},
				{
					org: 'Trinktisch',
					title: 'Line Cook / Sous Chef',
					location: 'Belmont, MA',
					dates: 'Dec 2022 – Jan 2024',
					points: [
						'Trained and onboarded new employees on kitchen procedures, food preparation standards, and line operations.',
						'Collaborated on a four-person line team to coordinate food preparation and keep service efficient in a fast-paced kitchen.'
					]
				}
			]
		},
		{
			label: 'Leadership & activities',
			roles: [
				{
					org: 'UMass Game Dev Club',
					title: 'Development Specialist',
					dates: 'Sep 2026 – Present',
					points: [
						'Support members developing games across multiple engines, helping troubleshoot technical issues and identify implementation approaches.',
						'Curate and share club member projects on GitHub and itch.io to showcase student work and grow the club’s project portfolio.'
					]
				},
				{
					org: 'UMass Men’s Rugby',
					title: 'Member',
					points: ['Compete with the university’s club rugby program in the D1-AA league.']
				}
			]
		}
	];

	const coursework = ['Data Structures', 'C Programming', 'Web Programming', 'Machine Learning', 'Data Management'];

	const skillGroups = [
		{ label: 'Languages', items: ['Python', 'C', 'C#', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'] },
		{ label: 'Frameworks & tools', items: ['Svelte', 'SvelteKit', 'Tailwind CSS', 'Supabase', 'Unity', 'Docker', 'Git', 'Linux'] }
	];

	onMount(() => {
		const current = document.documentElement.dataset.theme;
		theme = current === 'light' ? 'light' : 'dark';

		const targets = document.querySelectorAll('[data-reveal]');
		if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			targets.forEach((el) => el.classList.add('revealed'));
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
						observer.unobserve(entry.target);
					}
				}
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
		);
		targets.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('portfolio-theme', theme);
		} catch {
			/* storage unavailable */
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		isSubmitting = true;
		formStatus = '';
		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: new FormData(form),
				headers: { Accept: 'application/json' }
			});
			if (!response.ok) throw new Error('Submission failed');
			form.reset();
			formStatus = 'Thanks — your message has been sent.';
		} catch {
			formStatus = 'The message could not be sent. Please email me directly instead.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Boden Harris | Computer Science Portfolio</title>
	<meta name="description" content="Portfolio of Boden Harris, a Computer Science student at UMass Amherst building full-stack web applications, games, and systems projects." />
	<meta name="theme-color" content={theme === 'dark' ? '#080b16' : '#f5f7fb'} />
</svelte:head>

<div class="site-shell">
	<a class="skip-link" href="#main-content">Skip to content</a>

	<header class="site-header">
		<div class="header-inner">
		<a class="brand" href="#top" aria-label="Boden Harris home">
			<span class="brand-mark" aria-hidden="true">BH</span>
			<span>Boden Harris</span>
		</a>
		<nav aria-label="Primary navigation">
			<a href="#projects">Projects</a>
			<a href="#experience">Experience</a>
			<a href="#skills">Skills</a>
			<a href="#contact">Contact</a>
			<a class="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
			<button class="theme-toggle" type="button" on:click={toggleTheme} aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}>
				{#if theme === 'dark'}
					<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></svg>
				{:else}
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" /></svg>
				{/if}
			</button>
		</nav>
		</div>
	</header>

	<main id="main-content">
		<section class="hero" id="top">
			<div class="hero-copy">
				<p class="status-pill"><span class="status-dot" aria-hidden="true"></span>Open to software engineering internships</p>
				<p class="eyebrow">Computer Science · UMass Amherst</p>
				<h1>I build useful software from <span class="accent-text">interface to implementation.</span></h1>
				<p class="hero-intro">
					I’m Boden Harris, a Computer Science student interested in full-stack development,
					game systems, and the details that make software reliable and enjoyable to use.
				</p>
				<div class="hero-actions">
					<a class="button primary" href="#projects">Explore my work</a>
					<a class="button secondary" href="/resume.pdf" target="_blank" rel="noreferrer">View résumé</a>
				</div>
				<div class="hero-links" aria-label="Professional profiles">
					<a href="https://github.com/bodenharris" target="_blank" rel="noreferrer">GitHub</a>
					<a href="https://www.linkedin.com/in/boden-harris-a74897326/" target="_blank" rel="noreferrer">LinkedIn</a>
					<a href="https://dollamenu.itch.io/" target="_blank" rel="noreferrer">itch.io</a>
				</div>
			</div>

			<div class="hero-profile">
				<div class="portrait-frame"><img src="/profile.jpg" alt="Boden Harris" /></div>
				<dl class="profile-facts">
					<div><dt>Graduation</dt><dd>May 2028</dd></div>
					<div><dt>GPA</dt><dd>3.97 / 4.00</dd></div>
					<div><dt>Focus</dt><dd>Software engineering</dd></div>
				</dl>
			</div>
		</section>

		<section class="section" id="projects">
			<div class="section-heading" data-reveal>
				<div><p class="eyebrow">Selected work</p><h2>Projects</h2></div>
				<p>Products, systems, and games built to turn ideas into working experiences.</p>
			</div>
			<div class="project-grid">
				{#each projects as project, index}
					<article class:featured={project.featured} class="project-card" data-reveal style={`--delay: ${(index % 2) * 70}ms`}>
						<div class="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
						<div>
							{#if project.featured || project.dates}
								<p class="project-kicker">{[project.featured && 'Featured project', project.dates].filter(Boolean).join(' · ')}</p>
							{/if}
							<h3>{project.name}</h3>
							<p>{project.description}</p>
							<ul class="tag-list" aria-label={`${project.name} technologies`}>
								{#each project.technologies as technology}<li>{technology}</li>{/each}
							</ul>
						</div>
						{#if project.href}
							<a class="project-link" href={project.href} target="_blank" rel="noreferrer">
								{project.linkLabel}<span aria-hidden="true"> ↗</span>
							</a>
						{/if}
					</article>
				{/each}
			</div>
		</section>

		<section class="section" id="experience">
			<div class="section-heading" data-reveal>
				<div><p class="eyebrow">Beyond the code</p><h2>Experience</h2></div>
				<p>Work, leadership, and team experience that shape how I collaborate and communicate.</p>
			</div>
			<div class="experience-grid">
				{#each experienceGroups as group}
					<div class="experience-group" data-reveal>
						<h3 class="group-label">{group.label}</h3>
						<ol class="role-list">
							{#each group.roles as role}
								<li class="role">
									<div class="role-head">
										<div>
											<h4>{role.org}</h4>
											<p class="role-title">{role.title}</p>
										</div>
										{#if role.dates || role.location}
											<p class="role-meta">
												{#if role.dates}<span>{role.dates}</span>{/if}
												{#if role.location}<span>{role.location}</span>{/if}
											</p>
										{/if}
									</div>
									<ul class="role-points">
										{#each role.points as point}<li>{point}</li>{/each}
									</ul>
								</li>
							{/each}
						</ol>
					</div>
				{/each}
			</div>
		</section>

		<section class="section" id="skills">
			<div class="section-heading" data-reveal>
				<div><p class="eyebrow">Education & toolkit</p><h2>Skills</h2></div>
				<p>Technologies and coursework from my studies and independent projects.</p>
			</div>
			<div class="education-card" data-reveal>
				<div class="education-head">
					<div>
						<h3>University of Massachusetts Amherst</h3>
						<p>B.S. in Computer Science · Commonwealth Honors College</p>
					</div>
					<p class="role-meta"><span>Expected May 2028</span><span>GPA 3.97 / 4.00</span></p>
				</div>
				<p class="group-label">Relevant coursework</p>
				<ul class="tag-list" aria-label="Relevant coursework">
					{#each coursework as course}<li>{course}</li>{/each}
				</ul>
			</div>
			<div class="skill-grid">
				{#each skillGroups as group}
					<div class="skill-group" data-reveal>
						<h3>{group.label}</h3>
						<ul>{#each group.items as item}<li>{item}</li>{/each}</ul>
					</div>
				{/each}
			</div>
		</section>

		<section class="section contact-section" id="contact">
			<div class="contact-copy" data-reveal>
				<p class="eyebrow">Get in touch</p>
				<h2>Let’s talk about an opportunity or project.</h2>
				<p>The fastest way to reach me is by email. You can also use the form and I’ll respond as soon as I can.</p>
				<a class="email-link" href="mailto:blharris@umass.edu">blharris@umass.edu</a>
			</div>
			<form data-reveal on:submit={handleSubmit} action="https://formspree.io/f/mldpwzlr" method="POST">
				<label for="email">Your email</label>
				<input id="email" type="email" name="email" autocomplete="email" required />
				<label for="message">Message</label>
				<textarea id="message" name="message" rows="5" required></textarea>
				<button class="button primary" type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending…' : 'Send message'}
				</button>
				{#if formStatus}<p class="form-status" role="status">{formStatus}</p>{/if}
			</form>
		</section>
	</main>

	<footer>
		<p>© {new Date().getFullYear()} Boden Harris</p>
		<div>
			<a href="https://github.com/bodenharris" target="_blank" rel="noreferrer">GitHub</a>
			<a href="https://www.linkedin.com/in/boden-harris-a74897326/" target="_blank" rel="noreferrer">LinkedIn</a>
			<a href="https://dollamenu.itch.io/" target="_blank" rel="noreferrer">itch.io</a>
		</div>
	</footer>
</div>

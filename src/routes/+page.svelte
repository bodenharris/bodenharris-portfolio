<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';

	let theme: Theme = 'dark';
	let formStatus = '';
	let isSubmitting = false;

	const projects = [
		{
			name: 'YourSplit',
			description: 'A full-stack workout platform where users create, save, browse, share, and favorite training routines.',
			technologies: ['SvelteKit', 'TypeScript', 'Supabase', 'Tailwind CSS'],
			href: 'https://yoursplit.com',
			linkLabel: 'Visit live app',
			featured: true
		},
		{
			name: 'Chess Engine',
			description: 'A playable C# chess engine with legal move generation, position evaluation, and minimax search with alpha-beta pruning.',
			technologies: ['C#', 'Unity', 'Algorithms'],
			href: 'https://github.com/bodenharris/Chess-Engine-Unity',
			linkLabel: 'View source'
		},
		{
			name: 'Assembly Interpreter',
			description: 'An interpreter in C that parses assembly programs, maintains register state, and executes operations.',
			technologies: ['C', 'Linux', 'Systems'],
			href: 'https://github.com/bodenharris/Assembly-Interpreter',
			linkLabel: 'View source'
		},
		{
			name: 'Independent Games',
			description: 'Puzzle games shaped through iterative level design and playtesting, including Delicate Logic.',
			technologies: ['Unity', 'PuzzleScript', 'Game Design'],
			href: 'https://dollamenu.itch.io/',
			linkLabel: 'Play on itch.io'
		},
		{
			name: 'Online Multiplayer Game',
			description: 'A party game inspired by Jackbox, with real-time interactions between a host and connected players.',
			technologies: ['JavaScript', 'Multiplayer', 'Web'],
			href: 'https://github.com/bodenharris/Goonbox-game',
			linkLabel: 'View source'
		}
	];

	const skillGroups = [
		{ label: 'Languages', items: ['Python', 'C', 'C#', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'] },
		{ label: 'Frameworks & tools', items: ['Svelte', 'SvelteKit', 'Tailwind CSS', 'Supabase', 'Unity', 'Docker', 'Git', 'Linux'] }
	];

	onMount(() => {
		const storedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
		if (storedTheme === 'light' || storedTheme === 'dark') theme = storedTheme;
		else if (window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light';
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('portfolio-theme', theme);
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

<div class:light={theme === 'light'} class="site-shell">
	<a class="skip-link" href="#main-content">Skip to content</a>

	<header class="site-header">
		<a class="brand" href="#top" aria-label="Boden Harris home">
			<span class="brand-mark" aria-hidden="true">BH</span>
			<span>Boden Harris</span>
		</a>
		<nav aria-label="Primary navigation">
			<a href="#projects">Projects</a>
			<a href="#skills">Skills</a>
			<a href="#contact">Contact</a>
			<a class="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
			<button class="theme-toggle" type="button" on:click={toggleTheme} aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}>
				{theme === 'dark' ? 'Light' : 'Dark'}
			</button>
		</nav>
	</header>

	<main id="main-content">
		<section class="hero" id="top">
			<div class="hero-copy">
				<p class="eyebrow">Computer Science · UMass Amherst</p>
				<h1>I build useful software from interface to implementation.</h1>
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
			<div class="section-heading">
				<div><p class="eyebrow">Selected work</p><h2>Projects</h2></div>
				<p>Products, systems, and games built to turn ideas into working experiences.</p>
			</div>
			<div class="project-grid">
				{#each projects as project, index}
					<article class:featured={project.featured} class="project-card">
						<div class="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
						<div>
							{#if project.featured}<p class="project-kicker">Featured project</p>{/if}
							<h3>{project.name}</h3>
							<p>{project.description}</p>
							<ul class="tag-list" aria-label={`${project.name} technologies`}>
								{#each project.technologies as technology}<li>{technology}</li>{/each}
							</ul>
						</div>
						<a class="project-link" href={project.href} target="_blank" rel="noreferrer">
							{project.linkLabel}<span aria-hidden="true"> ↗</span>
						</a>
					</article>
				{/each}
			</div>
		</section>

		<section class="section" id="skills">
			<div class="section-heading">
				<div><p class="eyebrow">Technical toolkit</p><h2>Skills</h2></div>
				<p>Technologies I have used across coursework and independent projects.</p>
			</div>
			<div class="skill-grid">
				{#each skillGroups as group}
					<div class="skill-group">
						<h3>{group.label}</h3>
						<ul>{#each group.items as item}<li>{item}</li>{/each}</ul>
					</div>
				{/each}
			</div>
		</section>

		<section class="section contact-section" id="contact">
			<div class="contact-copy">
				<p class="eyebrow">Get in touch</p>
				<h2>Let’s talk about an opportunity or project.</h2>
				<p>The fastest way to reach me is by email. You can also use the form and I’ll respond as soon as I can.</p>
				<a class="email-link" href="mailto:blharris@umass.edu">blharris@umass.edu</a>
			</div>
			<form on:submit={handleSubmit} action="https://formspree.io/f/mldpwzlr" method="POST">
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

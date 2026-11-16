<script lang="ts">
	import { education, email, experience, facts, profiles, projects, skills } from '#lib/content.js';
	import { reveal } from '#lib/reveal.js';
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import ContactForm from '#lib/components/contact-form.svelte';
	import Eyebrow from '#lib/components/eyebrow.svelte';
	import Glyph from '#lib/components/glyph.svelte';
	import PageSection from '#lib/components/page-section.svelte';
	import PixelPlanet from '#lib/components/pixel-planet.svelte';
	import PixelPortrait from '#lib/components/pixel-portrait.svelte';
	import ProjectCard from '#lib/components/project-card.svelte';
	import profilePhoto from '#lib/assets/profile.jpg?enhanced';

	const chipColors = ['var(--color-link)', 'var(--color-primary)', 'var(--color-highlight)', 'var(--color-shade)'];
	const sparkles = [
		{ at: 'top-[4%] left-[6%] size-5.5 text-primary', delay: '0s' },
		{ at: 'right-[4%] bottom-[3%] size-3.5 text-link', delay: '0.5s' },
		{ at: 'bottom-[14%] left-0 size-3.5 text-highlight', delay: '1s' },
		{ at: 'top-[30%] right-[1%] size-3.5 text-foreground', delay: '1.5s' }
	];
</script>

<svelte:head>
	<title>Boden Harris | Computer Science Portfolio</title>
	<meta
		name="description"
		content="Portfolio of Boden Harris, a Computer Science student at UMass Amherst building full-stack web applications, games, and systems projects."
	/>
</svelte:head>

{#snippet meta(items: string[])}
	<p class="flex flex-col items-end gap-0.5 text-right font-mono text-[1.15rem] leading-[1.1] text-muted-foreground max-sm:items-start max-sm:text-left">
		{#each items as item (item)}<span>{item}</span>{/each}
	</p>
{/snippet}

<!-- Hero -->
<section
	id="top"
	class="grid items-center gap-14 pt-10 pb-18 sm:pt-14 md:max-h-232 md:min-h-[calc(100vh-4rem)] md:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.85fr)] md:gap-[clamp(2.5rem,7vw,6rem)] md:pt-18 md:pb-22"
>
	<div>
		<Eyebrow class="animate-rise">Computer Science · UMass Amherst</Eyebrow>
		<h1 class="sr-only">Boden Harris</h1>

		<!-- an RPG text box -->
		<div class="pixel-box relative mb-10 bg-card max-w-2xl animate-rise px-5 pt-5 pb-7 sm:px-7 sm:pt-6 sm:pb-8"
			style:animation-delay="80ms">
			<p class="text-[clamp(1.2rem,1.7vw,1.4rem)] leading-relaxed">
				I’m Boden Harris, a Computer Science student interested in full-stack development, game systems, and
				the details that make software reliable and enjoyable to use.
			</p>
			<Glyph name="caret" class="absolute right-5 bottom-3.5 h-2 w-3.5 animate-bob text-caret" />
		</div>

		<div class="flex animate-rise flex-wrap gap-5 max-sm:*:flex-auto" style:animation-delay="160ms">
			<Button href="#projects">Explore my work</Button>
			<Button href="/resume.pdf" target="_blank" rel="noreferrer" variant="secondary">View resume</Button>
		</div>

		<ul class="mt-9 flex animate-rise flex-wrap gap-6" style:animation-delay="240ms" aria-label="Professional profiles">
			{#each profiles as { label, href } (href)}
				<li>
					<a
						{href}
						target="_blank"
						rel="noreferrer"
						class="font-mono text-[1.35rem] text-muted-foreground uppercase hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_0_0.2rem_var(--color-primary)]"
					>
						{label} <span class="opacity-60" aria-hidden="true">↗</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- the portrait: a pixelated character card floating in space -->
	<div class="relative mx-auto w-full max-w-[min(100%-2.5rem,20rem)] animate-rise sm:max-w-88 md:max-w-100"
		style:animation-delay="200ms">
		<div class="relative aspect-square">
			{#each sparkles as { at, delay } (at)}
				<Glyph name="sparkle" class="absolute animate-[twinkle_2s_steps(2)_infinite] {at}" style="animation-delay: {delay}" />
			{/each}
			<PixelPlanet r={7} hue={190} class="absolute top-0 right-0 w-[18%] animate-[float_6s_steps(2)_infinite_reverse]" />
			<div class="pixel-box absolute inset-[12%] animate-float bg-muted p-1 [--bc:var(--color-edge-bright)]">
				<PixelPortrait src={profilePhoto} alt="Boden Harris" />
			</div>
		</div>

		<dl class="pixel-box relative bg-card z-2 mt-6 grid grid-cols-3">
			{#each facts as { label, value }, i (label)}
				<div class={['px-2.5 py-3 sm:px-3.5', i > 0 && 'shadow-[inset_4px_0_0_0_var(--color-line)]']}>
					<dt class="label-mono mb-1.5 text-[1.1rem]">{label}</dt>
					<dd class={['text-[0.9rem] leading-tight font-semibold sm:text-base', i < 2 && 'whitespace-nowrap']}>{value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<PageSection
	id="projects"
	eyebrow="Selected work"
	title="Projects"
	intro="Products, systems, and games built to turn ideas into working experiences."
	class="grid gap-x-7 gap-y-8 md:grid-cols-2"
>
	{#each projects as project, index (project.name)}
		<ProjectCard {project} {index} />
	{/each}
</PageSection>

<PageSection
	id="experience"
	eyebrow="Beyond the code"
	title="Experience"
	intro="Work, leadership, and team experience that shape how I collaborate and communicate."
	class="grid gap-x-7 gap-y-8 md:grid-cols-2"
>
	{#each experience as group (group.label)}
		<Card.Root {@attach reveal()}>
			<Card.Header>
				<h3 class="label-mono text-label mb-2">{group.label}</h3>
			</Card.Header>
			<Card.Content>
				<ol class="flex flex-col gap-8">
					{#each group.roles as role (role.org)}
						<!-- timeline: a dotted pixel path with star waypoints -->
						<li
							class="relative bg-[repeating-linear-gradient(180deg,var(--color-line)_0_8px,transparent_8px_16px)] bg-size-[4px_100%] bg-no-repeat pl-6.5"
						>
							<Glyph name="star" class="absolute top-0.5 -left-2 size-5 text-role" />
							<div class="mb-3 grid items-start gap-x-4 gap-y-1.5 sm:grid-cols-[1fr_auto]">
								<div>
									<h4 class="mb-2 text-[0.82rem] leading-normal">{role.org}</h4>
									<p class="text-[1.05rem] font-semibold text-highlight">{role.title}</p>
								</div>
								{#if role.dates || role.location}
									{@render meta([role.dates, role.location].filter((x) => x !== undefined))}
								{/if}
							</div>
							<ul class="flex flex-col gap-2 text-[1.05rem] leading-[1.55] text-muted-foreground">
								{#each role.points as point (point)}
									<li class="relative pl-4.5 before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:bg-shade">
										{point}
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ol>
			</Card.Content>
		</Card.Root>
	{/each}
</PageSection>

<PageSection
	id="skills"
	eyebrow="Education & toolkit"
	title="Skills"
	intro="Technologies and coursework from my studies and independent projects."
	class="flex flex-col gap-8"
>
	<Card.Root {@attach reveal()}>
		<Card.Header class="mb-2 flex flex-wrap justify-between gap-x-4 gap-y-2">
			<div>
				<Card.Title class="mb-2 leading-normal">
					<h3>{education.school}</h3>
				</Card.Title>
				<Card.Description class="text-[1.05rem] font-semibold text-highlight">{education.degree}</Card.Description>
			</div>
			{@render meta(education.meta)}
		</Card.Header>
		<Card.Content>
			<p class="label-mono text-label mb-4">Relevant coursework</p>
			<ul class="flex flex-wrap gap-2" aria-label="Relevant coursework">
				{#each education.coursework as course (course)}
					<li><Badge>{course}</Badge></li>
				{/each}
			</ul>
		</Card.Content>
	</Card.Root>

	<div class="grid gap-x-7 gap-y-8 md:grid-cols-2">
		{#each skills as group (group.label)}
			<Card.Root {@attach reveal()}>
				<Card.Header>
					<h3 class="label-mono text-label mb-1">{group.label}</h3>
				</Card.Header>
				<Card.Content>
					<ul class="flex flex-wrap gap-3">
						{#each group.items as item, i (item)}
							<li><Badge variant="chip" style="--chip: {chipColors[i % 4]}">{item}</Badge></li>
						{/each}
					</ul>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</PageSection>

<PageSection id="contact" class="grid gap-12 md:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.75fr)] md:gap-[clamp(3rem,8vw,7rem)]">
	<div {@attach reveal()}>
		<Eyebrow>Get in touch</Eyebrow>
		<h2 class="drop-text mb-6 text-[clamp(1.25rem,2.6vw,1.9rem)] leading-normal">
			Let’s talk about an opportunity or project.
		</h2>
		<p class="leading-relaxed text-muted-foreground">
			The fastest way to reach me is by email. You can also use the form and I’ll respond as soon as I can.
		</p>
		<a
			href="mailto:{email}"
			class="mt-7 inline-flex items-center gap-2 px-2 py-1 font-mono text-[1.6rem] break-all text-link shadow-[0_4px_0_0_currentColor] hover:bg-primary hover:text-primary-foreground hover:shadow-none"
		>
			<span class="text-[1.2rem]" aria-hidden="true">✉</span>{email}
		</a>
	</div>
	<ContactForm />
</PageSection>

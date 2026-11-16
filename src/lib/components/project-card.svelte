<script lang="ts">
	import type { Project } from '#lib/content.js';
	import { reveal } from '#lib/reveal.js';
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { buttonVariants } from '#lib/components/ui/button/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import PixelPlanet from './pixel-planet.svelte';

	let { project, index }: { project: Project; index: number } = $props();

	const featured = $derived(!!project.featured);
	const kicker = $derived([featured && 'Featured project', project.dates].filter(Boolean).join(' · '));
</script>

<Card.Root
	class={[
		'transition-transform duration-100 ease-[steps(1)] hover:-translate-y-1 hover:bg-accent hover:[--bc:var(--color-primary)] hover:[--drop-h:12px]',
		featured && 'md:col-span-2 md:[--card-spacing:--spacing(9.5)] [--bc:var(--color-featured)]'
	]}
	{@attach reveal((index % 2) * 70)}
>
	{#if featured}
		<!-- one planet for the featured card; it sits beside the text on wide screens and is hidden on narrow ones -->
		<PixelPlanet
			r={14}
			hue={(index * 47 + 220) % 360}
			ring
			class="absolute top-1/2 right-[5%] w-[clamp(8rem,20vw,15rem)] -translate-y-1/2 max-md:hidden"
		/>
	{/if}

	<Card.Header class={['relative z-1', featured && 'md:max-w-[min(42rem,68%)]']}>
		<p class="label-mono mb-3 text-[1.25rem]">{kicker}</p>
		<Card.Title
			class={[
				'leading-[1.45]',
				featured ? 'drop-text text-[clamp(1.4rem,3vw,2.1rem)]' : 'text-[clamp(1rem,1.6vw,1.2rem)]'
			]}
		>
			<h3>{project.name}</h3>
		</Card.Title>
	</Card.Header>

	<Card.Content class={['relative z-1 flex-1', featured ? 'md:max-w-[min(42rem,68%)]' : 'max-w-2xl']}>
		<Card.Description class={['mb-5 leading-[1.55]', featured ? 'text-[1.18rem]' : 'text-[1.08rem]']}>
			{project.description}
		</Card.Description>
		<ul class="flex flex-wrap gap-2" aria-label="{project.name} technologies">
			{#each project.technologies as tech (tech)}
				<li><Badge>{tech}</Badge></li>
			{/each}
		</ul>
	</Card.Content>

	{#if project.link}
		<Card.Footer class="pt-3">
			<!-- the link's ::after stretches over the whole card, so the card is the click target -->
			<a
				href={project.link.href}
				target="_blank"
				rel="noreferrer"
				class={[
					buttonVariants({ variant: 'link', size: 'inline' }),
					'gap-2 after:absolute after:inset-0 after:z-2 after:content-[""]'
				]}
			>
				{project.link.label}<span aria-hidden="true">↗</span>
			</a>
		</Card.Footer>
	{/if}
</Card.Root>

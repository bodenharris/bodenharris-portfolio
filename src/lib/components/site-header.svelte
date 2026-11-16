<script lang="ts">
	import { buttonVariants } from '#lib/components/ui/button/index.js';
	import Glyph from './glyph.svelte';
	import PixelPlanet from './pixel-planet.svelte';
	import ThemeToggle from './theme-toggle.svelte';

	const links = [
		{ href: '#projects', label: 'Projects' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<header class="sticky top-0 z-20 bg-background shadow-[0_4px_0_0_var(--color-border),0_8px_0_0_var(--color-drop)]">
	<div
		class="mx-auto flex w-[min(1180px,100%-3rem)] items-center justify-between gap-3 py-3 max-md:w-[min(100%-2rem,42rem)] sm:gap-8"
	>
		<a href="#top" class="group inline-flex items-center gap-2.5 font-display text-[0.62rem] sm:gap-3.5 sm:text-[0.78rem]">
			<PixelPlanet
				r={5}
				hue={255}
				ring
				class="w-9 transition-transform duration-300 ease-[steps(3)] group-hover:-translate-y-1 sm:w-11"
			/>
			Boden Harris
		</a>

		<nav aria-label="Primary" class="flex items-center gap-1">
			{#each links as { href, label } (href)}
				<a
					{href}
					class="group relative py-2.5 pr-3 pl-5 font-display text-[0.6rem] text-muted-foreground uppercase hover:text-foreground focus-visible:text-foreground max-md:hidden"
				>
					<!-- the classic menu cursor -->
					<Glyph
						name="arrow"
						class="absolute top-1/2 left-1.5 h-2.5 w-1.5 -translate-y-1/2 text-primary opacity-0 group-hover:animate-blink group-hover:opacity-100 group-focus-visible:animate-blink group-focus-visible:opacity-100"
					/>
					{label}
				</a>
			{/each}
			<a
				href="/resume.pdf"
				target="_blank"
				rel="noreferrer"
				class={[buttonVariants({ variant: 'outline', size: 'sm' }), 'mr-1.5 ml-2 sm:mr-3']}
			>
				Resume
			</a>
			<ThemeToggle />
		</nav>
	</div>
</header>

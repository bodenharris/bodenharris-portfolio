<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import { profiles } from '#lib/content.js';
	import { starfield } from '#lib/pixel/starfield.js';
	import { horizon } from '#lib/pixel/horizon.js';
	import SiteHeader from '#lib/components/site-header.svelte';

	let { children }: LayoutProps = $props();
</script>

<div class="relative min-h-screen overflow-x-clip">
	<div class="pointer-events-none fixed inset-0 bg-(image:--sky)" aria-hidden="true">
		<canvas class="pixelated absolute top-0 left-0" {@attach starfield}></canvas>
	</div>

	<a
		href="#main-content"
		class="fixed top-3 left-3 z-100 -translate-y-[180%] bg-primary px-4 py-3 font-display text-[0.7rem] text-primary-foreground focus:translate-y-0"
	>
		Skip to content
	</a>

	<SiteHeader />

	<main id="main-content" class="relative mx-auto w-[min(1180px,100%-3rem)] max-md:w-[min(100%-2rem,42rem)]">
		{@render children()}
	</main>

	<!-- the footer stands on the horizon of a pixel planet -->
	<div class="relative mt-12 overflow-hidden pt-36">
		<canvas class="pixelated pointer-events-none absolute top-0 left-0" aria-hidden="true" {@attach horizon}></canvas>
		<footer
			class="relative mx-auto flex w-[min(1180px,100%-3rem)] items-center justify-between gap-8 pt-4 pb-12 text-muted-foreground max-md:w-[min(100%-2rem,42rem)] max-sm:flex-col max-sm:items-start max-sm:gap-4"
		>
			<p class="font-display text-[0.6rem]">© {new Date().getFullYear()} Boden Harris</p>
			<div class="flex flex-wrap gap-6">
				{#each profiles as { label, href } (href)}
					<a
						{href}
						target="_blank"
						rel="noreferrer"
						class="font-mono text-[1.35rem] uppercase hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_0_0.2rem_var(--color-primary)]"
					>
						{label}
					</a>
				{/each}
			</div>
		</footer>
	</div>
</div>

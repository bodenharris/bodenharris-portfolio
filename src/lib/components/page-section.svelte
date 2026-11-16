<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { reveal } from '#lib/reveal.js';
	import Eyebrow from './eyebrow.svelte';
	import Glyph from './glyph.svelte';

	let {
		id,
		eyebrow,
		title,
		intro,
		class: className,
		children
	}: {
		id: string;
		eyebrow?: string;
		title?: string;
		intro?: string;
		class?: ClassValue;
		children: Snippet;
	} = $props();
</script>

<section {id} class="relative scroll-mt-18 py-18 sm:py-26">
	<!-- a dashed pixel divider with a star at its centre -->
	<div
		class="absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(90deg,var(--color-line)_0_12px,transparent_12px_24px)]"
		aria-hidden="true"
	></div>
	<Glyph name="star" class="absolute top-0 left-1/2 -mt-2.5 -ml-2.5 size-5 animate-[twinkle_3s_steps(2)_infinite] text-primary" />

	{#if title}
		<div class="mb-12 grid items-end gap-4 md:grid-cols-[1fr_minmax(17rem,0.6fr)] md:gap-8" {@attach reveal()}>
			<div>
				<Eyebrow>{eyebrow}</Eyebrow>
				<h2 class="drop-text text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.35]">{title}</h2>
			</div>
			<p class="leading-relaxed text-muted-foreground">{intro}</p>
		</div>
	{/if}

	<div class={className}>
		{@render children()}
	</div>
</section>

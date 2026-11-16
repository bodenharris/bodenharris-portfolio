<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { reveal } from '#lib/reveal.js';

	let {
		id,
		title,
		class: className,
		children
	}: {
		id: string;
		title?: string;
		class?: ClassValue;
		children: Snippet;
	} = $props();
</script>

<section {id} class="relative scroll-mt-18 py-18 sm:py-26">
	<!-- a dashed pixel divider -->
	<div
		class="absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(90deg,var(--color-line)_0_12px,transparent_12px_24px)]"
		aria-hidden="true"
	></div>

	{#if title}
		<h2 class="drop-text mb-12 text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.35]" {@attach reveal()}>{title}</h2>
	{/if}

	<div class={className}>
		{@render children()}
	</div>
</section>

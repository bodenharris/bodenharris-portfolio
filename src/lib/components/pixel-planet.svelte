<script lang="ts">
	import { planet } from '#lib/pixel/sprites.js';
	import type { ClassValue } from 'svelte/elements';

	let {
		r = 6,
		hue = 260,
		ring = false,
		class: className
	}: { r?: number; hue?: number; ring?: boolean; class?: ClassValue } = $props();

	const sprite = $derived(planet(r, hue, ring));
</script>

<svg
	class={['block overflow-visible', className]}
	viewBox="0 0 {sprite.w} {sprite.h}"
	style:aspect-ratio="{sprite.w} / {sprite.h}"
	shape-rendering="crispEdges"
	aria-hidden="true"
>
	{#each sprite.runs as p (`${p.x},${p.y}`)}
		<rect x={p.x} y={p.y} width={p.w} height="1" fill={p.c} />
	{/each}
</svg>

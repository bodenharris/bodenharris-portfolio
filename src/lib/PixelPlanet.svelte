<script lang="ts">
	import { planet } from './pixel';

	let { r = 6, hue = 260, ring = false, class: className = '' }: { r?: number; hue?: number; ring?: boolean; class?: string } =
		$props();

	const sprite = $derived(planet(r, hue, ring));
</script>

<svg
	class={className}
	viewBox={`0 0 ${sprite.w} ${sprite.h}`}
	shape-rendering="crispEdges"
	aria-hidden="true"
	style={`aspect-ratio: ${sprite.w} / ${sprite.h}`}
>
	{#each sprite.runs as p}<rect x={p.x} y={p.y} width={p.w} height="1" fill={p.c} />{/each}
</svg>

<style>
	svg {
		display: block;
		overflow: visible;
	}
</style>

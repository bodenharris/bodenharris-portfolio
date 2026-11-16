<script lang="ts" module>
	// Tiny hand-placed pixel glyphs, drawn in currentColor.
	const glyphs = {
		star: { box: '0 0 5 5', d: 'M2 0h1v2h2v1H3v2H2V3H0V2h2z' },
		sparkle: { box: '0 0 7 7', d: 'M3 0h1v2H3zM3 5h1v2H3zM0 3h2v1H0zM5 3h2v1H5zM2 2h3v3H2z' },
		caret: { box: '0 0 7 4', d: 'M0 0h7v1H6v1H5v1H4v1H3V3H2V2H1V1H0z' },
		arrow: { box: '0 0 4 7', d: 'M0 0h1v1h1v1h1v1h1v1H3v1H2v1H1v1H0z' }
	};

	export type GlyphName = keyof typeof glyphs;
</script>

<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let { name, ...rest }: { name: GlyphName } & SVGAttributes<SVGSVGElement> = $props();

	const glyph = $derived(glyphs[name]);
</script>

<svg viewBox={glyph.box} fill="currentColor" shape-rendering="crispEdges" aria-hidden="true" {...rest}>
	<path d={glyph.d} />
</svg>

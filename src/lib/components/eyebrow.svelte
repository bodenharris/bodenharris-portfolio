<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import Glyph from './glyph.svelte';

	let { children, class: className }: { children: Snippet; class?: ClassValue } = $props();
</script>

<!-- A small twinkling-star label above headings. -->
<p class={['label-mono mb-4 flex items-center gap-2.5 tracking-[0.06em]', className]}>
	<Glyph name="star" class="size-2.5 flex-none animate-twinkle" />
	{@render children()}
</p>

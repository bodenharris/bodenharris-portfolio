<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	// The profile photo, shown as-is. Never pixelate it.
	let { src, alt }: { src: Picture; alt: string } = $props();
</script>

<div class="relative size-full overflow-hidden">
	<enhanced:img
		{src}
		{alt}
		sizes="(max-width: 520px) 70vw, 400px"
		class="absolute inset-0 size-full origin-[50%_30%] scale-150 object-cover"
	/>
</div>

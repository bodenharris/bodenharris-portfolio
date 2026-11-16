<script lang="ts">
	// The profile photo, shown as-is. Never pixelate it.
	let { src, alt }: { src: string; alt: string } = $props();
</script>

<div class="portrait">
	<img {src} {alt} />
</div>

<style>
	.portrait {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.5);
		transform-origin: 50% 30%;
	}
</style>

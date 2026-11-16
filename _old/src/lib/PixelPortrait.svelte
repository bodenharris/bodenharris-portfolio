<script lang="ts">
	import { onMount } from 'svelte';
	import { bayer } from './pixel';

	let { src, alt, res = 64 }: { src: string; alt: string; res?: number } = $props();

	let canvas: HTMLCanvasElement;
	let ready = $state(false);

	onMount(() => {
		const img = new Image();
		img.onload = () => {
			const ctx = canvas.getContext('2d', { willReadFrequently: true });
			if (!ctx) return;
			canvas.width = res;
			canvas.height = res;
			// crop: centre square, zoomed 1.5× towards the upper third (the face)
			const s = Math.min(img.naturalWidth, img.naturalHeight);
			const ox = (img.naturalWidth - s) / 2 + s * 0.5;
			const oy = (img.naturalHeight - s) / 2 + s * 0.3;
			const side = s / 1.5;
			ctx.imageSmoothingQuality = 'high';
			ctx.drawImage(img, ox - side * 0.5, oy - side * 0.3, side, side, 0, 0, res, res);

			// posterise with an ordered dither for a hand-pixelled look
			const data = ctx.getImageData(0, 0, res, res);
			const step = 255 / 7;
			for (let y = 0; y < res; y++) {
				for (let x = 0; x < res; x++) {
					const i = (y * res + x) * 4;
					const t = bayer(x, y) - 0.5;
					for (let c = 0; c < 3; c++) {
						const v = data.data[i + c] / step + t * 0.9;
						data.data[i + c] = Math.max(0, Math.min(255, Math.round(v) * step));
					}
				}
			}
			ctx.putImageData(data, 0, 0);
			ready = true;
		};
		img.src = src;
	});
</script>

<div class="portrait" class:ready>
	<img {src} {alt} />
	<canvas bind:this={canvas} aria-hidden="true"></canvas>
</div>

<style>
	.portrait {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	img,
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	img {
		object-fit: cover;
		transform: scale(1.5);
		transform-origin: 50% 30%;
	}
	canvas {
		opacity: 0;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
		transition: opacity 360ms steps(4);
	}
	/* the pixel version shows by default; hovering "de-rezzes" to the photo */
	.ready canvas {
		opacity: 1;
	}
	.ready:hover canvas {
		opacity: 0;
	}
</style>

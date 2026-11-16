<script lang="ts">
	import { bayer } from '#lib/pixel/sprites.js';
	import type { Picture } from '@sveltejs/enhanced-img';

	let { src, alt, res = 64 }: { src: Picture; alt: string; res?: number } = $props();

	let ready = $state(false);

	// Re-draws the photo onto a tiny canvas, posterised with an ordered dither, for a
	// hand-pixelled look. Hovering "de-rezzes" back to the real photo underneath.
	function pixelate(canvas: HTMLCanvasElement) {
		const photo = canvas.parentElement?.querySelector('img');
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		if (!photo || !ctx) return;

		// Copy whichever responsive source the browser picked into a plain Image: drawing the
		// <img> itself would use its density-corrected size and crop the wrong region.
		const img = new Image();
		const load = () => (img.src = photo.currentSrc || photo.src);
		img.onload = () => {
			canvas.width = res;
			canvas.height = res;
			// crop: centre square, zoomed 1.5× towards the upper third (the face)
			const s = Math.min(img.naturalWidth, img.naturalHeight);
			const side = s / 1.5;
			const ox = (img.naturalWidth - s) / 2 + s * 0.5 - side * 0.5;
			const oy = (img.naturalHeight - s) / 2 + s * 0.3 - side * 0.3;
			ctx.imageSmoothingQuality = 'high';
			ctx.drawImage(img, ox, oy, side, side, 0, 0, res, res);

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

		if (photo.complete && photo.naturalWidth) load();
		else photo.addEventListener('load', load, { once: true });
		return () => {
			photo.removeEventListener('load', load);
			img.onload = null;
		};
	}
</script>

<div class="group relative size-full overflow-hidden">
	<enhanced:img
		{src}
		{alt}
		sizes="(max-width: 520px) 70vw, 400px"
		class="absolute inset-0 size-full origin-[50%_30%] scale-150 object-cover"
	/>
	<canvas
		{@attach pixelate}
		class={[
			'pixelated absolute inset-0 size-full transition-opacity duration-[360ms] ease-[steps(4)]',
			ready ? 'opacity-100 group-hover:opacity-0' : 'opacity-0'
		]}
		aria-hidden="true"
	></canvas>
</div>

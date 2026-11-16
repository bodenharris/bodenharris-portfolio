<script lang="ts">
	import { onMount } from 'svelte';
	import { bayer } from './pixel';

	// The curved edge of a pixel planet the footer stands on.
	const PX = 4;

	const palettes = {
		dark: { atmo: [59, 93, 201], rim: [115, 239, 247], lit: [41, 54, 111], ground: [16, 17, 30], crater: [10, 11, 20] },
		light: { atmo: [255, 205, 117], rim: [239, 125, 87], lit: [255, 255, 255], ground: [244, 244, 244], crater: [214, 222, 234] }
	};

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const host = canvas.parentElement!;

		// fixed pseudo-random craters so the surface doesn't change between redraws
		const craters = Array.from({ length: 14 }, (_, i) => ({
			x: ((i * 0.6180339) % 1) * 1.1 - 0.05,
			y: 6 + ((i * 7) % 5) * 5,
			rx: 4 + ((i * 5) % 7) * 2,
			ry: 1.5 + ((i * 3) % 3)
		}));

		function draw() {
			const w = Math.ceil(host.clientWidth / PX);
			const h = Math.ceil(host.clientHeight / PX);
			canvas.width = w;
			canvas.height = h;
			canvas.style.width = `${w * PX}px`;
			canvas.style.height = `${h * PX}px`;
			const pal = palettes[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];
			const R = Math.max(w * 1.3, 600);
			const top = 16;
			const cx = w / 2;
			const cy = top + R;
			const glow = 14;
			const img = ctx!.createImageData(w, h);
			const put = (x: number, y: number, c: number[]) => {
				const i = (y * w + x) * 4;
				img.data[i] = c[0];
				img.data[i + 1] = c[1];
				img.data[i + 2] = c[2];
				img.data[i + 3] = 255;
			};
			for (let y = 0; y < h; y++) {
				for (let x = 0; x < w; x++) {
					const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
					if (d > R + glow) continue;
					if (d > R) {
						const t = 1 - (d - R) / glow;
						if (bayer(x, y) < t * t * 0.75) put(x, y, pal.atmo);
					} else if (d > R - 1) {
						put(x, y, pal.rim);
					} else {
						const depth = R - d;
						let c = depth < 5 && bayer(x, y) < 1 - depth / 5 ? pal.lit : pal.ground;
						for (const k of craters) {
							const dx = (x - k.x * w) / k.rx;
							const dy = (depth - k.y) / k.ry;
							if (dx * dx + dy * dy <= 1) c = pal.crater;
						}
						put(x, y, c);
					}
				}
			}
			ctx!.putImageData(img, 0, 0);
		}

		draw();
		const resize = new ResizeObserver(draw);
		resize.observe(host);
		const themeObserver = new MutationObserver(draw);
		themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
		return () => {
			resize.disconnect();
			themeObserver.disconnect();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
		pointer-events: none;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { bayer } from './pixel';

	// Everything is drawn on a low-resolution canvas and scaled up with
	// nearest-neighbour sampling, so stars, meteors and nebulae are true pixels.
	const PX = 3;

	let canvas: HTMLCanvasElement;

	type Star = { x: number; y: number; depth: number; speed: number; phase: number; color: number; spark: boolean };
	type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

	const palettes = {
		dark: {
			stars: ['#f4f4f4', '#f4f4f4', '#f4f4f4', '#94b0c2', '#73eff7', '#ffcd75'],
			dim: '#566c86',
			nebula: [
				{ x: 0.82, y: 0.12, rx: 0.42, ry: 0.32, c: ['#2c1d45', '#5d275d'] },
				{ x: 0.08, y: 0.55, rx: 0.38, ry: 0.38, c: ['#18264a', '#29366f'] },
				{ x: 0.6, y: 0.98, rx: 0.5, ry: 0.28, c: ['#16303c', '#257179'] }
			],
			meteor: ['#f4f4f4', '#73eff7', '#3b5dc9']
		},
		light: {
			stars: ['#7d8fc4', '#7d8fc4', '#94a4d8', '#a8b6e0'],
			dim: '#b9c6e6',
			nebula: [
				{ x: 0.82, y: 0.12, rx: 0.42, ry: 0.32, c: ['#ffe2a8', '#ffcd75'] },
				{ x: 0.08, y: 0.55, rx: 0.38, ry: 0.38, c: ['#cfe0f5', '#b4cdec'] },
				{ x: 0.6, y: 0.98, rx: 0.5, ry: 0.28, c: ['#ffd9cc', '#f7b8a4'] }
			],
			meteor: ['#ffffff', '#ffcd75', '#ef7d57']
		}
	};

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const nebula = document.createElement('canvas');
		const nctx = nebula.getContext('2d')!;
		let stars: Star[] = [];
		let meteors: Meteor[] = [];
		let w = 0;
		let h = 0;
		let frame = 0;
		let nextMeteor = performance.now() + 2500;
		let mode: 'dark' | 'light' = 'dark';

		const currentMode = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

		function buildNebula() {
			mode = currentMode();
			nebula.width = w;
			nebula.height = h;
			const img = nctx.createImageData(w, h);
			const blobs = palettes[mode].nebula.map((b) => ({
				...b,
				rgb: b.c.map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)))
			}));
			for (let y = 0; y < h; y++) {
				for (let x = 0; x < w; x++) {
					let best = 0;
					let pick: number[] | null = null;
					for (const b of blobs) {
						const dx = (x / w - b.x) / b.rx;
						const dy = (y / h - b.y) / b.ry;
						const v = Math.exp(-(dx * dx + dy * dy) * 2.2);
						// two dithered density levels per cloud
						const t = bayer(x, y);
						const level = v * 2.4 > 1 + t ? 1 : v * 2.4 > t ? 0 : -1;
						if (level >= 0 && v > best) {
							best = v;
							pick = b.rgb[level];
						}
					}
					if (pick) {
						const i = (y * w + x) * 4;
						img.data[i] = pick[0];
						img.data[i + 1] = pick[1];
						img.data[i + 2] = pick[2];
						img.data[i + 3] = 255;
					}
				}
			}
			nctx.putImageData(img, 0, 0);
		}

		function build() {
			w = Math.ceil(window.innerWidth / PX);
			h = Math.ceil(window.innerHeight / PX);
			canvas.width = w;
			canvas.height = h;
			canvas.style.width = `${w * PX}px`;
			canvas.style.height = `${h * PX}px`;
			const count = Math.min(420, Math.round((w * h) / 260));
			stars = Array.from({ length: count }, () => ({
				x: Math.random(),
				y: Math.random(),
				depth: Math.random(),
				speed: 0.5 + Math.random() * 2,
				phase: Math.random() * Math.PI * 2,
				color: Math.floor(Math.random() * 6),
				spark: Math.random() < 0.06
			}));
			buildNebula();
		}

		function spawnMeteor() {
			const fromLeft = Math.random() < 0.5;
			const speed = 2 + Math.random() * 1.5;
			meteors.push({
				x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
				y: Math.random() * h * 0.4,
				vx: speed * (fromLeft ? 1 : -1),
				vy: speed * 0.5,
				life: 0,
				max: 50 + Math.random() * 30
			});
		}

		function px(x: number, y: number, c: string) {
			ctx!.fillStyle = c;
			ctx!.fillRect(Math.round(x), Math.round(y), 1, 1);
		}

		function draw(now: number) {
			if (currentMode() !== mode) buildNebula();
			const pal = palettes[mode];
			const t = now / 1000;
			const scroll = window.scrollY / PX;
			ctx!.clearRect(0, 0, w, h);
			ctx!.drawImage(nebula, 0, 0);

			for (const s of stars) {
				const offset = (scroll * (0.06 + s.depth * 0.25)) % h;
				let y = Math.floor(s.y * h - offset);
				if (y < 0) y += h;
				const x = Math.floor(s.x * w);
				// stepped twinkle: off / dim / bright
				const f = Math.sin(t * s.speed + s.phase) + 0.4 * Math.sin(t * s.speed * 2.3 + s.phase);
				const color = pal.stars[s.color % pal.stars.length];
				if (s.spark) {
					px(x, y, color);
					if (f > -0.2) {
						ctx!.fillStyle = color;
						ctx!.fillRect(x - 1, y, 3, 1);
						ctx!.fillRect(x, y - 1, 1, 3);
					}
					if (f > 0.7) {
						ctx!.fillStyle = pal.dim;
						ctx!.fillRect(x - 2, y, 1, 1);
						ctx!.fillRect(x + 2, y, 1, 1);
						ctx!.fillRect(x, y - 2, 1, 1);
						ctx!.fillRect(x, y + 2, 1, 1);
					}
				} else if (f > -0.6) {
					px(x, y, f > 0.3 ? color : pal.dim);
				}
			}

			if (mode === 'dark' && now > nextMeteor) {
				spawnMeteor();
				nextMeteor = now + 4000 + Math.random() * 7000;
			}
			meteors = meteors.filter((m) => m.life < m.max && m.x > -20 && m.x < w + 20);
			for (const m of meteors) {
				m.life++;
				m.x += m.vx;
				m.y += m.vy;
				// a stair-stepped trail that cools from white to blue
				const len = 14;
				for (let i = len; i >= 0; i--) {
					const c = i < 2 ? pal.meteor[0] : i < 7 ? pal.meteor[1] : pal.meteor[2];
					if (i > 9 && i % 2) continue;
					px(m.x - (m.vx / Math.abs(m.vx)) * i, m.y - i * 0.5, c);
				}
			}

			if (!reduced.matches) frame = requestAnimationFrame(draw);
		}

		function restart() {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(draw);
		}

		let resizeTimer: ReturnType<typeof setTimeout>;
		function onResize() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				build();
				restart();
			}, 120);
		}
		function onStatic() {
			if (reduced.matches) restart();
		}

		build();
		restart();
		window.addEventListener('resize', onResize);
		window.addEventListener('scroll', onStatic, { passive: true });
		reduced.addEventListener('change', restart);
		const themeObserver = new MutationObserver(onStatic);
		themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(resizeTimer);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('scroll', onStatic);
			reduced.removeEventListener('change', restart);
			themeObserver.disconnect();
		};
	});
</script>

<div class="sky" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.sky {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background: var(--sky);
	}
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}
</style>

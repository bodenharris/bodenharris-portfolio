<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	type Star = {
		x: number;
		y: number;
		r: number;
		depth: number;
		base: number;
		speed: number;
		phase: number;
		hue: [number, number, number];
		spark: boolean;
	};

	type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

	const tints: [number, number, number][] = [
		[255, 255, 255],
		[255, 255, 255],
		[255, 255, 255],
		[200, 215, 255],
		[170, 200, 255],
		[255, 236, 210],
		[255, 214, 230]
	];

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		let stars: Star[] = [];
		let meteors: Meteor[] = [];
		let width = 0;
		let height = 0;
		let dpr = 1;
		let frame = 0;
		let nextMeteor = performance.now() + 2500;

		function build() {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

			const count = Math.min(700, Math.round((width * height) / 2400));
			stars = Array.from({ length: count }, () => {
				const depth = Math.random();
				const spark = Math.random() < 0.045;
				return {
					x: Math.random(),
					y: Math.random(),
					depth,
					r: spark ? 1.1 + Math.random() * 0.9 : 0.35 + Math.pow(Math.random(), 2.4) * 1.25,
					base: 0.35 + Math.random() * 0.65,
					speed: 0.6 + Math.random() * 2.6,
					phase: Math.random() * Math.PI * 2,
					hue: tints[Math.floor(Math.random() * tints.length)],
					spark
				};
			});
		}

		function spawnMeteor() {
			const fromLeft = Math.random() < 0.5;
			const angle = (Math.PI / 180) * (18 + Math.random() * 22);
			const speed = 9 + Math.random() * 7;
			meteors.push({
				x: fromLeft ? Math.random() * width * 0.5 : width * 0.5 + Math.random() * width * 0.5,
				y: Math.random() * height * 0.45,
				vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
				vy: Math.sin(angle) * speed,
				life: 0,
				max: 55 + Math.random() * 35
			});
		}

		function draw(now: number) {
			const light = document.documentElement.dataset.theme === 'light';
			const t = now / 1000;
			const scroll = window.scrollY;
			ctx!.clearRect(0, 0, width, height);

			for (const s of stars) {
				// slow parallax drift with scroll, deeper stars move less
				const offset = (scroll * (0.02 + s.depth * 0.08)) % height;
				let y = s.y * height - offset;
				if (y < 0) y += height;
				const x = s.x * width;

				// layered sines give an irregular, natural flicker
				const flicker =
					0.55 +
					0.3 * Math.sin(t * s.speed + s.phase) +
					0.15 * Math.sin(t * s.speed * 2.7 + s.phase * 1.7);
				let alpha = s.base * Math.max(0.08, flicker);
				if (light) alpha *= 0.55;

				const [r, g, b] = light ? [72, 82, 168] : s.hue;
				ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
				ctx!.beginPath();
				ctx!.arc(x, y, s.r, 0, Math.PI * 2);
				ctx!.fill();

				if (s.spark) {
					const len = s.r * (3.5 + 3 * Math.max(0, flicker));
					ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.55})`;
					ctx!.lineWidth = 0.6;
					ctx!.beginPath();
					ctx!.moveTo(x - len, y);
					ctx!.lineTo(x + len, y);
					ctx!.moveTo(x, y - len);
					ctx!.lineTo(x, y + len);
					ctx!.stroke();

					const glow = ctx!.createRadialGradient(x, y, 0, x, y, s.r * 5);
					glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.35})`);
					glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
					ctx!.fillStyle = glow;
					ctx!.beginPath();
					ctx!.arc(x, y, s.r * 5, 0, Math.PI * 2);
					ctx!.fill();
				}
			}

			if (!light && now > nextMeteor) {
				spawnMeteor();
				nextMeteor = now + 4000 + Math.random() * 7000;
			}

			meteors = meteors.filter((m) => m.life < m.max);
			for (const m of meteors) {
				m.life++;
				m.x += m.vx;
				m.y += m.vy;
				const fade = Math.sin((m.life / m.max) * Math.PI);
				const tail = 14;
				const grad = ctx!.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
				grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
				grad.addColorStop(1, 'rgba(160,190,255,0)');
				ctx!.strokeStyle = grad;
				ctx!.lineWidth = 1.4;
				ctx!.lineCap = 'round';
				ctx!.beginPath();
				ctx!.moveTo(m.x, m.y);
				ctx!.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
				ctx!.stroke();
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

		// with reduced motion, repaint a still frame on scroll/theme change only
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
	<div class="nebula"></div>
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.sky {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background: var(--sky);
		transition: background 600ms ease;
	}
	.nebula {
		position: absolute;
		inset: -10%;
		background:
			radial-gradient(ellipse 45% 35% at 82% 12%, var(--nebula-a), transparent 70%),
			radial-gradient(ellipse 40% 40% at 8% 55%, var(--nebula-b), transparent 70%),
			radial-gradient(ellipse 50% 30% at 60% 95%, var(--nebula-c), transparent 70%);
		filter: blur(20px);
		animation: drift 60s ease-in-out infinite alternate;
	}
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	@keyframes drift {
		to {
			transform: translate3d(-2%, 3%, 0) scale(1.06);
		}
	}
</style>

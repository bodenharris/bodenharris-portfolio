<script lang="ts">
	import { cowFrames, ufoFrames, type Sprite } from '#lib/pixel/abduction.js';

	/*
	 * Plays once on load, over the portrait frame: a cow wanders along the top edge,
	 * a UFO swoops in, beams it up, and leaves. Place inside a positioned box; the cow
	 * stands on the box's top edge (just outside its 4px pixel-box border).
	 * Skipped entirely with reduced motion. Positions are in cqw of the box.
	 */

	const FPS = 12; // the scene advances in whole frames, like a sprite
	const COW_PX = 1.2; // cqw per cow pixel
	const UFO_PX = 1.6; // cqw per UFO pixel

	// timeline, in seconds
	const WALK = [0.4, 3.4] as const;
	const ARRIVE = [2.4, 4.2] as const;
	const BEAM = [4.5, 7.2] as const;
	const LIFT = [4.9, 6.9] as const;
	const LEAVE = [7.4, 8.6] as const;
	const END = 8.8;

	// where things are when the UFO hovers
	const COW_START = 4;
	const COW_STOP = 40;
	const COW_W = cowFrames[0].w * COW_PX;
	const COW_H = cowFrames[0].h * COW_PX;
	const UFO_W = ufoFrames[0].w * UFO_PX;
	const UFO_H = ufoFrames[0].h * UFO_PX;
	const BEAM_X = COW_STOP + COW_W / 2;
	const UFO_Y = 34; // gap from the frame's top edge up to the UFO's underside
	const LIFT_Y = UFO_Y - COW_H / 2;

	const clamp01 = (k: number) => Math.min(1, Math.max(0, k));
	const progress = (t: number, [a, b]: readonly [number, number]) => clamp01((t - a) / (b - a));
	const easeOut = (k: number) => 1 - (1 - k) ** 2;
	const easeIn = (k: number) => k * k;

	/** A stepped trapezoid for the beam, narrow at the UFO and wide at the cow. */
	function staircase(top: number, bands: number): string {
		const left: string[] = [];
		const right: string[] = [];
		for (let i = 0; i < bands; i++) {
			const w = top + ((1 - top) * i) / (bands - 1);
			const xl = ((1 - w) / 2) * 100;
			const y0 = (i / bands) * 100;
			const y1 = ((i + 1) / bands) * 100;
			left.push(`${xl}% ${y0}%`, `${xl}% ${y1}%`);
			right.unshift(`${100 - xl}% ${y1}%`, `${100 - xl}% ${y0}%`);
		}
		return `polygon(${[...left, ...right].join(', ')})`;
	}
	const BEAM_W = 30;
	const beamClip = staircase((8 * UFO_PX) / BEAM_W, 7);

	let stage: HTMLDivElement;
	let t = $state(-1); // seconds into the scene; below zero means not showing

	// Start once the frame is mostly on screen (on phones it begins below the fold).
	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let raf = 0;
		let last = 0;
		let elapsed = 0;
		const tick = (now: number) => {
			elapsed += Math.min(now - last, 100) / 1000; // don't jump ahead after a hidden tab
			last = now;
			if (elapsed >= END) {
				t = -1;
				return;
			}
			t = Math.floor(elapsed * FPS) / FPS;
			raf = requestAnimationFrame(tick);
		};
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();
				last = performance.now();
				t = 0;
				raf = requestAnimationFrame(tick);
			},
			{ threshold: 0.6 }
		);
		observer.observe(stage);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(raf);
		};
	});

	const lift = $derived(progress(t, LIFT));
	const walking = $derived(t > WALK[0] && t < WALK[1]);
	const kicking = $derived(lift > 0 && lift < 1);

	const cow = $derived({
		frame: walking ? Math.floor(t * 6) % 2 : kicking ? Math.floor(t * 8) % 2 : 0,
		x: COW_START + (COW_STOP - COW_START) * progress(t, WALK),
		y: LIFT_Y * easeIn(lift),
		scale: 1 - 0.65 * lift,
		tilt: kicking ? (Math.floor(t * 4) % 2 ? 10 : -10) : 0,
		shown: t < LIFT[1]
	});

	const ufo = $derived.by(() => {
		const arrive = easeOut(progress(t, ARRIVE));
		const leave = easeIn(progress(t, LEAVE));
		const hover = arrive === 1 && leave === 0 ? (Math.floor(t * 2) % 2) * 0.8 : 0;
		return {
			frame: Math.floor(t * 4) % 2,
			x: BEAM_X - UFO_W / 2 + -160 * (1 - arrive) + 170 * leave,
			y: UFO_Y + 28 * (1 - arrive) + 50 * leave + hover
		};
	});

	const beam = $derived.by(() => {
		if (t < BEAM[0] || t >= BEAM[1]) return null;
		// flicker on and off at either end
		const edge = t < BEAM[0] + 0.25 || t >= BEAM[1] - 0.25;
		if (edge && Math.floor(t * FPS) % 2) return null;
		return { stripe: Math.floor(t * 8) % 4 };
	});
</script>

{#snippet pixels(sprite: Sprite, style: string)}
	<svg
		class="absolute block overflow-visible"
		viewBox="0 0 {sprite.w} {sprite.h}"
		{style}
		shape-rendering="crispEdges"
	>
		{#each sprite.runs as p (`${p.x},${p.y}`)}
			<rect x={p.x} y={p.y} width={p.w} height="1" fill={p.c} />
		{/each}
	</svg>
{/snippet}

<div bind:this={stage} class="pointer-events-none absolute inset-0 z-10 [container-type:size]" aria-hidden="true">
	{#if t >= 0}
		{#if cow.shown}
			{@render pixels(
				cowFrames[cow.frame],
				`left: ${cow.x}cqw; bottom: calc(100% + 4px + ${cow.y}cqw); width: ${COW_W}cqw; height: ${COW_H}cqw;` +
					`transform: rotate(${cow.tilt}deg) scale(${cow.scale});`
			)}
		{/if}

		{#if beam}
			<div
				class="absolute"
				style:left="{BEAM_X - BEAM_W / 2}cqw"
				style:width="{BEAM_W}cqw"
				style:bottom="calc(100% + 4px)"
				style:height="calc({UFO_Y + UFO_PX}cqw)"
				style:clip-path={beamClip}
				style:background="repeating-linear-gradient(to bottom, rgb(255 246 168 / 0.55) 0 8px, rgb(255 246 168 / 0.25) 8px 16px)"
				style:background-position-y="{beam.stripe * 4}px"
			></div>
		{/if}

		{@render pixels(
			ufoFrames[ufo.frame],
			`left: ${ufo.x}cqw; bottom: calc(100% + 4px + ${ufo.y}cqw); width: ${UFO_W}cqw; height: ${UFO_H}cqw;`
		)}
	{/if}
</div>

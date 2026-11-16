<script lang="ts">
	let {
		theme,
		size = 'sm',
		ontoggle
	}: {
		theme: 'light' | 'dark';
		size?: 'sm' | 'lg';
		ontoggle: (event: MouseEvent) => void;
	} = $props();
</script>

<button
	class="celestial {size}"
	type="button"
	onclick={ontoggle}
	aria-label={theme === 'dark' ? 'Switch to light theme (turn the moon into the sun)' : 'Switch to dark theme (turn the sun into the moon)'}
	title={theme === 'dark' ? 'Let the sun rise' : 'Bring back the night'}
>
	<span class="halo" aria-hidden="true"></span>
	<span class="rays" aria-hidden="true"></span>
	<span class="orb" aria-hidden="true">
		<span class="sun-face"></span>
		<span class="crater c1"></span>
		<span class="crater c2"></span>
		<span class="crater c3"></span>
		<span class="crater c4"></span>
		<span class="crater c5"></span>
	</span>
</button>

<style>
	.celestial {
		--d: 2.3rem;
		position: relative;
		display: grid;
		width: var(--d);
		height: var(--d);
		flex: none;
		place-items: center;
		border: 0;
		border-radius: 50%;
		background: transparent;
		padding: 0;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
	.celestial.lg {
		--d: clamp(5.5rem, 11vw, 8.5rem);
	}
	.celestial:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 6px;
		border-radius: 50%;
	}

	.orb,
	.halo,
	.rays,
	.sun-face {
		position: absolute;
		border-radius: 50%;
	}

	/* ---- the body: a moon by night ---- */
	.orb {
		inset: 12%;
		overflow: hidden;
		background:
			radial-gradient(circle at 34% 30%, #ffffff 0%, #e9ecf6 28%, #c3c8d8 62%, #8d93a8 100%);
		box-shadow:
			inset -0.18em -0.22em 0.5em rgba(40, 46, 70, 0.45),
			0 0 0.9em rgba(200, 215, 255, 0.45);
		transform: rotate(0deg);
		transition:
			transform 900ms cubic-bezier(0.65, 0, 0.35, 1),
			box-shadow 700ms ease;
	}
	.lg .orb {
		box-shadow:
			inset -0.6em -0.7em 1.4em rgba(40, 46, 70, 0.5),
			0 0 2.4em rgba(200, 215, 255, 0.35);
	}

	.crater {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle at 40% 35%, rgba(120, 126, 150, 0.55), rgba(150, 156, 178, 0.35) 60%, rgba(255, 255, 255, 0.15));
		box-shadow: inset 0.05em 0.06em 0.08em rgba(70, 76, 100, 0.35);
		transition:
			transform 600ms cubic-bezier(0.65, 0, 0.35, 1),
			opacity 500ms ease;
	}
	.c1 { width: 30%; height: 30%; top: 22%; left: 50%; }
	.c2 { width: 18%; height: 18%; top: 58%; left: 24%; }
	.c3 { width: 13%; height: 13%; top: 30%; left: 20%; }
	.c4 { width: 20%; height: 20%; top: 62%; left: 58%; }
	.c5 { width: 9%; height: 9%; top: 14%; left: 34%; }

	.sun-face {
		inset: 0;
		background: radial-gradient(circle at 38% 34%, #fffbe6 0%, #ffe27a 30%, #ffb53d 70%, #ff8a1f 100%);
		opacity: 0;
		transition: opacity 700ms ease;
	}

	.halo {
		inset: -10%;
		background: radial-gradient(circle, rgba(190, 205, 255, 0.28), transparent 68%);
		transition: background 700ms ease, transform 700ms ease;
	}

	.rays {
		inset: -18%;
		background: repeating-conic-gradient(from 0deg, #ffc23d 0deg 7deg, transparent 7deg 30deg);
		-webkit-mask: radial-gradient(circle, transparent 46%, #000 49%, transparent 71%);
		mask: radial-gradient(circle, transparent 46%, #000 49%, transparent 71%);
		opacity: 0;
		transform: scale(0.4) rotate(-90deg);
		transition:
			opacity 500ms ease,
			transform 900ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.celestial:hover .halo {
		transform: scale(1.15);
	}
	.celestial:hover .orb {
		transform: rotate(-12deg);
	}
	.celestial:active .orb {
		transform: scale(0.94);
	}

	/* ---- by day: the same body becomes the sun ---- */
	:global(:root[data-theme='light']) .orb {
		transform: rotate(-180deg);
		box-shadow:
			inset -0.1em -0.1em 0.4em rgba(255, 120, 0, 0.35),
			0 0 1em rgba(255, 180, 60, 0.75);
	}
	:global(:root[data-theme='light']) .lg .orb {
		box-shadow:
			inset -0.4em -0.4em 1.2em rgba(255, 120, 0, 0.35),
			0 0 3em rgba(255, 170, 50, 0.65);
	}
	:global(:root[data-theme='light']) .celestial:hover .orb {
		transform: rotate(-192deg);
	}
	:global(:root[data-theme='light']) .sun-face {
		opacity: 1;
	}
	:global(:root[data-theme='light']) .crater {
		opacity: 0;
		transform: scale(0);
	}
	:global(:root[data-theme='light']) .rays {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}
	:global(:root[data-theme='light']) .halo {
		background: radial-gradient(circle, rgba(255, 196, 80, 0.45), transparent 68%);
	}
	:global(:root[data-theme='light']) .lg .rays {
		animation: spin 40s linear infinite;
	}

	@keyframes spin {
		from { rotate: 0deg; }
		to { rotate: 360deg; }
	}

	@media (prefers-reduced-motion: reduce) {
		.orb, .rays, .crater, .sun-face, .halo { transition: none; }
		.rays { animation: none !important; }
	}
</style>

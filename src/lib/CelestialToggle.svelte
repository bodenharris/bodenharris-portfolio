<script lang="ts">
	import { moon, sun } from './pixel';

	let {
		theme,
		ontoggle
	}: {
		theme: 'light' | 'dark';
		ontoggle: (event: MouseEvent) => void;
	} = $props();

	const moonRuns = moon();
	const sunRuns = sun();
</script>

<button
	class="celestial"
	type="button"
	onclick={ontoggle}
	aria-label={theme === 'dark' ? 'Switch to light theme (turn the moon into the sun)' : 'Switch to dark theme (turn the sun into the moon)'}
	title={theme === 'dark' ? 'Let the sun rise' : 'Bring back the night'}
>
	<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
		<g class="moon">{#each moonRuns as p}<rect x={p.x} y={p.y} width={p.w} height="1" fill={p.c} />{/each}</g>
		<g class="sun">{#each sunRuns as p}<rect x={p.x} y={p.y} width={p.w} height="1" fill={p.c} />{/each}</g>
	</svg>
</button>

<style>
	.celestial {
		display: grid;
		width: 2.5rem;
		height: 2.5rem;
		flex: none;
		place-items: center;
		border: 0;
		background: transparent;
		padding: 0;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
	svg {
		width: 32px;
		height: 32px;
		transition: transform 240ms steps(2);
	}
	.celestial:hover svg {
		transform: translateY(-2px);
	}
	.celestial:active svg {
		transform: translateY(2px);
	}

	g {
		transform-origin: 8px 8px;
		transition:
			opacity 300ms steps(3),
			transform 300ms steps(3);
	}
	.sun {
		opacity: 0;
		transform: scale(0.5);
	}
	:global(:root[data-theme='light']) .moon {
		opacity: 0;
		transform: scale(0.5);
	}
	:global(:root[data-theme='light']) .sun {
		opacity: 1;
		transform: none;
		animation: pulse 1.6s steps(1) infinite;
	}
	@keyframes pulse {
		50% {
			transform: scale(1.0625);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		g, svg { transition: none; animation: none !important; }
	}
</style>

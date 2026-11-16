<script lang="ts">
	import { flushSync, onMount } from 'svelte';
	import { moon, sun } from '#lib/pixel/sprites.js';
	import { STORAGE_KEY, currentTheme, type Theme } from '#lib/pixel/theme.js';

	const moonRuns = moon();
	const sunRuns = sun();

	// The real theme is set before paint by the inline script in app.html.
	let theme = $state<Theme>('dark');
	onMount(() => (theme = currentTheme()));

	function apply(next: Theme) {
		theme = next;
		document.documentElement.classList.toggle('dark', next === 'dark');
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			/* storage unavailable */
		}
	}

	// The new theme spreads outward, in chunky frames, from the moon/sun that was clicked.
	function toggle(event: MouseEvent) {
		const next: Theme = theme === 'dark' ? 'light' : 'dark';
		if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
			apply(next);
			return;
		}
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
		const transition = document.startViewTransition(() => flushSync(() => apply(next)));
		transition.ready
			.then(() =>
				document.documentElement.animate(
					{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
					{ duration: 720, easing: 'steps(9, end)', pseudoElement: '::view-transition-new(root)' }
				)
			)
			.catch(() => {});
	}
</script>

<svelte:head>
	<meta name="theme-color" content={theme === 'dark' ? '#11132a' : '#dcebf7'} />
</svelte:head>

<button
	type="button"
	class="group grid size-10 flex-none cursor-pointer place-items-center [-webkit-tap-highlight-color:transparent]"
	onclick={toggle}
	aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
	title={theme === 'dark' ? 'Let the sun rise' : 'Bring back the night'}
>
	<svg
		viewBox="0 0 16 16"
		shape-rendering="crispEdges"
		aria-hidden="true"
		class="size-8 transition-transform duration-240 ease-[steps(2)] group-hover:-translate-y-0.5 group-active:translate-y-0.5"
	>
		<g class="origin-center transition-all duration-300 ease-[steps(3)] [transform-box:fill-box] scale-50 opacity-0 dark:scale-100 dark:opacity-100">
			{#each moonRuns as p (`${p.x},${p.y}`)}<rect x={p.x} y={p.y} width={p.w} height="1" fill={p.c} />{/each}
		</g>
		<g class="origin-center transition-all duration-300 ease-[steps(3)] [transform-box:fill-box] scale-100 animate-sun-pulse opacity-100 dark:scale-50 dark:animate-none dark:opacity-0">
			{#each sunRuns as p (`${p.x},${p.y}`)}<rect x={p.x} y={p.y} width={p.w} height="1" fill={p.c} />{/each}
		</g>
	</svg>
</button>


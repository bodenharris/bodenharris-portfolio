import type { Attachment } from 'svelte/attachments';

let observer: IntersectionObserver | undefined;

function getObserver() {
	observer ??= new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				el.dataset.reveal = 'shown';
				observer!.unobserve(el);
				// Drop the attribute once in, so its transition never fights hover effects.
				el.addEventListener('transitionend', () => delete el.dataset.reveal, { once: true });
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
	);
	return observer;
}

/**
 * Fades an element up, frame by frame, the first time it scrolls into view.
 * Runs only in the browser, so without JS (or with reduced motion) everything just shows.
 */
export function reveal(delay = 0): Attachment<HTMLElement> {
	return (el) => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		el.dataset.reveal = 'hidden';
		if (delay) el.style.setProperty('--delay', `${delay}ms`);
		const io = getObserver();
		io.observe(el);
		return () => io.unobserve(el);
	};
}

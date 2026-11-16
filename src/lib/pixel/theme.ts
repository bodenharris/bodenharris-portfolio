export type Theme = 'light' | 'dark';

export const STORAGE_KEY = 'portfolio-theme';

export const currentTheme = (): Theme =>
	document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/** Calls `fn` whenever the theme class on <html> flips. Returns a cleanup. */
export function onThemeChange(fn: () => void) {
	const observer = new MutationObserver(fn);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	return () => observer.disconnect();
}

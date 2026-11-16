// Pixel sprites for the cow abduction that plays over the portrait on load.

import { toRuns, type Grid, type Run } from './sprites.js';

export type Sprite = { w: number; h: number; runs: Run[] };

/** Build a sprite from rows of palette characters; '.' (or any unmapped char) is transparent. */
function sprite(rows: string[], palette: Record<string, string>): Sprite {
	const w = Math.max(...rows.map((row) => row.length));
	const grid: Grid = rows.map((row) => Array.from(row.padEnd(w, '.'), (ch) => palette[ch] ?? null));
	return { w, h: rows.length, runs: toRuns(grid) };
}

const OUTLINE = '#2a1f33';

// --- the cow: 19 x 11, facing right, with two leg frames for walking ---

const cowPalette = {
	o: OUTLINE,
	e: OUTLINE,
	w: '#f6f1e7',
	s: '#3b3045',
	p: '#f4a6b8',
	n: '#c96a82',
	h: '#e8d8a0'
};

const cowBody = [
	'.'.repeat(13) + 'h....h',
	'.'.repeat(13) + 'owwwwo',
	'.' + 'o'.repeat(12) + 'oewweo',
	'oo' + 'wsswwwwwwww' + 'owwwwo',
	'oo' + 'wssswwwssww' + 'oppppo',
	'oo' + 'wwswwwwsssw' + 'onppno',
	'.o' + 'wwwwwwwwsww' + 'o' + 'oooo.',
	'.o' + 'wwwwwwwwwww' + 'o',
	'.' + 'o'.repeat(13)
];

function legRows(xs: number[]): string[] {
	const row = (udder: boolean) =>
		Array.from({ length: 19 }, (_, x) => (xs.includes(x) ? 'o' : udder && (x === 7 || x === 8) ? 'p' : '.')).join('');
	return [row(true), row(false)];
}

export const cowFrames: Sprite[] = [
	sprite([...cowBody, ...legRows([2, 5, 9, 12])], cowPalette),
	sprite([...cowBody, ...legRows([3, 4, 10, 11])], cowPalette)
];

// --- the UFO: 24 x 9, with two frames of chasing rim lights ---

const center = (inner: string) => {
	const pad = '.'.repeat((24 - inner.length) / 2);
	return pad + inner + pad;
};

const lights = Array.from({ length: 22 }, (_, i) => (i % 4 === 1 ? (i % 8 === 1 ? 'a' : 'b') : 'M')).join('');

const ufoRows = [
	center('oooooooo'),
	center('ooDDddddddoo'),
	center('oDDddddddddddo'),
	center('o' + 'm'.repeat(18) + 'o'),
	center('o' + 'm'.repeat(20) + 'o'),
	'o' + lights + 'o',
	center('o' + 'M'.repeat(20) + 'o'),
	center('o'.repeat(18)),
	center('yyyyyyyy')
];

const ufoPalette = {
	o: OUTLINE,
	D: '#eafcff',
	d: '#7fd8f0',
	m: '#d3d8e2',
	M: '#8a93a6',
	y: '#fff6a8'
};

const YELLOW = '#ffd84a';
const PINK = '#ff5c8a';

export const ufoFrames: Sprite[] = [
	sprite(ufoRows, { ...ufoPalette, a: YELLOW, b: PINK }),
	sprite(ufoRows, { ...ufoPalette, a: PINK, b: YELLOW })
];

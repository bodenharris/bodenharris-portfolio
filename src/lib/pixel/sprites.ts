// Small helpers for drawing pixel-art sprites as crisp SVG rects.

export type Run = { x: number; y: number; w: number; c: string };
export type Grid = (string | null)[][];

const BAYER4 = [
	[0, 8, 2, 10],
	[12, 4, 14, 6],
	[3, 11, 1, 9],
	[15, 7, 13, 5]
];

/** Ordered-dither threshold in [0, 1) for a pixel. */
export function bayer(x: number, y: number): number {
	return (BAYER4[y & 3][x & 3] + 0.5) / 16;
}

/** Merge horizontal runs of same-coloured pixels so a sprite needs few rects. */
export function toRuns(grid: Grid): Run[] {
	const runs: Run[] = [];
	grid.forEach((row, y) => {
		let x = 0;
		while (x < row.length) {
			const c = row[x];
			if (!c) {
				x++;
				continue;
			}
			let w = 1;
			while (row[x + w] === c) w++;
			runs.push({ x, y, w, c });
			x += w;
		}
	});
	return runs;
}

function blank(w: number, h: number): Grid {
	return Array.from({ length: h }, () => Array<string | null>(w).fill(null));
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// light comes from the upper left, slightly towards the viewer
const LX = -0.55;
const LY = -0.6;
const LZ = 0.58;

/** A dithered, banded pixel planet, optionally with a tilted ring. */
export function planet(r: number, hue: number, ring = false): { w: number; h: number; runs: Run[] } {
	const a = r * 1.75;
	const b = a * 0.3;
	const tilt = -0.32;
	const w = ring ? Math.ceil(a) * 2 + 2 : r * 2;
	const h = r * 2 + (ring ? 2 : 0);
	const cx = w / 2;
	const cy = h / 2;
	const shades = [
		`hsl(${hue} 55% 13%)`,
		`hsl(${hue} 58% 26%)`,
		`hsl(${hue} 64% 42%)`,
		`hsl(${hue} 74% 60%)`,
		`hsl(${hue} 88% 80%)`
	];
	const ringHue = (hue + 40) % 360;
	const ringLight = `hsl(${ringHue} 70% 74%)`;
	const ringDark = `hsl(${ringHue} 45% 46%)`;
	const cos = Math.cos(tilt);
	const sin = Math.sin(tilt);
	const grid = blank(w, h);

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const dx = x + 0.5 - cx;
			const dy = y + 0.5 - cy;
			const d2 = dx * dx + dy * dy;
			const inPlanet = d2 <= r * r;

			let ringColor: string | null = null;
			let front = false;
			if (ring) {
				const rx = dx * cos + dy * sin;
				const ry = -dx * sin + dy * cos;
				const e = (rx / a) ** 2 + (ry / b) ** 2;
				if (e <= 1 && e >= 0.6) {
					ringColor = e > 0.8 ? ringLight : ringDark;
					front = ry > 0;
				}
			}

			if (ringColor && (front || !inPlanet)) {
				grid[y][x] = ringColor;
			} else if (inPlanet) {
				const nx = dx / r;
				const ny = dy / r;
				const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
				const lum = Math.max(0, nx * LX + ny * LY + nz * LZ);
				const band = 0.09 * Math.sin(ny * 7 + hue);
				const v = lum * 0.95 + band + 0.04;
				const level = clamp(Math.floor(v * 4 + bayer(x, y) - 0.35), 0, 4);
				grid[y][x] = shades[level];
			}
		}
	}
	return { w, h, runs: toRuns(grid) };
}

/** 16×16 moon with craters. */
export function moon(): Run[] {
	const shades = ['#3b4466', '#566c86', '#94b0c2', '#c9d4e0', '#f4f4f4'];
	const craters = new Set(['9,4', '10,4', '9,5', '10,5', '11,5', '4,8', '5,8', '4,9', '9,10', '10,10', '10,11', '6,12']);
	const grid = blank(16, 16);
	const r = 6.6;
	for (let y = 0; y < 16; y++) {
		for (let x = 0; x < 16; x++) {
			const dx = x + 0.5 - 8;
			const dy = y + 0.5 - 8;
			if (dx * dx + dy * dy > r * r) continue;
			const nx = dx / r;
			const ny = dy / r;
			const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
			const lum = Math.max(0, nx * LX + ny * LY + nz * LZ);
			let level = clamp(Math.floor(lum * 4 + bayer(x, y) - 0.2), 0, 4);
			if (craters.has(`${x},${y}`)) level = Math.max(0, level - 2);
			grid[y][x] = shades[level];
		}
	}
	return toRuns(grid);
}

/** 16×16 sun with eight short rays. */
export function sun(): Run[] {
	const grid = blank(16, 16);
	const r = 4.7;
	for (let y = 0; y < 16; y++) {
		for (let x = 0; x < 16; x++) {
			const dx = x + 0.5 - 8;
			const dy = y + 0.5 - 8;
			const d = Math.hypot(dx, dy);
			if (d > r) continue;
			const hl = (dx + 1.5) ** 2 + (dy + 1.5) ** 2 < 4.5;
			grid[y][x] = hl ? '#fff4cf' : d > r - 1 ? '#ef7d57' : '#ffcd75';
		}
	}
	const ray = (pts: [number, number][], tip: [number, number][]) => {
		pts.forEach(([x, y]) => (grid[y][x] = '#ffcd75'));
		tip.forEach(([x, y]) => (grid[y][x] = '#ef7d57'));
	};
	ray([[7, 1], [8, 1]], [[7, 0], [8, 0]]);
	ray([[7, 14], [8, 14]], [[7, 15], [8, 15]]);
	ray([[1, 7], [1, 8]], [[0, 7], [0, 8]]);
	ray([[14, 7], [14, 8]], [[15, 7], [15, 8]]);
	ray([[3, 3]], [[2, 2]]);
	ray([[12, 3]], [[13, 2]]);
	ray([[3, 12]], [[2, 13]]);
	ray([[12, 12]], [[13, 13]]);
	return toRuns(grid);
}

// Everything the portfolio says lives here, so updating it never means touching markup.

export const profiles = [
	{ label: 'GitHub', href: 'https://github.com/bodenharris' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/boden-harris-a74897326/' },
	{ label: 'itch.io', href: 'https://dollamenu.itch.io/' }
];

export const email = 'blharris@umass.edu';

export const facts = [
	{ label: 'Graduation', value: 'May 2028' },
	{ label: 'GPA', value: '3.97 / 4.00' },
	{ label: 'Focus', value: 'Software engineering' }
];

export type Project = {
	name: string;
	dates: string;
	description: string;
	technologies: string[];
	link?: { href: string; label: string };
	featured?: boolean;
};

export const projects: Project[] = [
	{
		name: 'YourSplit',
		dates: 'Apr 2026 – Present',
		description:
			'A workout-planning website where users create, save, browse, share, and favorite training routines. Built with a three-person team; I developed the SvelteKit backend with Supabase authentication and PostgreSQL to manage user accounts and stored routines.',
		technologies: ['SvelteKit', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
		link: { href: 'https://yoursplit.com', label: 'Visit live app' },
		featured: true
	},
	{
		name: 'The Wolf',
		dates: 'Nov 2026',
		description:
			'A daily market-guessing game: one famous stock chart, hidden, and five up-or-down calls before the reveal. Built with a three-person team; I led the arcade pixel-art redesign, the animated chart scenery, end-of-game ranks and a percentile histogram, sound effects, and the how-to-play carousel.',
		technologies: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'TimescaleDB', 'Tailwind CSS'],
		link: { href: 'https://thewolfof.nyc', label: 'Play the game' }
	},
	{
		name: 'PlaylistGenerator',
		dates: 'Oct 2025',
		description:
			'A Python tool that turns Last.fm listening history into Spotify playlists: it ranks tracks by play count, matches songs through Spotify search, and creates public playlists with OAuth.',
		technologies: ['Python', 'Requests', 'Spotipy', 'OAuth']
	},
	{
		name: 'Chess Engine',
		dates: 'Jul 2025',
		description:
			'A playable C# chess engine with legal move generation, position evaluation, and minimax search with alpha-beta pruning, integrated with an interactive Unity interface.',
		technologies: ['C#', 'Unity', 'Algorithms'],
		link: { href: 'https://github.com/bodenharris/Chess-Engine-Unity', label: 'View source' }
	},
	{
		name: 'Assembly Interpreter',
		dates: 'Mar 2025',
		description:
			'An interpreter in C that reads external assembly programs, parses instructions, maintains register state, and executes operations, tested on Linux to emulate low-level CPU state changes.',
		technologies: ['C', 'Linux', 'Systems'],
		link: { href: 'https://github.com/bodenharris/Assembly-Interpreter', label: 'View source' }
	},
	{
		name: 'Independent Games',
		dates: 'Nov 2024 – Present',
		description:
			'Puzzle games designed and shipped through iterative level design, gameplay scripting, and playtesting. Delicate Logic was selected for the 2025 Confounding Calendar puzzle-game contest.',
		technologies: ['Unity', 'PuzzleScript', 'Game Design'],
		link: { href: 'https://dollamenu.itch.io/', label: 'Play on itch.io' }
	},
	{
		name: 'Portfolio Website',
		dates: 'Dec 2024 – Present',
		description:
			'This site: a responsive portfolio presenting my projects, experience, and skills, with source managed in Git and continuous deployment through Vercel.',
		technologies: ['SvelteKit', 'Tailwind CSS', 'shadcn-svelte', 'Vercel'],
		link: { href: 'https://github.com/bodenharris/bodenharris-portfolio', label: 'View source' }
	}
];

export type Role = { org: string; title: string; location?: string; dates?: string; points: string[] };

export const experience: { label: string; roles: Role[] }[] = [
	{
		label: 'Work experience',
		roles: [
			{
				org: 'Colorworks Construction',
				title: 'Construction Worker / Assistant Contractor',
				location: 'Belmont, MA',
				dates: 'Summers 2024 – 2026',
				points: [
					'Advanced to assistant contractor in Summer 2026, supporting residential improvement project planning and execution, managing shift schedules, and communicating deadlines to clients.',
					'Worked with a small construction team on home repairs, deck construction, power washing, and painting projects.'
				]
			},
			{
				org: 'Trinktisch',
				title: 'Line Cook / Sous Chef',
				location: 'Belmont, MA',
				dates: 'Dec 2022 – Jan 2024',
				points: [
					'Trained and onboarded new employees on kitchen procedures, food preparation standards, and line operations.',
					'Collaborated on a four-person line team to coordinate food preparation and keep service efficient in a fast-paced kitchen.'
				]
			}
		]
	},
	{
		label: 'Leadership & activities',
		roles: [
			{
				org: 'UMass Game Dev Club',
				title: 'Development Specialist',
				dates: 'Sep 2026 – Present',
				points: [
					'Support members developing games across multiple engines, helping troubleshoot technical issues and identify implementation approaches.',
					'Curate and share club member projects on GitHub and itch.io to showcase student work and grow the club’s project portfolio.'
				]
			},
			{
				org: 'UMass Men’s Rugby',
				title: 'Member',
				points: ['Compete with the university’s club rugby program in the D1-AA league.']
			}
		]
	}
];

export const education = {
	school: 'University of Massachusetts Amherst',
	degree: 'B.S. in Computer Science · Commonwealth Honors College',
	meta: ['Expected May 2028', 'GPA 3.97 / 4.00'],
	coursework: ['Data Structures', 'C Programming', 'Web Programming', 'Machine Learning', 'Data Management']
};

export const skills = [
	{
		label: 'Languages',
		items: ['Python', 'C', 'C#', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS']
	},
	{
		label: 'Frameworks & tools',
		items: ['Svelte', 'SvelteKit', 'Tailwind CSS', 'Supabase', 'Unity', 'Docker', 'Git', 'Linux']
	}
];

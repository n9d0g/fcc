export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/about/beliefs": [4],
		"/about/leadership": [5],
		"/about/mission-vision": [6],
		"/birthdays": [7],
		"/give": [8],
		"/ministries": [9],
		"/ministries/men": [10],
		"/ministries/praise": [11],
		"/ministries/praise/schedule": [12],
		"/ministries/preteens": [13],
		"/ministries/women": [14],
		"/ministries/young-adults": [15],
		"/ministries/youth": [16],
		"/ps": [17],
		"/schedule": [19],
		"/sched": [18],
		"/sermons": [20],
		"/small-groups": [21],
		"/small-groups/macasaquit-bible-study": [22],
		"/small-groups/south-mississauga": [23],
		"/small-groups/university-bible-study": [24],
		"/small-groups/women-chasing-god": [25],
		"/small-groups/young-adults": [26],
		"/small-groups/young-adults/men": [27],
		"/small-groups/young-adults/women": [28],
		"/small-groups/yumul-bible-study": [29]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';
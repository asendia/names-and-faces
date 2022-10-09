import type { SlackProfile } from '$lib/profile';
import example from '$lib/data/example-slack.json';

export function parseData(dataStr: string) {
	const data: Array<{ profile: SlackProfile }> = JSON.parse(dataStr);
	data.forEach((d) => {
		if (
			typeof d.profile.display_name !== 'string' ||
			typeof d.profile.image_original !== 'string' ||
			typeof d.profile.real_name !== 'string' ||
			typeof d.profile.title !== 'string'
		) {
			throw new Error('Invalid slack profile lsit data');
		}
	});
	return data;
}
export function saveData(dataStr: string) {
	parseData(dataStr);
	window.localStorage.setItem('data', dataStr);
}
export function loadData() {
	const dataStr = window.localStorage.getItem('data');
	if (dataStr === null) return example;
	return parseData(dataStr);
}
export function removeData() {
	window.localStorage.removeItem('data');
}

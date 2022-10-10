export interface SlackProfile {
	title: string;
	real_name: string;
	display_name: string;
	image_original: string;
}

export function isSlackProfileEqual(p1: SlackProfile, p2: SlackProfile) {
	return (
		p1.title === p2.title &&
		p1.real_name === p2.real_name &&
		p1.display_name === p2.display_name &&
		p1.image_original === p2.image_original
	);
}

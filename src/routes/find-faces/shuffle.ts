// shuffle function that receives array and returns shuffled array
export function shuffle<T>(arr: T[]): T[] {
	let currentIndex = arr.length,
		temporaryValue,
		randomIndex;

	const array = [...arr];

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex); // random number between 0 and currentIndex
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex]; // store current element
		array[currentIndex] = array[randomIndex]; // replace current element with random element
		array[randomIndex] = temporaryValue; // replace random element with current element
	}

	return array;
}

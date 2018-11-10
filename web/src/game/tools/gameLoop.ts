export type GameLoopUpdate = (elapsedSeconds: number) => void;
export type GameLoopRender = () => void;

const MAX_UPDATES_PER_FRAME = 6;
const TARGET_INTERVAL = 1000 / 60;

export function gameLoop(update: GameLoopUpdate, render: GameLoopRender): void {
	// Timestamp denoting the last time the game loop ticked
	let processedTime = performance.now();

	requestAnimationFrame(function tick(): void {
		// Calculate elapsed time
		const now = performance.now();

		let updateCount = 0;
		while (now > processedTime) {
			processedTime += TARGET_INTERVAL;

			// Tick!
			update(TARGET_INTERVAL / 1000);

			// Limit the number of updates that can be done at once.
			// If the game loop is THIS far behind then it's essentially an unrecoverable state.
			updateCount++;
			if (updateCount >= MAX_UPDATES_PER_FRAME) {
				console.log('Game looped super delayed! Tab was probably frozen for a while.');
				processedTime = now;
				break;
			}
		}

		// Render only if an update has been performed.
		// There's no point of rendering the same state twice.
		if (updateCount > 0) {
			render();
		}

		// Queue next frame
		requestAnimationFrame(tick);
	})
}

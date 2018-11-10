import {GameConfig} from '../GameConfig.js';

export function initRenderingContext(): [HTMLCanvasElement, CanvasRenderingContext2D] {
	const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

	canvas.width = GameConfig.WIDTH;
	canvas.height = GameConfig.HEIGHT;

	const desiredRatio = canvas.width / canvas.height;

	function updateCanvasSize(): void {
		const browserWidth = window.innerWidth;
		const browserHeight = window.innerHeight;
		const browserRatio = browserWidth / browserHeight;

		let canvasWidth: number;
		let canvasHeight: number;

		if (desiredRatio > browserRatio) {
			// Browser is 'taller' than the canvas
			canvasWidth = browserWidth;
			canvasHeight = browserWidth / desiredRatio;
		} else {
			// Browser is 'wider' than the canvas
			canvasWidth = browserHeight * desiredRatio;
			canvasHeight = browserHeight;
		}

		const canvasLeft = browserWidth / 2 - canvasWidth / 2;
		const canvasTop = browserHeight / 2 - canvasHeight / 2;

		const style = canvas.style;
		style.left = canvasLeft + 'px';
		style.top = canvasTop + 'px';
		style.width = canvasWidth + 'px';
		style.height = canvasHeight + 'px';
	}

	// Call once to update the size immediately, otherwise the size of the
	// canvas will be wrong until the first time the browser is resized.
	updateCanvasSize();

	// Update the canvas size every time the browser is resized.
	window.addEventListener('resize', updateCanvasSize);

	return [canvas, canvas.getContext('2d')!];
}

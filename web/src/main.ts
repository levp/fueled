import {initRenderingContext} from './game/tools/initRenderingContext.js';
import {gameLoop} from './game/tools/gameLoop.js';
import {Game} from './game/Game.js';
import {PlayerInput} from './game/input/PlayerInput.js';
import {GameConfig} from './game/GameConfig.js';

main();

function main(): void {
	const [canvas, ctx] = initRenderingContext();

	const input = new PlayerInput(canvas);
	const game = new Game();

	gameLoop(elapsedSeconds => {
		// Update the game logic
		game.update(elapsedSeconds, input);

	}, () => {
		// Get rid of the previous frame
		ctx.fillStyle = GameConfig.CLEAR_COLOR;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// Draw the new state of the game
		game.draw(ctx);
	});
}



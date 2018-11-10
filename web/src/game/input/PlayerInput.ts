import {GameConfig} from '../GameConfig.js';

export class PlayerInput {
	private _mouseX: number = 0;
	private _mouseY: number = 0;
	private _lmb: boolean = false;

	constructor(canvas: HTMLCanvasElement) {
		canvas.addEventListener('mousemove', event => {
			const bounds = canvas.getBoundingClientRect();
			const scale = GameConfig.WIDTH / bounds.width;
			this._mouseX = (event.clientX - bounds.left) * scale;
			this._mouseY = (event.clientY - bounds.top) * scale;
		});

		canvas.addEventListener('mousedown', event => {
			if (event.button === 0) {
				this._lmb = true;
			}
		});
		document.body.addEventListener('mouseup', event => {
			if (event.button === 0) {
				this._lmb = false;
			}
		});
	}

	public get mouseX(): number {
		return this._mouseX;
	}

	public get mouseY(): number {
		return this._mouseY;
	}

	public get lmb(): boolean {
		return this._lmb;
	}
}

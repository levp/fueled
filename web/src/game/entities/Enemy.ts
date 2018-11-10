import {Entity} from './Entity.js';
import {GameConfig} from '../GameConfig.js';

export class Enemy extends Entity {
	private health: number = 5;
	private readonly vx: number;
	private readonly vy: number;

	constructor() {
		super();

		this.collisionRadius = 22;

		this.randomPositionOnEdgeOfArena();

		const dx = GameConfig.WIDTH / 2 - this.x;
		const dy = GameConfig.HEIGHT / 2 - this.y;
		const dist = Math.sqrt(dx * dx + dy * dy);

		this.vx = dx / dist * GameConfig.ENEMY_SPEED;
		this.vy = dy / dist * GameConfig.ENEMY_SPEED;
	}

	private randomPositionOnEdgeOfArena(): void {
		// Randomize spawn position, and do it with rolling just one number.

		const w = GameConfig.WIDTH;
		const h = GameConfig.HEIGHT;
		const w2 = w * 2;

		const r = Math.random() * (w2 + h * 2);

		if (r < w2) {
			this.x = r;
			if (r > w) {
				this.x -= w;
				this.y = h;
			}
		} else {
			this.y = r - w2;
			if (r > w2 + h) {
				this.y -= h;
				this.x = w;
			}
		}
	}

	public takeDamage(damage: number): void {
		if (!(damage > 0)) {
			console.error('Cannot take a non-positive amount of damage.');
			return;
		}

		this.health -= damage;
		if (this.health <= 0) {
			this.kill();
		}
	}

	public update(elapsedSeconds: number): void {
		this.x += this.vx * elapsedSeconds;
		this.y += this.vy * elapsedSeconds;
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = GameConfig.ENEMY_COLOR;
		ctx.beginPath();
		ctx.arc(this.x, this.y, GameConfig.ENEMY_RADIUS, 0, 2 * Math.PI);
		ctx.fill();
	}
}

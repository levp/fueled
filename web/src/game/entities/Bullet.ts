import {GameConfig} from '../GameConfig.js';
import {Entity} from './Entity.js';

export class Bullet extends Entity {
	private readonly vx: number;
	private readonly vy: number;
	private readonly rotation: number;

	constructor(spawnX: number, spawnY: number, movementAngle: number) {
		super();

		this.collisionRadius = 6;

		this.x = spawnX;
		this.y = spawnY;
		this.rotation = movementAngle;

		this.vx = GameConfig.BULLET_SPEED * Math.sin(-movementAngle);
		this.vy = GameConfig.BULLET_SPEED * Math.cos(movementAngle);
	}

	public update(elapsedSeconds: number): void {
		this.x += this.vx * elapsedSeconds;
		this.y += this.vy * elapsedSeconds;

		if (this.x < 0 || this.x > GameConfig.WIDTH || this.y < 0 || this.y > GameConfig.HEIGHT) {
			this.killQuietly();
		}
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);

		ctx.fillStyle = GameConfig.BULLET_COLOR;
		ctx.fillRect(-GameConfig.BULLET_WIDTH / 2, -GameConfig.BULLET_HEIGHT / 2, GameConfig.BULLET_WIDTH, GameConfig.BULLET_HEIGHT);

		ctx.rotate(-this.rotation);
		ctx.translate(-this.x, -this.y);
	}
}

import {GameConfig} from '../GameConfig.js';

export abstract class Entity {
	private alive: boolean = true;
	protected x: number = 0;
	protected y: number = 0;
	protected collisionRadius: number = 1;

	public isAlive(): boolean {
		return this.alive;
	}

	protected killQuietly(): void {
		this.alive = false;
	}

	public kill(): void {
		this.alive = false;
	}

	public abstract update(elapsedSeconds: number): void;

	public abstract draw(ctx: CanvasRenderingContext2D): void;

	public drawCollisionRadius(ctx: CanvasRenderingContext2D): void {
		ctx.strokeStyle = GameConfig.COLLISION_DEBUG_COLOR;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.collisionRadius, 0, 2 * Math.PI);
		ctx.stroke();
	}

	public static checkIfCollide(a: Entity, b: Entity): boolean {
		const dx = a.x - b.x;
		const dy = a.y - b.y;

		const distanceSquared = dx * dx + dy * dy;
		const touchDistance = a.collisionRadius + b.collisionRadius;

		return distanceSquared < touchDistance * touchDistance;
	}
}

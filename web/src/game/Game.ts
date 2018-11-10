import {PlayerInput} from './input/PlayerInput.js';
import {GameConfig} from './GameConfig.js';
import {Bullet} from './entities/Bullet.js';
import {EntityList} from './entities/EntityList.js';
import {Enemy} from './entities/Enemy.js';

/**
 * The main game class, manages the overall state of the game.
 */
export class Game {
	private playerX: number = 0;
	private playerY: number = 0;
	private rotation: number = 0;
	private attackTimer: number = 0;

	private readonly bullets = new EntityList<Bullet>();
	private readonly enemies = new EntityList<Enemy>();
	private enemySpawnTimer = 0;

	public update(elapsedSeconds: number, input: PlayerInput): void {
		const mx = input.mouseX;
		const my = input.mouseY;

		const dx = mx - GameConfig.WIDTH / 2;
		const dy = my - GameConfig.HEIGHT / 2;
		const distance = Math.sqrt(dx * dx + dy * dy);

		const margin = 4;
		this.playerX = GameConfig.WIDTH / 2 + dx / distance * (GameConfig.PLANET_RADIUS + margin);
		this.playerY = GameConfig.HEIGHT / 2 + dy / distance * (GameConfig.PLANET_RADIUS + margin);

		this.rotation = Math.atan2(-dx, dy);

		this.attackTimer -= elapsedSeconds;
		if (input.lmb && this.attackTimer < 0) {
			this.bullets.add(new Bullet(this.playerX, this.playerY, this.rotation));
			this.attackTimer = GameConfig.ATTACK_COOLDOWN;
		}

		this.enemySpawnTimer -= elapsedSeconds;
		if (this.enemySpawnTimer <= 0) {
			this.enemySpawnTimer += 2;
			this.enemies.add(new Enemy());
		}

		this.bullets.updateAll(elapsedSeconds);
		this.enemies.updateAll(elapsedSeconds);

		EntityList.collideAll(this.bullets, this.enemies, (bullet, enemy) => {
			bullet.kill();
			enemy.takeDamage(1);
		});
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		this.bullets.drawAll(ctx);
		this.enemies.drawAll(ctx);

		ctx.fillStyle = GameConfig.PLANET_COLOR;
		ctx.beginPath();
		ctx.arc(GameConfig.WIDTH / 2, GameConfig.HEIGHT / 2, GameConfig.PLANET_RADIUS, 0, 2 * Math.PI);
		ctx.fill();

		ctx.fillStyle = GameConfig.CANNON_COLOR;
		ctx.translate(this.playerX, this.playerY);
		ctx.rotate(this.rotation);
		ctx.fillRect(-GameConfig.CANNON_WIDTH / 2, -GameConfig.CANNON_HEIGHT / 2, GameConfig.CANNON_WIDTH, GameConfig.CANNON_HEIGHT);
		ctx.rotate(-this.rotation);
		ctx.translate(-this.playerX, -this.playerY);

		if (GameConfig.collisionDebug) {
			this.bullets.drawCollisionRadiusAll(ctx);
			this.enemies.drawCollisionRadiusAll(ctx);
		}
	}
}

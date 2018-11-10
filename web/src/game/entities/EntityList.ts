import {Entity} from './Entity.js';

export class EntityList<T extends Entity> {
	private readonly entities: T[] = [];

	public add(entity: T): void {
		if (!entity) {
			console.error('Attempted to add invalid entity.');
			return;
		}
		this.entities.push(entity);
	}

	public updateAll(elapsedSeconds: number): void {
		const list = this.entities;
		let i = 0;
		while (i < list.length) {
			const entity = list[i];
			entity.update(elapsedSeconds);
			if (entity.isAlive()) {
				i++;
			} else {
				list.splice(i, 1);
			}
		}
	}

	public drawAll(ctx: CanvasRenderingContext2D): void {
		const list = this.entities;
		for (let i = 0; i < list.length; i++) {
			list[i].draw(ctx);
		}
	}

	public drawCollisionRadiusAll(ctx: CanvasRenderingContext2D): void {
		const list = this.entities;
		for (let i = 0; i < list.length; i++) {
			list[i].drawCollisionRadius(ctx);
		}
	}

	public static collideAll<T1 extends Entity, T2 extends Entity>(
			first: EntityList<T1>,
			second: EntityList<T2>,
			collisionHandler: (a: T1, b: T2) => void
	): void {
		const firstList = first.entities;
		const secondList = second.entities;

		for (let i = 0; i < firstList.length; i++) {
			const a = firstList[i];

			for (let k = 0; k < secondList.length; k++) {
				if (!a.isAlive()) {
					break;
				}

				const b = secondList[k];
				if (!b.isAlive()) {
					continue;
				}

				if (Entity.checkIfCollide(a, b)) {
					collisionHandler(a, b);
				}
			}
		}
	}
}

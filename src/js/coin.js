import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Coin extends Actor {
    #collected;

    constructor(x, y) {
        super({
            width: Resources.Coin.width,
            height: Resources.Coin.height,
            pos: new Vector(x, y),
            collisionType: CollisionType.Passive,
            anchor: new Vector(0, 0)
        });
        this.name = "Coin";
        this.graphics.use(Resources.Coin.toSprite());
        this.scale = new Vector(0.5, 0.5);
        this.collider.useBoxCollider(this.width * this.scale.x, this.height * this.scale.y);
        this.#collected = false;
    }

    isCollected() {
        return this.#collected;
    }

    collect() {
        this.#collected = true;
        this.kill();
    }
}
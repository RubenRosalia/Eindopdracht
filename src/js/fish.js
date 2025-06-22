import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Fish extends Actor {
    #startX;
    #range;
    #speed;
    #direction;

    constructor(x, y) {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height,
            pos: new Vector(x, y),
            collisionType: CollisionType.Active,
            anchor: new Vector(0, 0),
        });
        this.graphics.use(Resources.Fish.toSprite());
        this.scale = new Vector(0.5, 0.5);
        this.name = "Fish";
        this.collider.useBoxCollider(this.width * this.scale.x, this.height * this.scale.y);

        this.#startX = x;
        this.#range = 100; 
        this.#speed = 60; 
        this.#direction = 1;
    }

    get direction() {
        return this.#direction;
    }

    onPreUpdate(engine, delta) {
        this.pos.x += this.#direction * this.#speed * (delta / 1000);

        if (this.pos.x > this.#startX + this.#range) {
            this.#direction = -1;
            this.graphics.flipHorizontal = false;
        }
        if (this.pos.x < this.#startX - this.#range) {
            this.#direction = 1;
            this.graphics.flipHorizontal = true;
        }
    }
}

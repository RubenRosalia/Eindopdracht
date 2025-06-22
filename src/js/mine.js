import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Mine extends Actor {
    constructor(x, y) {
        super({
            width: Resources.Mine.width,
            height: Resources.Mine.height,
            pos: new Vector(x, y),
            collisionType: CollisionType.Active,
            anchor: new Vector(0, 0)
        });
        this.graphics.use(Resources.Mine.toSprite());
        this.scale = new Vector(0.5, 0.5);
        this.name = "Mine";
        this.collider.useBoxCollider(this.width * this.scale.x, this.height * this.scale.y);

        // Movement settings
        this.startY = y;
        this.range = 300;
        this.speed = 1000;
        this.direction = 1; 
    }

    onPreUpdate(engine, delta) {
        // Move mine up and down.
        this.vel.y = this.direction * this.speed;

        // Reverse direction .
        if (this.pos.y > this.startY + this.range) {
            this.direction = -1;
        }
        if (this.pos.y < this.startY - this.range) {
            this.direction = 1;
        }
    }
}
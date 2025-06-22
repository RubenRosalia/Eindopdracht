import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'

export class Floor extends Actor {
    constructor(x = 0, y = 512) {
        super({
            width: 400,
            height: Resources.Floor.height,
            collisionType: CollisionType.Fixed,
            anchor: new Vector(0, 0)
        })
        this.graphics.use(Resources.Floor.toSprite())
        this.pos = new Vector(x, y)
    }
}
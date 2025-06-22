import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources'

export class Block extends Actor {
    constructor(x, y) {
        super({
            width: Resources.Block.width,
            height: Resources.Block.height,
            pos: new Vector(x, y),
            collisionType: CollisionType.Fixed,
            anchor: new Vector(0, 0)
        })
        this.graphics.use(Resources.Block.toSprite())
    }
}
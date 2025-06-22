import { Actor, Keys, Vector, CollisionType } from "excalibur"
import { Resources } from './resources'
import { Fish } from './fish'
import { Mine } from './mine'

export class Player extends Actor {
    #moveSpeed;
    #jumpForce;
    #lives;
    #score;
    #scoreCallback;

    constructor() {
        super({ 
            width: Resources.Player.width, 
            height: Resources.Player.height,
            pos: new Vector(200, 360),
            collisionType: CollisionType.Active,
            anchor: new Vector(0, 0)
        })
        this.name = "Player";
        this.body.mass = 1
        this.#moveSpeed = 500
        this.#jumpForce = 700
        this.#lives = 3;
        this.#score = 0;
        this.#scoreCallback = null;
        this.graphics.use(Resources.Player.toSprite())
        this.graphics.flipHorizontal = false
        this.scale = new Vector(0.5, 0.5)
        this.collider.useBoxCollider(this.width * this.scale.x, this.height * this.scale.y);
    }

    setScoreCallback(cb) {
        this.#scoreCallback = cb;
    }

    get score() {
        return this.#score;
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event, engine));
    }

    hitSomething(event, engine) {
        // Collision after result fish.
        if (event.other.owner instanceof Fish) {
            const fish = event.other.owner;
            const pushStrengthX = 800; 
            const pushStrengthY = -600;
            const knockbackDistance = 40;

            this.#lives--;
            console.log(`Player collided with fish! Lives left: ${this.#lives}`);

            if (fish.direction > 0) {
                this.body.applyLinearImpulse(new Vector(pushStrengthX, pushStrengthY));
                this.pos.x += knockbackDistance;
            } else {
                this.body.applyLinearImpulse(new Vector(-pushStrengthX, pushStrengthY));
                this.pos.x -= knockbackDistance; 
            }

            if (this.#lives <= 0) {
                engine.goToScene("gameover", true);
                console.log("No lives left. Game over!");
            }
        }
        
        // Collision after result Mine.
        if (event.other.owner instanceof Mine) {
            engine.goToScene("gameover", true);
            console.log("collide with mine.")
        }
        // Collision after result Coin.
        if (event.other.owner && event.other.owner.name === "Coin") {
            console.log("Coin collected!");
            event.other.owner.kill();
            this.#score++;
            if (this.#scoreCallback) this.#scoreCallback(this.#score);
        }
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.vel.y = -this.#jumpForce
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowLeft) || engine.input.keyboard.isHeld(Keys.A)) {
            this.vel.x = -this.#moveSpeed
            this.graphics.flipHorizontal = true
        } else if (engine.input.keyboard.isHeld(Keys.ArrowRight) || engine.input.keyboard.isHeld(Keys.D)) {
            this.vel.x = this.#moveSpeed
            this.graphics.flipHorizontal = false
        } else {
            this.vel.x = 0
        }

        if (this.pos.y > 600) {
            engine.goToScene("gameover", true);
            console.log("Fell ")
        }
    }
    
    reset() {
        this.pos = new Vector(200, 360);
        this.vel = new Vector(0, 0);
        this.#lives = 3; 
        this.#score = 0;
    }
}
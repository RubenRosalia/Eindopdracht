import { Scene, Vector, Label, Font, FontUnit, Color } from "excalibur";
import { Background } from "./background.js";
import { Floor } from "./floor.js";
import { Block } from "./block.js";
import { Player } from "./player.js";
import { Fish } from "./fish.js";
import { Mine } from "./mine.js";
import { Coin } from "./coin.js";

export class MainLevel extends Scene {
  onInitialize(engine) {
    this.add(new Background());
    this.score = 0;
    this.scoreLabel = new Label({
      text: `Score: ${this.score}`,
      pos: new Vector(20, 20),
      font: new Font({
        family: "Arial",
        size: 32,
        unit: FontUnit.Px,
        color: Color.Black,
        textAlign: "left",
        bold: true
      }),
      anchor: new Vector(0, 0)
    });
    this.add(this.scoreLabel);

    // this.youWonLabel = new Label({
    //   text: "You Won!",
    //   pos: new Vector(20, 100),
    //   font: new Font({
    //     family: "Arial",
    //     size: 48,
    //     unit: FontUnit.Px,
    //     color: Color.Red,
    //     textAlign: "left",
    //     bold: true
    //   }),
    //   anchor: new Vector(0, 0),
    //   visible: false
    // });
    // this.add(this.youWonLabel);

    this.add(new Floor(0, 550));
    this.add(new Floor(600, 550));
    this.add(new Block(400, 400));
    this.add(new Block(600, 300));
    this.add(new Fish(300, 500));
    this.add(new Mine(800, 100)); 
    this.add(new Coin(500, 500));   
    this.add(new Mine(540, 400));
    this.add(new Coin(800, 400));
    this.player = new Player();
    this.add(this.player);

    // Update player score.
    this.player.setScoreCallback((score) => {
      this.score = score;
      this.scoreLabel.text = `Score: ${this.score}`;
      if (this.score >= 2) {
        this.youWonLabel.visible = false;
        console.log("You won!");
      }
    });
  }

  onActivate() {
    if (this.player) {
      this.player.reset();
      this.score = 0;
      this.scoreLabel.text = `Score: ${this.score}`;
      if (this.youWonLabel) this.youWonLabel.visible = false;
    }
  }

  onPreUpdate(engine, delta) {
    super.onPreUpdate(engine, delta);
  }

  onPostUpdate(engine, delta) {
    super.onPostUpdate(engine, delta);
  }

  onCollisionStart(event) {
    super.onCollisionStart(event);
    if (event.other.owner && event.other.owner.name === "Coin") {
      console.log("Coin collected!");
      event.other.owner.kill();
      this.score++;
      if (this._scoreCallback) this._scoreCallback(this.score);
    }
  }

  onCollisionEnd(event) {
    super.onCollisionEnd(event);
  }
}
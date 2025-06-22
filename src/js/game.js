import "../css/style.css";
import { Actor, Engine, DisplayMode, SolverStrategy, Vector } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { Floor } from "./floor.js";
import { Block } from "./block.js";
import { GameOver } from "./gameover.js";
import { MainLevel } from "./mainlevel.js";

export class Game extends Engine {
  constructor() {
    super({
      width: 1000,
      height: 600,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
      physics: {
        solver: SolverStrategy.Arcade,
        // No gravity horizontal, yes to vertical (without player flys)
        gravity: new Vector(0, 1200),
      },
    });
    this.showDebug(true);
    this.add("gameover", new GameOver());
    this.add("level1", new MainLevel());
    this.start(ResourceLoader).then(() => this.goToScene("level1"));
  }
}

new Game();


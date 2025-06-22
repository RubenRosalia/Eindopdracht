import { Scene, Label, Color, Vector, Font, FontUnit } from "excalibur";

export class GameOver extends Scene {
  onInitialize(engine) {
    //Init game over text.
    const label = new Label({
      text: "Game Over",
      pos: new Vector(500, 250),
      font: new Font({
        family: "Arial",
        size: 48,
        unit: FontUnit.Px,
        color: Color.Black,
        textAlign: "center",
        bold: true
      }),
      anchor: new Vector(0.5, 0.5)
    });
    this.add(label);

    // Init start over button.
    const button = new Label({
      text: "Start Over",
      pos: new Vector(500, 350),
      font: new Font({
        family: "Arial",
        size: 32,
        unit: FontUnit.Px,
        color: Color.White,
        textAlign: "center",
        bold: true
      }),
      anchor: new Vector(0.5, 0.5),
      color: Color.Black
    });
    button.cursor = "pointer";
    this.add(button);

    button.on("pointerup", () => {
      engine.goToScene("level1", true);
    });
  }
}
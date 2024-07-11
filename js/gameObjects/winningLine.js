import config from "../configuration/config.js";
import Text from "../gameObjects/text.js";

export default class WinningLine extends Phaser.GameObjects.Graphics {
  constructor(scene, winningLineInfo, cellPositions, container) {
    super(scene);

    this.type = winningLineInfo.type;
    this.lineIndex = winningLineInfo.index;
    this.amount = winningLineInfo.amount;
    this.cellPositions = cellPositions;
    const color = this.type === "row" ? config.rowWinColor : config.columnWinColor;
    this.lineColor = color;
    this.lineWidth = 10;
    this.alpha = 0;
    this.amountText;
    this.drawLine();
    scene.add.existing(this);
    this.drawText();
    container.add(this);
    container.add(this.amountText)
  }

  drawLine() {
    this.calculatePoints();
    this.clear();
    this.lineStyle(this.lineWidth, this.lineColor);
    this.beginPath();
    this.moveTo(this.lineStartX, this.lineStartY);
    this.lineTo(this.lineEndX, this.lineEndY);
    this.closePath();
    this.strokePath();
  }

  drawText() {
    this.amountText = new Text(this.scene, this.midX, this.midY, this.amount.toString())
  }

  cancelText() {
    this.amountText.destroy();
  }

  createFlashingTween(duration = 500, repeat = 3, yoyo = true) {
    //da rivedere
    this.scene.tweens.add({
        targets: this.amountText,
        scale: 1.2,
        duration: duration / 2,
        yoyo: yoyo,
        repeat: repeat,
        ease: 'Cubic',
        onComplete: () => { this.cancelText() }
    });

    return this.scene.tweens.add({
      targets: [this],
      alpha: 1,
      duration: duration / 2,
      yoyo: yoyo,
      repeat: repeat,
      ease: 'Linear',
    });    
  }

  calculatePoints() {
    const isRow = this.type === 'row';
    const start = isRow ? this.lineIndex * config.columnCount : this.lineIndex;
    const end = isRow ? start + config.columnCount - 1 : this.lineIndex + (config.rowCount - 1) * config.columnCount;
    this.lineStartX = this.cellPositions[start].x
    this.lineStartY = this.cellPositions[start].y
    this.lineEndX = this.cellPositions[end].x
    this.lineEndY = this.cellPositions[end].y
    this.midX = (this.lineStartX + this.lineEndX) / 2;
    this.midY = (this.lineStartY + this.lineEndY) / 2;
  };
}
export default class Button extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, callback) {
        super(scene, x, y, texture);
        this.callback = callback;
        this.setInteractive({ cursor: 'pointer' })
            .on('pointerover', this.over, this)
            .on('pointerout', this.out, this)
            .on('pointerdown', this.down, this)
        scene.add.existing(this);
    }

    over() {
        this.setScale(1.1);
    }

    out() {
        this.setScale(1);
    }

    down() {
        if (this.scene.tweens.isTweening(this) || this.scene.gameLogic.gameState.getGameState() !== "idle") {
            return;
        }
        this.scene.tweens.chain({
            targets: this,
            tweens: [
                { y: this.y + 10, duration: 100 },
                { y: this.y, duration: 100 }
            ],
        });
        this.callback();
    }
}
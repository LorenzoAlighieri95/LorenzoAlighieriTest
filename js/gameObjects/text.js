export default class Text extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, fontSize = 80, maxWidth) {
        super(scene, x, y, text);
        scene.add.existing(this);
        this.fontSize = fontSize;
        this.maxWidth = maxWidth;
        this.setStyle();
    }

    setStyle() {
        this.setOrigin(0.5)
            .setAlign('center')
            .setFontFamily('BungeeSpice')
            .setFontSize(this.fontSize)
            .setShadow(4, 4, '#333333', 1);
    }

    setText(text) {
        if (this.maxWidth) 
            this.resizeWidth();
        super.setText(text);
    }

    resizeWidth() {
        if (this.width > this.maxWidth) {
            this.scaleX = this.maxWidth / this.width;
        }
    }
}
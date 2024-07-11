import config from "../configuration/config.js";

export default class Symbol {
    constructor(id, gridPosition, scene, container, x, y) {
        this.id = id;
        this.gridPosition = gridPosition;
        this.column = this.calculateSymbolColumn();
        this.row = this.calculateSymbolRow();
        this.scene = scene;
        this.image = scene.add.image(x, y, id.toString());
        this.container = container;
        this.container.add(this.image);
    }

    calculateSymbolColumn() {
        return this.gridPosition % config.columnCount;
    }

    getSymbolColumn() {
        return this.column;
    }

    calculateSymbolRow = () => {
        return Math.floor(this.gridPosition / config.columnCount);
    };

    getSymbolRow() {
        return this.row;
    }

    calculateFallDelay() {
        return config.baseColumnFallDelay + (config.columnFallDelayMultiplier * this.column)
    }

    getImage() {
        return this.image;
    }

    getId() {
        return this.id;
    }

    checkIfWinSymbol(winningLine) {
        return winningLine.symbolId == this.id && (
            (winningLine.type === 'row' && winningLine.index == this.row) ||
            (winningLine.type !== 'row' && winningLine.index == this.column)
        );
    }

    winAnim() {
        this.addSymbolConnect();
        this.createTween();
    }

    createTween(duration = 500, repeat = 3, yoyo = true) {
        const target = this.symbolConnect ? this.symbolConnect : this.image;
        return this.scene.tweens.add({
            targets: target,
            scale: 1.1,
            duration: duration / 2,
            yoyo: yoyo,
            repeat: repeat,
            ease: 'Linear',
            onComplete: () => { if (this.symbolConnect) this.symbolConnect.destroy(); }
        });
    }

    addSymbolConnect() {
        this.symbolConnect = this.scene.add.image(this.image.x, this.image.y, this.id.toString() + "_connect");
        this.container.add(this.symbolConnect)
    }
}
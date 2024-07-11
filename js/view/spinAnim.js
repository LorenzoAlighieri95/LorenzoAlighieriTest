import config from "../configuration/config.js";

export default class SpinAnim {
    constructor(newReels, symbols, symbolsPosition, scene) {
        this.newReels = newReels;
        this.symbols = symbols;
        this.symbolsPosition = symbolsPosition;
        this.scene = scene;
        this.animSymbols();
    }

    createFallingTween(object, targetY, delay) {
        return this.scene.tweens.add({
            targets: object,
            y: targetY,
            duration: config.fallDuration,
            ease: config.ease,
            delay: delay
        });
    }

    animSymbols() {
        if (this.symbols) {
            const animationPromises = this.symbols.map((symbol, i) => {
                const targetY = this.newReels ? this.symbolsPosition[i].y : config.symbolEndY;
                return this.animSingleSymbol(symbol, targetY);
            });
            this.checkEndSpinAnimation(animationPromises);
        }
    }

    animSingleSymbol(symbol, targetY) {
        return new Promise(resolve => {
            const delay = symbol.calculateFallDelay();
            const symbolImage = symbol.getImage();
            const tween = this.createFallingTween(symbolImage, targetY, delay);
            tween.on('complete', () => {
                if (!this.newReels) {
                    symbolImage.destroy();              
                }
                resolve();
            });
        });
    }

    async checkEndSpinAnimation(animationPromises) {
        try {
            await Promise.all(animationPromises);
            if (this.newReels) this.scene.gameLogic.spinEnd();
        } catch (error) {
            console.error("Error during animation:", error);
        }
    }
}
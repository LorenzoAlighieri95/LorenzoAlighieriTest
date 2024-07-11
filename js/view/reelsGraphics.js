import ReelsStructure from '../model/reelsStructure.js';
import config from "../configuration/config.js";
import Symbol from '../gameObjects/symbol.js';
import WinningLine from '../gameObjects/winningLine.js';
import SpinAnim from './spinAnim.js';
import Bonus from '../gameObjects/bonus.js';

export default class ReelsGraphics {
    constructor(scene) {
        this.scene = scene;
        this.reels = new ReelsStructure();
        this.symbolsPosition = this.reels.getCellPositions();
        this.symbols;
        this.reelsContainer = this.scene.add.container(0, 0);
    }

    getContainer() {
        return this.reelsContainer;
    }

    updateContainer() {
        const gridWidth = this.reels.getGridWidth();
        const gridHeight = this.reels.getGridHeight();
        const sceneWidth = this.scene.width;
        const sceneHeight = config.maxReelsHeight;
        const scaleWidth = sceneWidth < gridWidth ? sceneWidth / gridWidth : 1;
        const scaleHeight = sceneHeight < gridHeight ? sceneHeight / gridHeight : 1;
        const scale = Math.min(scaleWidth, scaleHeight);
        this.reelsContainer.width = gridWidth * scale;
        this.reelsContainer.height = gridHeight * scale;
        this.reelsContainer.x = sceneWidth / 2 - this.reelsContainer.width / 2 + (config.cellWidth / 2 * scale);
        this.reelsContainer.y = sceneHeight / 2 - this.reelsContainer.height / 2 + (config.cellHeight / 2 * scale);
        this.reelsContainer.scale = scale;
    }

    async animateWinningLine(winningLineInfo) {
        this.symbols.forEach((symbol) => {
            if (symbol.checkIfWinSymbol(winningLineInfo)) symbol.winAnim();
        });
        const winningLineGraphics = new WinningLine(this.scene, winningLineInfo, this.symbolsPosition, this.reelsContainer);
        const tweenLine = winningLineGraphics.createFlashingTween();
        await new Promise(resolve => {
            tweenLine.on('complete', () => {
                winningLineGraphics.clear();
                resolve();
            });
        });
    }

    async animateBonus(bonusId, win) {
        await new Promise(resolve => {
            //I've got the switch because you can create multiple bonus each one with his ID
            switch (bonusId) {
                default:
                    new Bonus(this.scene, this.symbols, resolve, win);
                    break;
            }
        });
    }

    createSymbols(symbolsArray, isDefaultConfig = false) {
        this.symbols = [];
        symbolsArray.forEach((symbol, i) => {
            const x = this.symbolsPosition[i].x;
            const y = isDefaultConfig ? this.symbolsPosition[i].y : config.symbolStartY;
            const symbolObject = new Symbol(symbol, i, this.scene, this.reelsContainer, x, y);
            this.symbols.push(symbolObject);
        })
    }

    spinAnimation(symbolsArray) {
        new SpinAnim(false, this.symbols, this.symbolsPosition, this.scene);
        this.createSymbols(symbolsArray);
        new SpinAnim(true, this.symbols, this.symbolsPosition, this.scene);
    }
}
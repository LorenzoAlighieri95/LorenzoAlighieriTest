import FakeServer from "../model/fakeServer.js";
import ReelsGraphics from "../view/reelsGraphics.js";
import GameState from "../controller/gameState.js";
import UI_info from "../view/UI_info.js";
import config from "../configuration/config.js";

export default class GameLogic {
    constructor(scene) {
        this.scene = scene;
        this.symbolsArray;
        this.reelsGraphics;
        this.bet = 10;
        this.winAmount;
        this.credits = 10000;
        this.fakeServer = new FakeServer();
        this.gameState = new GameState();
        this.UI_info = new UI_info(scene)
    }

    requestSymbolsArray() {
        return this.symbolsArray = this.fakeServer.createSymbolsArray();
    }

    start() {
        this.reelsGraphics = new ReelsGraphics(this.scene, this);
        const symbolsArray = this.requestSymbolsArray();
        this.reelsGraphics.createSymbols(symbolsArray, true);
        this.reelsGraphics.updateContainer();
        this.gameState.setGameState("idle");
    }

    changeBet(increment) {
        const index = config.bets.indexOf(this.bet);
        const nextIndex = increment ? (index + 1) % config.bets.length : (index - 1 + config.bets.length) % config.bets.length;
        this.bet = config.bets[nextIndex];
        this.UI_info.setBetValue(this.bet);
    }

    increaseBet() {
        this.changeBet(true);
    }

    decreaseBet() {
        this.changeBet(false);
    }

    changeSymbolsNumber() {
        this.reelsGraphics.getContainer().destroy();
        config.rowCount = Phaser.Math.Between(2, 50)
        config.columnCount = Phaser.Math.Between(2, 50);
        this.start();
    }

    spin() {
        this.credits -= this.bet;
        this.UI_info.setCreditsValue(this.credits);
        const symbolsArray = this.requestSymbolsArray();
        this.reelsGraphics.spinAnimation(symbolsArray);
        this.gameState.setGameState("spinning");
    }

    spinEnd() {
        const winningLines = this.fakeServer.checkWinningLines(this.bet);
        console.log("win: ", winningLines);
        if (winningLines) {
            this.checkWin(winningLines);
        } else {
            this.gameState.setGameState("idle");
        }
    }

    async checkWin(winningLines) {
        this.winAmount = 0;
        for (const winningLine of winningLines) {
            this.winAmount += winningLine.amount;
            this.UI_info.setWinValue(this.winAmount);
            if (!winningLine.bonusId) {
                this.gameState.setGameState("winningLine");
                await this.reelsGraphics.animateWinningLine(winningLine);
            } else {
                this.gameState.setGameState("bonus");
                await this.reelsGraphics.animateBonus(winningLine.bonusId, winningLine.amount);
            }
        }
        this.winningLinesEnd();
    }

    winningLinesEnd() {
        this.credits += this.winAmount;
        this.UI_info.setCreditsValue(this.credits);
        this.gameState.setGameState("idle");
    }
}
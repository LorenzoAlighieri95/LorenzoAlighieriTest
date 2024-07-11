import config from "../configuration/config.js";
import Text from "../gameObjects/text.js";
import Button from "../gameObjects/button.js";

export default class UI_info {
    constructor(scene) {
        this.scene = scene;
        this.betValue;
        this.winValue;
        this.creditsValue;

        this.createBox(config.UIBetX, config.UIBetY);
        this.createBox(config.UIWinX, config.UIWinY);
        this.createBox(config.UICreditsX, config.UICreditsY);

        this.betLabel = new Text(scene, config.UIBetX, config.UIBetY, "BET:", config.labelSize);
        this.winLabel = new Text(scene, config.UIWinX, config.UIWinY, "LAST WIN: ", config.labelSize);
        this.creditsLabel = new Text(scene, config.UICreditsX, config.UICreditsY, "CREDITS:", config.labelSize);

        this.betText = new Text(scene, config.UIBetX, config.UIBetY + config.labelOffsetY, "10", config.uiTextSize, config.UIBoxWidth);
        this.winText = new Text(scene, config.UIWinX, config.UIWinY + config.labelOffsetY, "", config.uiTextSize, config.UIBoxWidt);
        this.creditsText = new Text(scene, config.UICreditsX, config.UICreditsY + config.labelOffsetY, "10000", config.uiTextSize, config.UIBoxWidt);

        this.createButtons();
    }

    setBetValue(betValue) {
        this.betValue = betValue;
        this.betText.setText(this.betValue);
    }

    setWinValue(winValue) {
        this.winValue = winValue;
        this.winText.setText(this.winValue);
    }

    setCreditsValue(creditsValue) {
        this.creditsValue = creditsValue;
        this.creditsText.setText(this.creditsValue);
    }

    updateAllTexts() {
        this.betText.setText(this.betValue);
        this.winText.setText(this.winValue);
        this.creditsText.setText(this.creditsValue);
    }

    createBox(x, y) {
        this.scene.graphics = this.scene.add.graphics();
        this.scene.graphics.fillStyle(config.purple, 0.6)
            .fillRoundedRect(x - config.UIBoxWidth / 2, y - config.UIBoxHeight / 2 + config.UIBoxOffsetY, config.UIBoxWidth, config.UIBoxHeight, 32);
    }

    addButton(callback, x, y, name) {
        return new Button(this.scene, x, y, name, callback);
    }

    createButtons() {
        const callbackPlay = () => this.scene.gameLogic.spin();
        this.addButton(callbackPlay, this.scene.width / 2, config.buttonY, "play");
        const callbackPlus = () => this.scene.gameLogic.increaseBet();
        this.addButton(callbackPlus, config.UIBetX + config.UIBoxWidth / 2.1, config.UIBetY + config.UIBoxHeight / 4, "plus");
        const callbackMinus = () => this.scene.gameLogic.decreaseBet();
        this.addButton(callbackMinus, config.UIBetX - config.UIBoxWidth / 2.1, config.UIBetY + config.UIBoxHeight / 4, "minus");
        const callbackSettings = () => this.scene.gameLogic.changeSymbolsNumber();
        this.addButton(callbackSettings, this.scene.width - 50, config.UIBetY + config.UIBoxHeight / 4, "refresh");
    }
}
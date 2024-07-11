import config from "../configuration/config.js";
import Text from "./text.js";
// I could have put anything in here, only limitation is to call this.endBonus to make the game continue

export default class Bonus {
    constructor(scene, symbols, endBonus, winAmount) {
        this.scene = scene;
        this.symbols = symbols;
        this.endBonus = endBonus;
        this.winAmount = winAmount;
        this.bonusSymbolAnim()
    }

    bonusSymbolAnim() {
        let tween;
        this.symbols.forEach(symbol => {
            if (config.symbolsBonusId.includes(symbol.getId().toString())) {
                tween = this.createTween(symbol.getImage());
            }
        });
        this.scene.time.delayedCall(tween.duration, () => {
            this.execBonus();
        });
    }

    createTween(target) {
        return this.scene.tweens.add({
            targets: target,
            angle: 720,
            duration: 1500,
            repeat: 0,
            ease: 'circ.inout'
        });
    }

    execBonus() {
        const bonusbg = this.scene.add.rectangle(
            this.scene.width / 2,
            this.scene.height / 2,
            this.scene.width,
            this.scene.height,
            config.purple,
            0.7
        ).setOrigin(0.5);
        const text = new Text(this.scene, this.scene.width / 2, this.scene.height / 2, "BONUS WIN: " + this.winAmount.toString());
        this.scene.time.delayedCall(2000, () => {
            bonusbg.destroy();
            text.destroy();
            this.endBonus();
        });
    }
}
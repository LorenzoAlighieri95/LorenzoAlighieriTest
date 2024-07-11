import { loader } from '../utilities/loader.js';
import GameLogic from '../controller/gameLogic.js';

const sceneConfig = {
    pack: {
        files: [{
            type: 'plugin',
            key: 'rexwebfontloaderplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
            start: true
        }]
    }
};

export default class MyScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    preload() {
        loader(this);
    }

    create() {
        document.getElementById("loading").style.display = "none";
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.background();
        this.gameLogic = new GameLogic(this);
        this.gameLogic.start();
    }

    background() {
        return this.add.image(0, 0, "bg")
            .setOrigin(0, 0)
            .setDisplaySize(this.width, this.height);
    }


    update() {

    }

}
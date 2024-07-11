
import MyScene from './view/scene.js';
import config from './configuration/config.js';

export function init() {
	const phaserConfig = {
		type: Phaser.AUTO,
		physics: {
			default: 'arcade',
		},
		scene: MyScene,
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: config.gameWidth,
			height: config.gameHeight
		}
	};
	const game = new Phaser.Game(phaserConfig);
}
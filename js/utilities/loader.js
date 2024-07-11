import config from "../configuration/config.js";

export function loader(scene) {
    for (let i = 0; i < config.nSymbols; i++) {
        try {
            scene.load.image(`${i}`, `/assets/symbols/${i}.png`);
            scene.load.image(`${i}_connect`, `/assets/symbols/${i}_connect.png`);
        } catch (e) {
            console.log(e)
        }
    }
    scene.load.image("play", "/assets/play.png");
    scene.load.image("plus", "/assets/plus.png");
    scene.load.image("minus", "/assets/minus.png");
    scene.load.image("refresh", "/assets/refresh.png");
    scene.load.image("bg", "/assets/bg.png");
    loadPlugins(scene);
}

function loadPlugins(scene) {
    scene.plugins.get('rexwebfontloaderplugin').addToScene(scene);
    const pluginConfig = {
        google: { families: ['BungeeSpice', "Overlock"] }
    };
    scene.load.rexWebFont(pluginConfig);
}

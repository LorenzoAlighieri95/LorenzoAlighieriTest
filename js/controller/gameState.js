import config from "../configuration/config.js";

export default class GameState {
    constructor() {
        this.state;
    }

    getGameState() {
        return this.state;
    }

    setGameState(state) {
        if (config.gameStates.includes(state) && state !== this.state) {
            this.state = state;
            console.log("game state: ", this.state)
        }
    }
}
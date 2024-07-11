import config from "../configuration/config.js";

export default class ReelsStructure {
    constructor() {
        this.gridWidth;
        this.gridHeight;
        this.calculateGridDimension();
        this.cellPositions = this.generateCellPositions();
    }

    generateCellPositions() {
        return Array.from(
            { length: config.rowCount * config.columnCount },
            (_, index) => {
                const row = Math.floor(index / config.columnCount);
                const col = index % config.columnCount;
                return {
                    x:  col * config.cellWidth,
                    y: row * config.cellHeight,
                };
            }
        );
    }

    getCellPositions() {
        return this.cellPositions;
    }

    calculateGridDimension() {
        this.gridWidth = config.columnCount * config.cellWidth;
        this.gridHeight = config.rowCount * config.cellHeight;
    }

    getGridWidth() {
        return this.gridWidth;
    }

    getGridHeight() {
        return this.gridHeight;
    }
}
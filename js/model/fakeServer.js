import config from "../configuration/config.js";

export default class FakeServer {
    constructor() {
        this.symbolsArray;
    }

    createSymbolsArray(duplicateProbability = 0.2) {
        const nSymbols = config.rowCount * config.columnCount;
        const indices = Array.from({ length: nSymbols }, () => Math.floor(Math.random() * config.nSymbols));
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if (Math.random() < duplicateProbability) {
                indices[i] = indices[j];
            } else {
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
        }
        this.symbolsArray = indices;
        return this.symbolsArray;
    }
    
    checkWinningLines(bet) {
        const { rowCount: rows, columnCount: cols, nSymbolsToWin } = config;
        const symbols = this.symbolsArray;
        const winningLines = [];

        const checkLine = (lineSymbols) => {
            const symbolCounts = lineSymbols.reduce((counts, symbol) => ({ ...counts, [symbol]: (counts[symbol] || 0) + 1 }), {});
            const winningSymbol = Object.entries(symbolCounts).find(([symbol, count]) => count >= nSymbolsToWin);
            if (winningSymbol) {
                if (config.symbolsBonusId.includes(winningSymbol[0])) {
                    return { bonusId: winningSymbol[0] }
                }
                return { symbolId: winningSymbol[0] }
            }
            return null;
        };

        Array.from({ length: rows }).forEach((_, row) => {
            const lineSymbols = symbols.slice(row * cols, (row + 1) * cols);
            const winningSymbol = checkLine(lineSymbols);
            if (winningSymbol) winningLines.push({
                type: 'row', index: row, ...winningSymbol, amount: Phaser.Math.Between(1, 1000) * bet
            });
        });

        Array.from({ length: cols }).forEach((_, col) => {
            const colSymbols = Array.from({ length: rows }, (_, row) => symbols[row * cols + col]);
            const winningSymbol = checkLine(colSymbols);
            if (winningSymbol) winningLines.push({ 
                type: 'col', index: col, ...winningSymbol, amount: Phaser.Math.Between(1, 1000) * bet 
            });
        });

        return winningLines.length ? winningLines : null;
    }
}
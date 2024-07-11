const config = {
    gameWidth: 1920,
    gameHeight: 1080,
    columnCount: 5,
    rowCount: 3,
    cellWidth: 220,
    cellHeight: 220,
    maxReelsHeight: 720,
    nSymbols: 18,
    bets: [10, 20, 50, 100, 250, 500],
    symbolsBonusId: ['3'],
    baseColumnFallDelay: 100,
    columnFallDelayMultiplier: 100,
    fallDuration: 400,
    ease: 'back.inout',
    symbolStartY: -1080,
    symbolEndY: 1080 * 2,
    buttonY: 795,
    nSymbolsToWin: 3,
    rowWinColor: 0xFF00FF,
    columnWinColor: 0x00CEC8,
    gameStates: ["idle", "spinning", "winningLine", "bonus"],
    UIBetX: 520,
    UIBetY: 935,
    UICreditsX: 960,
    UICreditsY: 935,
    UIWinX: 1400,
    UIWinY: 935,
    labelOffsetY: 55,
    labelSize: 35,
    uiTextSize: 45,
    UIBoxWidth: 210,
    UIBoxHeight: 130,
    UIBoxOffsetY: 35,
    purple:0x480057
};

export default config;
class GameState {
    constructor() {
        this.selectedId = null;
        this.lastHighlightedSquare = null;
    }

    setSelectedId(id) {
        this.selectedId = id;
    }

    getSelectedId() {
        return this.selectedId;
    }

    setLastHighlightedSquare(square) {
        this.lastHighlightedSquare = square;
    }

    getLastHighlightedSquare() {
        return this.lastHighlightedSquare;
    }

}

export const gameState = new GameState();
export class GameState {
    constructor() {
        this.selectedId = null;
        this.pieceSelected = null;
        this.lastHighlightedSquare = null;
    }

    setSelectedId(id) {
        this.selectedId = id;
    }

    getSelectedId() {
        return this.selectedId;
    }

    setPieceSelected(piece) {
        this.pieceSelected = piece;
    }

    getPieceSelected() {
        return this.pieceSelected;
    }

    setLastHighlightedSquare(square) {
        this.lastHighlightedSquare = square;
    }

    getLastHighlightedSquare() {
        return this.lastHighlightedSquare;
    }

}
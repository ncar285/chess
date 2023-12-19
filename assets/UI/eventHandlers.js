import { selectSquare, unSelectSquare, showMovePossibilities, showTakePossibilities, hideMovePossibilities } from "./boardVisuals";

export function addDragEventsToPiece(piece, pieceObj) {

    piece.addEventListener('mousedown', startDrag, false);
    piece.addEventListener('touchstart', startDrag, false);

    piece.addEventListener('click', function(event) {
        unSelectSquare();
        selectSquare(piece, pieceObj);
    });

    piece.addEventListener('dragstart', function(event) {
        if (!this.parentNode.classList.contains('selected')) { // Check if the piece is not already selected
            unSelectSquare();
            selectSquare(piece, pieceObj);
            gameState.setSelectedId(this.parentNode.id);
        }
    });

    piece.addEventListener('dragend', function(event) {
        this.style.opacity = '1'; // Show the piece again when the drag ends
        document.body.style.cursor = ''; 

        const validOptions = pieceObj.getMoves().options;
        const validTakeOptions = pieceObj.getMoves().takeOptions;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        if (!elemBelow.classList.contains('board-square')) {
            elemBelow = elemBelow.parentNode; // Update to the parent (chess square)
        }

        // Update the piece's position in game state
        if (validOptions.has(elemBelow.id) || validTakeOptions.has(elemBelow.id)){
            const [startSquare, endSquare] = [gameState.getSelectedId(), elemBelow.id];
            playMove(startSquare, endSquare, pieceObj);
        }

        unSelectSquare();
        if (lastHighlightedSquare) {
            lastHighlightedSquare.classList.remove('highlight');
        }
        
    });
}
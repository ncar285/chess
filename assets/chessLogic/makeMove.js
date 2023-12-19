import { unSelectSquare } from "../UI/pieceSelection.js";
import { updateBoard } from "../UI/updateBoard.js";

export function playMoveIfValid(event, pieceObj){
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
    // if (lastHighlightedSquare) {
    //     lastHighlightedSquare.classList.remove('highlight');
    // }
}

function playMove(startSquare, endSquare, pieceObj){
    const startPos = idToPos(startSquare);
    const endPos = idToPos(endSquare);
    gameBoard.movePiece(startPos, endPos, pieceObj);
    updateBoard(startSquare, endSquare);
    gameState.setSelectedId(null);
}
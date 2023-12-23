import { gameState } from "../chessLogic/gameState.js";
import { showMovePossibilities, showTakePossibilities, hideMovePossibilities } from "./movePreviews.js";

export function selectSquare(piece, pieceObj){
    const validOptions = pieceObj.getMoves().options;
    const validTakeOptions = pieceObj.getMoves().takeOptions;
    const currentId = piece.parentNode.id;
    if (gameState.getSelectedId() === currentId) {
        gameState.setSelectedId(null);
    } else {
        gameState.setSelectedId(currentId);
        document.getElementById(currentId).classList.add('selected');
        showMovePossibilities(validOptions);
        showTakePossibilities(validTakeOptions);
    }
}

export function unSelectSquare(){
    const selected = document.querySelectorAll('.selected');
    selected.forEach(selected => selected.classList.remove('selected'));
    hideMovePossibilities();
    gameState.setSelectedId(null);
}

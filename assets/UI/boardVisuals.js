import { gameState } from "../chessLogic/gameState";

export function selectSquare(piece, pieceObj){
    const validOptions = pieceObj.getMoves().options;
    const validTakeOptions = pieceObj.getMoves().takeOptions;
    const currentId = piece.parentNode.id;
    if (selectedId === currentId) {
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
    gameState.setSelectedId(currentId);
}


export function showMovePossibilities(validMoves){
    validMoves.forEach((squareId)=>{
        const suggestion = document.createElement('div');
        suggestion.className = 'suggested-square';
        const squareElement = document.getElementById(squareId);
        squareElement.appendChild(suggestion);
    })
}

export function showTakePossibilities(validTakes){
    validTakes.forEach((squareId)=>{
        const suggestion = document.createElement('div');
        suggestion.className = 'suggested-capture';
        const squareElement = document.getElementById(squareId);
        squareElement.appendChild(suggestion);
    })
}

export function hideMovePossibilities() {
    const suggestions = document.querySelectorAll('.suggested-square, .suggested-capture');
    suggestions.forEach(suggestion => {
        suggestion.parentNode.removeChild(suggestion);
    });
}
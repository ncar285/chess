import { Board } from './chessLogic/board.js';
import { Pawn } from './chessLogic/pawn.js'; 
// import { idToPos } from './chessLogic/utils.js';
// import { highlightBelow } from './UI/pieceMovement.js';
import { drawChessBoard } from './UI/drawBoard.js';
// import { gameBoard } from './chessLogic/board.js';
// import { gameState } from './chessLogic/gameState.js'; 

window.Pawn = Pawn;

export const gameBoard = new Board();


document.addEventListener("DOMContentLoaded", function() {
    if (document.body.classList.contains('is-preload')) {
        document.body.classList.remove('is-preload');
    }

    drawChessBoard(gameBoard);


});

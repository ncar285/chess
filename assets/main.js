import { Board } from './chessLogic/board.js';
import { Pawn } from './chessLogic/pawn.js'; 
import { idToPos } from './chessLogic/utils.js';
import { highlightBelow } from './UI/pieceMovement.js';
import { drawChessBoard } from './UI/drawBoard.js';
import { gameState } from './chessLogic/gameState.js'; 

window.Pawn = Pawn;

const gameBoard = new Board();


document.addEventListener("DOMContentLoaded", function() {
    if (document.body.classList.contains('is-preload')) {
        document.body.classList.remove('is-preload');
    }

    drawChessBoard(gameBoard);


});

// Add a global dragover listener to the chess board
document.querySelector('.chess-board').addEventListener('dragover', function(event) {
    event.preventDefault(); // Prevent default to allow dropping
    highlightBelow(event);
});

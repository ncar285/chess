import { Board } from './chessLogic/board.js';
import { Pawn } from './chessLogic/pawn.js'; 
import { drawChessBoard } from '../src/Utils/drawBoard.js';

window.Pawn = Pawn;

export const gameBoard = new Board();


document.addEventListener("DOMContentLoaded", function() {
    if (document.body.classList.contains('is-preload')) {
        document.body.classList.remove('is-preload');
    }

    drawChessBoard(gameBoard);


});

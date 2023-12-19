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

function playMove(startSquare, endSquare, pieceObj){
    const startPos = idToPos(startSquare);
    const endPos = idToPos(endSquare);
    gameBoard.movePiece(startPos, endPos, pieceObj);
    updatePiecesOnDOM(startSquare, endSquare);
    gameState.setSelectedId(null);
}

function updatePiecesOnDOM(startSquare, endSquare) {
    // debugger;
    // Get the DOM elements for the start and end squares
    const startSquareElement = document.getElementById(startSquare);
    const endSquareElement = document.getElementById(endSquare);

    // Find the image element within the start square
    const imageElement = startSquareElement.querySelector('img');

    // If an image is found in the start square, remove it
    if (imageElement) {
        startSquareElement.removeChild(imageElement);
    }

    // Check if there's already an image in the end square, remove it
    const existingImageElement = endSquareElement.querySelector('img');
    if (existingImageElement) {
        endSquareElement.removeChild(existingImageElement);
    }

    // Append the image element to the end square
    endSquareElement.appendChild(imageElement);
}
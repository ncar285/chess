import { Board } from './chessLogic/board.js';
import { Pawn } from './chessLogic/pawn.js'; 
import { posToId, idToPos } from './chessLogic/utils.js';
import { startDrag, highlightBelow } from './UI/pieceMovement.js';
import { drawChessBoard } from './UI/drawBoard.js';

window.Pawn = Pawn;

const gameBoard = new Board();

document.addEventListener("DOMContentLoaded", function() {
    if (document.body.classList.contains('is-preload')) {
        document.body.classList.remove('is-preload');
    }

    drawChessBoard();

});

// Add a global dragover listener to the chess board
document.querySelector('.chess-board').addEventListener('dragover', function(event) {
    event.preventDefault(); // Prevent default to allow dropping
    highlightBelow(event);
});

let selectedId = null;
let pieceSelected = null;
let lastHighlightedSquare = null;

export function addDragEventsToPiece(piece, pieceObj) {

    piece.addEventListener('mousedown', startDrag, false);
    piece.addEventListener('touchstart', startDrag, false);

    piece.addEventListener('click', function(event) {
        unSelectSquare();
        selectSquare(piece, pieceObj);
    });

    piece.addEventListener('dragstart', function(event) {
        if (!this.parentNode.classList.contains('selected')) { // Check if the piece is not already selected
            unSelectSquare(selectedId);
            selectSquare(piece, pieceObj);
            selectedId = this.parentNode.id;
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
            const [startSquare, endSquare] = [selectedId, elemBelow.id];
            playMove(startSquare, endSquare, pieceObj);
        }

        unSelectSquare();
        if (lastHighlightedSquare) {
            lastHighlightedSquare.classList.remove('highlight');
        }
        
    });
}


function selectSquare(piece, pieceObj){
    const validOptions = pieceObj.getMoves().options;
    const validTakeOptions = pieceObj.getMoves().takeOptions;
    const currentId = piece.parentNode.id;
    if (selectedId === currentId) {
        pieceSelected = false; // if current selection is reclicked
        selectedId = null;
    } else {
        selectedId = currentId;
        document.getElementById(selectedId).classList.add('selected');
        showMovePossibilities(validOptions);
        showTakePossibilities(validTakeOptions);
    }
}

function unSelectSquare(){
    const selected = document.querySelectorAll('.selected');
    selected.forEach(selected => selected.classList.remove('selected'));
    hideMovePossibilities();
    pieceSelected = false; 
    selectedId = null;
}


function showMovePossibilities(validMoves){
    validMoves.forEach((squareId)=>{
        const suggestion = document.createElement('div');
        suggestion.className = 'suggested-square';
        const squareElement = document.getElementById(squareId);
        squareElement.appendChild(suggestion);
    })
}

function showTakePossibilities(validTakes){
    validTakes.forEach((squareId)=>{
        const suggestion = document.createElement('div');
        suggestion.className = 'suggested-capture';
        const squareElement = document.getElementById(squareId);
        squareElement.appendChild(suggestion);
    })
}

function hideMovePossibilities() {
    const suggestions = document.querySelectorAll('.suggested-square, .suggested-capture');
    suggestions.forEach(suggestion => {
        suggestion.parentNode.removeChild(suggestion);
    });
}

function playMove(startSquare, endSquare, pieceObj){
    const startPos = idToPos(startSquare);
    const endPos = idToPos(endSquare);
    gameBoard.movePiece(startPos, endPos, pieceObj);
    updatePiecesOnDOM(startSquare, endSquare);
    selectedId = null;
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
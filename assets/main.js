import { Board } from './chessLogic/board.js';
import { Pawn } from './chessLogic/pawn.js'; 
import { posToId, idToPos } from './chessLogic/utils.js';
import { startDrag } from './UI/pieceMovement.js';

window.Pawn = Pawn;

const gameBoard = new Board();

document.addEventListener("DOMContentLoaded", function() {
    if (document.body.classList.contains('is-preload')) {
        document.body.classList.remove('is-preload');
    }

    setupChessBoard();

    renderPiecesOnDOM(gameBoard);

});

function addSquareLabels(square, pos){
    const [file,rank] =  pos;
    if (file === "a") {
        const rankLabel = document.createElement('div');
        rankLabel.className = 'rank square-label';
        rankLabel.innerText = `${rank}`;
        square.appendChild(rankLabel);
    } 
    if (rank === 1) {
        const fileLabel = document.createElement('div');
        fileLabel.className = 'file square-label';
        fileLabel.innerText = `${file}`;
        square.appendChild(fileLabel);
    }
}

function setupChessBoard(){
    const board = document.querySelector('.chess-board');
    let color = "brown";
    for (let a = 0 ; a  < 8 ; a++ ){
        const row = document.createElement('div');
        const rank = a + 1;
        row.id = `rank-${rank}`;
        row.className = `board-row ${a+1}`;
        board.prepend(row);
        for (let b = 0 ; b  < 8 ; b++ ){
            const square = document.createElement('div');
            const charCode = 'a'.charCodeAt(0) + b;
            const file = String.fromCharCode(charCode)
            square.id = `${rank}-${file}`;
            square.className = `board-square ${color}`;
            addSquareLabels(square, [file,rank]);
            row.appendChild(square);
            color = (color === "brown") ? "white" : "brown";
        }
        color = (color === "brown") ? "white" : "brown";
    }
}

function renderPiecesOnDOM(gameBoard){

    const board = gameBoard.getBoard();

    board.forEach((row, a)=>{
        row.forEach((_, b) => {
            const pos = [a,b];
            const squareId = posToId([a,b])
            const squareElement = document.getElementById(squareId);
            const piece = document.createElement('img');
            const pieceObj = gameBoard.getPiece(pos);

            if (pieceObj){
                let name = "";
                name += (pieceObj.getColor() === "white") ? "w_" : "b_";
                name += pieceObj.getType();
                const source = `./images/pieces/${name}.png`;
                piece.src = source;
                piece.className = "chess-piece";
                squareElement.appendChild(piece);

                // Add event listeners to this piece
                addDragEventsToPiece(piece, pieceObj);
            }

        })
    })

}

let selectedId = null;
let pieceSelected = null;
let lastHighlightedSquare = null;

function addDragEventsToPiece(piece, pieceObj) {

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
        highlightBelow(event, this);

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

// Add a global dragover listener to the chess board
document.querySelector('.chess-board').addEventListener('dragover', function(event) {
    event.preventDefault(); // Prevent default to allow dropping
    highlightBelow(event);
});

function highlightBelow(event) {
    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    if (elemBelow && elemBelow.classList.contains('board-square')) {
        if (lastHighlightedSquare && lastHighlightedSquare !== elemBelow) {
            if (lastHighlightedSquare) {
                lastHighlightedSquare.classList.remove('highlight');
            }
        }
        if (elemBelow) {
            elemBelow.classList.add('highlight');
            lastHighlightedSquare = elemBelow;
        }
    }
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
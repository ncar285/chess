import { selectSquare, unSelectSquare } from "./pieceSelection.js";
import { gameState } from "../chessLogic/gameState.js";
import { playMoveIfValid } from "../chessLogic/makeMove.js";
import { gameBoard } from "../../assets/main.js";
import { idToPos } from "../chessLogic/utils.js";

let lastHighlightedSquare = null;

export function startDrag(event, piece, pieceObj) {
    // Prevent default behavior for images on mobile
    event.preventDefault();


    // Create a clone of the piece for visual dragging
    const clone = piece.cloneNode(true);
    clone.style.position = 'absolute';
    
    clone.style.zIndex = 1000;
    document.body.appendChild(clone);

    // Handle the coordinates for both touch and mouse events
    let x, y;
    if (event.type === 'touchstart' && event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }

    highlightBelow(x, y, clone);

    // debugger

    // select or unselect the square
    const square = findChessSquareFromCoordinates(x,y, clone);
    if (square.id === gameState.getSelectedId()){
        unSelectSquare();
    } else {
        unSelectSquare();
        selectSquare(piece, pieceObj);
    }
    


    // Calculate the width of the piece based on the viewport and chess board settings
    const chessBoardWidth = document.querySelector('.chess-board').clientWidth;
    const squareWidth = chessBoardWidth / 8; // There are 8 squares in a row
    const pieceWidth = squareWidth * 0.65; // 65% of the square's width

    clone.style.width = `${pieceWidth}px`;
    clone.style.height = 'auto'; // Maintain aspect ratio

    // Hide the original piece
    piece.style.visibility = 'hidden';

    // Position the clone under the cursor
    moveAt(x, y);

    // Listeners for moving and dropping the piece
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', endDrag, false);
    document.addEventListener('touchmove', onDrag, false); // For mobile
    document.addEventListener('touchend', endDrag, false); // For mobile

    function moveAt(pageX, pageY) {
        clone.style.left = pageX - clone.offsetWidth / 2 + 'px';
        clone.style.top = pageY  + 'px';
    }

    let lastKnownX = 0;
    let lastKnownY = 0;
    // const startSquare = document.getElementById(gameState.getSelectedId());
    const startSquare = square;

    function onDrag(event) {
        // Check if the event is a touch event and extract the first touch coordinates
        if (event.touches) {
            lastKnownX = event.touches[0].clientX;
            lastKnownY = event.touches[0].clientY;
        } else {
            lastKnownX = event.clientX;
            lastKnownY = event.clientY;
        }

        moveAt(lastKnownX, lastKnownY);
        highlightBelow(lastKnownX, lastKnownY, clone);

    }

    function endDrag() {

        const dropSquare = lastHighlightedSquare;

        // Remove the clone and show the original piece
        piece.style.visibility = 'visible';
        clone.remove();

        // Remove event listeners
        document.removeEventListener('mousemove', onDrag, false);
        document.removeEventListener('mouseup', endDrag, false);
        document.removeEventListener('touchmove', onDrag, false);
        document.removeEventListener('touchend', endDrag, false);
        
        if (dropSquare !== null && dropSquare.id !== startSquare.id){
            playMoveIfValid(pieceObj, startSquare, dropSquare)
        }

        // Reset the highlight on the board
        if (lastHighlightedSquare) {
            lastHighlightedSquare.classList.remove('highlight');
            lastHighlightedSquare = null;
        }

    }
}

function highlightBelow(x, y, clone) {
    const square = findChessSquareFromCoordinates(x,y, clone);
    if (square && square.classList.contains('board-square')) {
        if (lastHighlightedSquare && lastHighlightedSquare !== square) {
            lastHighlightedSquare.classList.remove('highlight');
        }
        lastHighlightedSquare = square;
        lastHighlightedSquare.classList.add('highlight');
    }
}

export function clickMove(event) {
    let x = 0;
    let y = 0;
    if (event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    const clickedSquare = findChessSquareFromCoordinates(x,y);

    const pieceId = gameState.getSelectedId();
    const startSquare = document.getElementById(pieceId);
    const pieceObj = gameBoard.getPiece(idToPos(pieceId));

    if (clickedSquare !== null && clickedSquare.id !== startSquare.id){
        playMoveIfValid(pieceObj, startSquare, clickedSquare)
    }
}

function findChessSquareFromCoordinates(x,y, clone){

    if (clone) {
        // Make the clone "click-through"
        clone.style.pointerEvents = 'none';
    }

    let square;
    // Ensure coordinates are finite numbers
    if (isFinite(x) && isFinite(y)) {
        square = document.elementFromPoint(x, y);
    }
    // Check if the element below is not a board square and update it to its parent if needed
    if (!square.classList.contains('board-square')) {
        square = square.parentNode;
    }


    if (clone) {
        // Reset pointer-events property
        clone.style.pointerEvents = '';
    }

    return square;
};
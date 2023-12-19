import { selectSquare, unSelectSquare } from "./pieceSelection.js";
import { gameState } from "../chessLogic/gameState.js";
import { playMoveIfValid } from "../chessLogic/makeMove.js";

export function startDrag(event, piece, pieceObj) {
    // Prevent default behavior for images on mobile
    event.preventDefault();

    // add visual aid to chess board
    unSelectSquare();
    selectSquare(piece, pieceObj);

    // Create a clone of the piece for visual dragging
    const clone = piece.cloneNode(true);
    clone.style.position = 'absolute';
    
    clone.style.zIndex = 1000;
    document.body.appendChild(clone);

    // Calculate the width of the piece based on the viewport and chess board settings
    const chessBoardWidth = document.querySelector('.chess-board').clientWidth;
    const squareWidth = chessBoardWidth / 8; // There are 8 squares in a row
    const pieceWidth = squareWidth * 0.65; // 65% of the square's width

    clone.style.width = `${pieceWidth}px`;
    clone.style.height = 'auto'; // Maintain aspect ratio

    // Hide the original piece
    piece.style.visibility = 'hidden';

    // Position the clone under the cursor
    moveAt(event.pageX, event.pageY);

    // Listeners for moving and dropping the piece
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', endDrag, false);
    document.addEventListener('touchmove', onDrag, false); // For mobile
    document.addEventListener('touchend', endDrag, false); // For mobile

    function moveAt(pageX, pageY) {
        clone.style.left = pageX - clone.offsetWidth / 2 + 'px';
        clone.style.top = pageY  + 'px';
    }

    function onDrag(event) {
        moveAt(event.pageX, event.pageY);
        // debugger
        if (!piece.parentNode.classList.contains('selected')) { // Check if the piece is not already selected
            unSelectSquare();
            selectSquare(piece, pieceObj);
            gameState.setSelectedId(this.parentNode.id);
        }
    }

    function endDrag() {
        // Remove the clone and show the original piece
        piece.style.visibility = 'visible';
        clone.remove();

        // Remove event listeners
        document.removeEventListener('mousemove', onDrag, false);
        document.removeEventListener('mouseup', endDrag, false);
        document.removeEventListener('touchmove', onDrag, false);
        document.removeEventListener('touchend', endDrag, false);

        playMoveIfValid(event, pieceObj)

    }
}


// highlighting squares we hover over
export function highlightBelow(event) {
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

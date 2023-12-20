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

    // Handle the coordinates for both touch and mouse events
    let x, y;
    if (event.type === 'touchstart' && event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
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
    // moveAt(event.pageX, event.pageY);
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
    // let startSquare = null;
    const startSquare = document.getElementById(gameState.getSelectedId());

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

        // moveAt(event.pageX, event.pageY);
        // debugger
        if (!piece.parentNode.classList.contains('selected')) { // Check if the piece is not already selected
            unSelectSquare();
            selectSquare(piece, pieceObj);
            gameState.setSelectedId(this.parentNode.id);
        }
    }

    function endDrag() {

        clone.style.display = 'none'; 

        let dropSquare;
        // Ensure coordinates are finite numbers
        if (isFinite(lastKnownX) && isFinite(lastKnownY)) {
            dropSquare = document.elementFromPoint(lastKnownX, lastKnownY);
        }
        // Check if the element below is not a board square and update it to its parent if needed
        if (!dropSquare.classList.contains('board-square')) {
            dropSquare = dropSquare.parentNode;
        }

        // Remove the clone and show the original piece
        piece.style.visibility = 'visible';
        clone.remove();

        // Remove event listeners
        document.removeEventListener('mousemove', onDrag, false);
        document.removeEventListener('mouseup', endDrag, false);
        document.removeEventListener('touchmove', onDrag, false);
        document.removeEventListener('touchend', endDrag, false);

        playMoveIfValid(pieceObj, startSquare, dropSquare)

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

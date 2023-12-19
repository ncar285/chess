
function startDrag(event, piece, pieceObj) {
    // Prevent default behavior for images on mobile
    event.preventDefault();

    // Create a clone of the piece for visual dragging
    const clone = piece.cloneNode(true);
    clone.style.position = 'absolute';
    
    clone.style.zIndex = 1000;
    clone.style.width = "65%"
    document.body.appendChild(clone);

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
        clone.style.top = pageY - clone.offsetHeight / 2 + 'px';
    }

    function onDrag(event) {
        moveAt(event.pageX, event.pageY);
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

        // Implement logic to handle the end of the drag
        // ...
    }
}


// highlighting squares we hover over
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

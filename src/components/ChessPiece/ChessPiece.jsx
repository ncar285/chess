import React from 'react';
import { selectSquare, unSelectSquare } from "./pieceSelection";
import { gameState, playMove, lastHighlightedSquare } from './gameState';

const ChessPiece = ({ pieceObj, source }) => {

    const handleClick = (event) => {
        unSelectSquare();
        selectSquare(event.target, pieceObj);
    };

    const handleDragStart = (event) => {
        if (!event.target.parentNode.classList.contains('selected')) {
            unSelectSquare();
            selectSquare(event.target, pieceObj);
            gameState.setSelectedId(event.target.parentNode.id);
        }
    };

    const handleDragEnd = (event) => {
        event.target.style.opacity = '1'; // Show the piece again when the drag ends
        document.body.style.cursor = '';

        const validOptions = pieceObj.getMoves().options;
        const validTakeOptions = pieceObj.getMoves().takeOptions;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        if (!elemBelow.classList.contains('board-square')) {
            elemBelow = elemBelow.parentNode; // Update to the parent (chess square)
        }

        // Update the piece's position in game state
        if (validOptions.has(elemBelow.id) || validTakeOptions.has(elemBelow.id)) {
            const [startSquare, endSquare] = [gameState.getSelectedId(), elemBelow.id];
            playMove(startSquare, endSquare, pieceObj);
        }

        unSelectSquare();
        if (lastHighlightedSquare) {
            lastHighlightedSquare.classList.remove('highlight');
        }
    };

    return (
        <img 
            src={source} 
            className="chess-piece"
            onClick={handleClick}
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        />
    );
};

export default ChessPiece;

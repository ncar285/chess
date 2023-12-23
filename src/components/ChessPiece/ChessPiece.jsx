import React from 'react';
// import { selectSquare, unSelectSquare } from "./pieceSelection";
// import { gameState, playMove, lastHighlightedSquare } from './gameState';
import './ChessPiece.css';

// Piece images
import b_bishop from '../../pieces/b_bishop.png'
import w_bishop from '../../pieces/w_bishop.png'
import b_king from '../../pieces/b_king.png'
import w_king from '../../pieces/w_king.png'
import b_knight from '../../pieces/b_knight.png'
import w_knight from '../../pieces/w_knight.png'
import b_pawn from '../../pieces/b_pawn.png'
import w_pawn from '../../pieces/w_pawn.png'
import b_queen from '../../pieces/b_queen.png'
import w_queen from '../../pieces/w_queen.png'
import b_rook from '../../pieces/b_rook.png'
import w_rook from '../../pieces/w_rook.png'

const pieceImages = {
    'b_bishop': b_bishop,
    'w_bishop': w_bishop,
    'b_king': b_king,
    'w_king': w_king,
    'b_knight': b_knight,
    'w_knight': w_knight,
    'w_pawn': w_pawn,
    'b_pawn': b_pawn,
    'b_queen': b_queen,
    'w_queen': w_queen,
    'b_rook': b_rook,
    'w_rook': w_rook
};

const ChessPiece = ({ pieceObj }) => {

    const color = pieceObj.getColor();

    const pieceName = [color === "white" ? 'w' : 'b', pieceObj.getType()].join('_');
    const imgSource = pieceImages[pieceName]

    // const handleClick = (event) => {
    //     unSelectSquare();
    //     selectSquare(event.target, pieceObj);
    // };

    // const handleDragStart = (event) => {
    //     if (!event.target.parentNode.classList.contains('selected')) {
    //         unSelectSquare();
    //         selectSquare(event.target, pieceObj);
    //         gameState.setSelectedId(event.target.parentNode.id);
    //     }
    // };

    // const handleDragEnd = (event) => {
    //     event.target.style.opacity = '1'; // Show the piece again when the drag ends
    //     document.body.style.cursor = '';

    //     const validOptions = pieceObj.getMoves().options;
    //     const validTakeOptions = pieceObj.getMoves().takeOptions;
    //     let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    //     if (!elemBelow.classList.contains('board-square')) {
    //         elemBelow = elemBelow.parentNode; // Update to the parent (chess square)
    //     }

    //     // Update the piece's position in game state
    //     if (validOptions.has(elemBelow.id) || validTakeOptions.has(elemBelow.id)) {
    //         const [startSquare, endSquare] = [gameState.getSelectedId(), elemBelow.id];
    //         playMove(startSquare, endSquare, pieceObj);
    //     }

    //     unSelectSquare();
    //     if (lastHighlightedSquare) {
    //         lastHighlightedSquare.classList.remove('highlight');
    //     }
    // };

    return (
        <img 
            alt={`${pieceObj.getColor()} ${pieceObj.getType()}`}
            src={imgSource} 
            className="chess-piece"
            // onClick={handleClick}
            // draggable={true}
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
        />
    );
};

export default ChessPiece;

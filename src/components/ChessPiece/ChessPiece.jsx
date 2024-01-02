import './ChessPiece.css';
import React, { useEffect, useRef, useState } from 'react';
import { getSelected, receiveHighlightedSquare, receiveMoveOptions, receiveSelected, removeHighlightedSquare, removeSelected } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { idToPos, posToId } from '../../Utils/posIdConversion';
import { getGameBoard, receiveGameBoard } from '../../store/gameReducer';

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

const PIECE_IMAGES = {
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



const ChessPiece = ({ pieceObj, onTouchDragStart, onClickDragStart, draggedPiece }) => {

    const pieceRef = useRef(null);
    const cloneRef = useRef(null);


    const handleTouchStart = (e) => {
        onTouchDragStart(pieceObj, e);
    };

    const handleClickStart = (e) => {
        onClickDragStart(pieceObj, e);
    }


    useEffect(() => {
        const pieceElement = pieceRef.current;
        if (pieceElement) {
            pieceElement.addEventListener('touchstart', handleTouchStart, { passive: false });
            pieceElement.addEventListener('mousedown', handleClickStart, { passive: false });

            return () => {
                pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
                pieceElement.removeEventListener('mousedown', handleClickStart, { passive: false });
            };
        }
    }, []);

    useEffect(() => {
        // When this piece is the one being dragged, manage the clone
        if (draggedPiece === pieceObj) {
            // Create  the clone position
            const clone = pieceRef.current.cloneNode(true);
            clone.classList.add('dragging');
            // (don't have access to the x and y position of the mouse here)
            // clone.style.left = `${x - pieceRef.current.offsetWidth / 2}px`;
            // clone.style.top = `${y}px`;
            clone.style.position = 'absolute';
            document.body.appendChild(clone);
            cloneRef.current = clone;
            // Hide the original piece
            pieceRef.current.style.visibility = 'hidden';
         
        } else {
            // Ensure the clone is removed or hidden and normal piece is visible
            if (cloneRef.current) {
                document.body.removeChild(cloneRef.current);
                cloneRef.current = null;
            }
            // Show the original piece
            pieceRef.current.style.visibility = '';
        }
    }, [draggedPiece]);


    return (
        <img 
            alt={`${pieceObj.getColor()} ${pieceObj.getType()}`}
            src={PIECE_IMAGES[pieceObj.getType()]} 
            ref={pieceRef}
            className={`chess-piece`}
        />
    );
};

export default ChessPiece;

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



const ChessPiece = ({ pieceObj, isDragging, dragPosition }) => {

    const pieceRef = useRef(null);
    const cloneRef = useRef(null);

    const color = pieceObj.getColor();
    const pieceName = [color === "white" ? 'w' : 'b', pieceObj.getType()].join('_');
    const imgSource = pieceImages[pieceName]


    // useEffect(() => {
    //     const pieceElement = pieceRef.current;
    //     if (pieceElement) {
    //         pieceElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    //         // Optionally add touchmove and touchend if needed
    //         return () => {
    //             pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
    //             // Remove other event listeners if added
    //         };
    //     }
    // }, []);


    useEffect(() => {
        if (isDragging) {
            // Make the piece invisible, as the clone in ChessBoard takes its place
            pieceRef.current.style.visibility = 'hidden';
        } else {
            // Ensure the piece is visible
            pieceRef.current.style.visibility = 'visible';
        }
    }, [isDragging]);




    function findChessSquareFromCoordinates(x, y) {

        if (cloneRef.current) { // Make the clone "click-through"
            cloneRef.current.style.pointerEvents = 'none';
        }

        const element = document.elementFromPoint(x, y);
        let res = null;

        if (element && element.classList.contains('board-square')) {
            res = element.id; 
        } else if (element.parentElement.classList.contains('board-square')){
            res = element.parentElement.id;
        } else{
            console.log("couldn't find a chess square")
        }

        if (cloneRef.current) { 
            cloneRef.current.style.pointerEvents = '';
        }

        return res;
    }

    function getMousePos(e){
        let x, y;
        if (e.type === 'touchstart' && e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        return [x, y];
    }


    // useEffect(() => {
    //     const pieceElement = pieceRef.current;
    //     if (pieceElement) {
    //         pieceElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    //         return () => {
    //             pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
    //         };
    //     }
    // }, []);




    return (
        <img 
            alt={`${pieceObj.getColor()} ${pieceObj.getType()}`}
            src={imgSource} 
            ref={pieceRef}
            className={`chess-piece`}
        />
    );
};

export default ChessPiece;

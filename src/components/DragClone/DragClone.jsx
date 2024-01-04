import '../ChessPiece/ChessPiece.css';
import React, { useEffect, useRef } from 'react';
import { getHighlightedSquare, getSelected, receiveHighlightedSquare, removeHighlightedSquare } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';

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



function DragClone(piece){

    const cloneRef = useRef(null);

    const highlightedSquare = useSelector(getHighlightedSquare)

    const dispatch = useDispatch();



    useEffect(()=>{
        if (cloneRef.current){
            cloneRef.current.style.left = `${dragPosition.x - pieceRef.current.offsetWidth / 2}px`;
            cloneRef.current.style.top = `${dragPosition.y}px`;

            const squareBelow = findChessSquareFromCoordinates(dragPosition.x, dragPosition.y)
            if (highlightedSquare !== squareBelow){
                dispatch(receiveHighlightedSquare(squareBelow))
                if (squareBelow){
                    setFinalDragSquare(squareBelow);
                }
            }
        }

    }, [dragPosition])


    function findChessSquareFromCoordinates(x, y) {

        if (cloneRef.current) { // Make the clone "click-through"
            cloneRef.current.style.pointerEvents = 'none';
        }
    
        let res = null;
        let element = null;
        if (x && y){
            element = document.elementFromPoint(x, y);
            if (element && element.classList.contains('board-square')) {
                res = element.id; 
            } else if (element.parentElement.classList.contains('board-square')){
                res = element.parentElement.id;
            } else{
                // console.log("couldn't find a chess square")
                // add error handling
            }
        }
    
        if (cloneRef.current) { 
            cloneRef.current.style.pointerEvents = '';
        }
    
        return res;
    }

    return (
        <img 
            alt={`${piece.getColor()} ${piece.getType()}`}
            src={PIECE_IMAGES[piece.getType()]} 
            ref={cloneRef}
            className={`chess-piece dragging`}
        />
    );

}

export default DragClone;
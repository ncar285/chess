import './DragClone.css';
import '../ChessPiece/ChessPiece.css';
import React, { useEffect, useRef } from 'react';
import { getHighlightedSquare, receiveHighlightedSquare } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { PIECE_IMAGES } from '../../Utils/chessPieces'

function DragClone( {piece, position} ){

    const cloneRef = useRef(null);
    const highlightedSquare = useSelector(getHighlightedSquare)
    const dispatch = useDispatch();
    const pieceType = piece.getType().slice(2);

    useEffect(()=>{
        if (cloneRef.current && position){
            cloneRef.current.style.left = `${position.x}px`;
            cloneRef.current.style.top = `${position.y}px`;
            const squareBelow = findChessSquareFromCoordinates(position.x, position.y)
            if (highlightedSquare !== squareBelow){
                dispatch(receiveHighlightedSquare(squareBelow))
            }
        }

    }, [position])

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
            } else if (element.parentElement && element.parentElement.classList.contains('board-square')){
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
            className={`chess-piece dragging ${pieceType}`}
        />
    );

}

export default DragClone;
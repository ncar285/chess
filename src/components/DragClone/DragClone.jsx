import './DragClone.css';
import '../ChessPiece/ChessPiece.css';
import React, { useEffect, useRef } from 'react';
import { getDragType, getHighlightedSquare, getTouchHighlightedSquare, receiveHighlightedSquare, receiveTouchHighlightedSquare } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { PIECE_IMAGES } from '../../Utils/chessPieces'

function DragClone( {piece, position} ){

    const cloneRef = useRef(null);

    const highlightedSquare = useSelector(getHighlightedSquare)
    const touchHighlightedSquare = useSelector(getTouchHighlightedSquare)

    const dispatch = useDispatch();
    const pieceType = piece.getType().slice(2);
    const dragType = useSelector(getDragType);

    useEffect(()=>{
        if (cloneRef.current && position){
            cloneRef.current.style.left = `${position.x}px`;
            cloneRef.current.style.top = `${position.y}px`;
            const squareBelow = findChessSquareFromCoordinates(position.x, position.y)
            if (dragType === 'touch'){
                if (touchHighlightedSquare !== squareBelow){
                    dispatch(receiveTouchHighlightedSquare(squareBelow))
                }
            } else {
                if (highlightedSquare !== squareBelow){
                    dispatch(receiveHighlightedSquare(squareBelow))
                }
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
            } 
        }
    
        if (cloneRef.current) { 
            cloneRef.current.style.pointerEvents = '';
        }
    
        return res;
    }

    const touchDrag = dragType === 'touch' ? 'touchHighlight' : '';

    return (
        <img 
            alt={`${piece.getColor()} ${piece.getType()}`}
            src={PIECE_IMAGES[piece.getType()]} 
            ref={cloneRef}
            className={`chess-piece dragging ${pieceType} ${touchDrag}`}
        />
    );

}

export default DragClone;
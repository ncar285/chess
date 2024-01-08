import './DragClone.css';
import '../ChessPiece/ChessPiece.css';
import React, { useEffect, useRef, useState } from 'react';
import { getDragType, getHighlightedSquare, getTouchHighlightedSquare, receiveHighlightedSquare, receiveTouchHighlightedSquare } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { PIECE_IMAGES } from '../../Utils/chessPieces'
import { findChessSquareFromCoordinates } from '../../Utils/findChessSquare';

function DragClone( {piece, position} ){

    const cloneRef = useRef(null);

    const highlightedSquare = useSelector(getHighlightedSquare)
    const touchHighlightedSquare = useSelector(getTouchHighlightedSquare)

    const dispatch = useDispatch();
    const pieceType = piece.getType().slice(2);
    const dragType = useSelector(getDragType);

    const [enlarged, setEnlarged] = useState('');

    useEffect(()=>{
        if (cloneRef.current && position){
            cloneRef.current.style.left = `${position.x}px`;
            cloneRef.current.style.top = `${position.y}px`;
            const squareBelow = findChessSquareFromCoordinates(position.x, position.y, cloneRef.current)
            // const squareBelow = findChessSquareFromCoordinates(position.x, position.y)
            if (dragType === 'touch'){
                if (touchHighlightedSquare !== squareBelow){
                    dispatch(receiveTouchHighlightedSquare(squareBelow));

                    // fist time we leave original square, add dragging class to ele 
                    if (touchHighlightedSquare){
                        setEnlarged('enlarged');
                    }
                    // console.log("touchHighlightedSquare", touchHighlightedSquare)
                    // console.log("squareBelow", squareBelow)
                }
            } else {
                if (highlightedSquare !== squareBelow){
                    dispatch(receiveHighlightedSquare(squareBelow))
                }
            }
        }

    }, [position])

    const touchDrag = dragType === 'touch' ? 'touchHighlight' : '';
    // only add dragging once a touch drag has left it's square
    // const dragging = dragType === 'mouse' ? 'dragging' : 
        

    return (
        <img 
            alt={`${piece.getColor()} ${piece.getType()}`}
            src={PIECE_IMAGES[piece.getType()]} 
            ref={cloneRef}
            className={`chess-piece dragging ${pieceType} ${touchDrag} ${enlarged}`}
        />
    );

}

export default DragClone;
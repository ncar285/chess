import './ChessPiece.css';
import React, { useEffect, useRef } from 'react';
import { getDraggingPiece } from '../../store/uiReducer';
import { useSelector } from 'react-redux';
import { PIECE_IMAGES } from '../../Utils/chessPieces';

const ChessPiece = ({ piece, onTouchDragStart, onClickDragStart }) => {

    const pieceRef = useRef(null);
    const draggingPiece = useSelector(getDraggingPiece)


    const handleTouchStart = (e) => {
        onTouchDragStart(piece, e);
    };

    const handleClickStart = (e) => {
        onClickDragStart(piece, e);
    }

    useEffect(()=>{
        if (draggingPiece === piece){
            pieceRef.current.style.visibility = 'hidden';
        } else {
            pieceRef.current.style.visibility = '';
        }

    }, [draggingPiece])


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


    return (
        <img 
            alt={`${piece.getColor()} ${piece.getType()}`}
            src={PIECE_IMAGES[piece.getType()]} 
            ref={pieceRef}
            className={`chess-piece`}
        />
    );
};

export default ChessPiece;

import './ChessPiece.css';
import React, { useEffect, useRef } from 'react';
import { getDraggingPiece, getHighlightedSquare, getSelected, receiveHighlightedSquare, removeHighlightedSquare } from '../../store/uiReducer';
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
import { idToPos } from '../../Utils/posIdConversion';
import { getGameBoard } from '../../store/gameReducer';

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



const ChessPiece = ({ pieceObj, onTouchDragStart, onClickDragStart, draggedPiece, dragPosition, setFinalDragSquare, isDragging }) => {

    const pieceRef = useRef(null);
    const draggingPiece = useSelector(getDraggingPiece)


    const handleTouchStart = (e) => {
        onTouchDragStart(pieceObj, e);
        console.log("starting drag on piece: ", pieceObj.getSquareId())
    };

    const handleClickStart = (e) => {
        onClickDragStart(pieceObj, e);
        console.log("starting drag on piece: ", pieceObj.getSquareId())
    }

    useEffect(()=>{
        if (draggingPiece === pieceObj){
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
            alt={`${pieceObj.getColor()} ${pieceObj.getType()}`}
            src={PIECE_IMAGES[pieceObj.getType()]} 
            ref={pieceRef}
            className={`chess-piece`}
        />
    );
};

export default ChessPiece;

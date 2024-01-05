import './ChessPiece.css';
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
    const cloneRef = useRef(null);

    // console.log("draggedPiece",draggedPiece)

    const highlightedSquare = useSelector(getHighlightedSquare)

    const dispatch = useDispatch();

    const handleTouchStart = (e) => {
        onTouchDragStart(pieceObj, e);
        console.log("starting drag on piece: ", pieceObj.getSquareId())
    };

    const handleClickStart = (e) => {
        onClickDragStart(pieceObj, e);
        console.log("starting drag on piece: ", pieceObj.getSquareId())
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

    // useEffect(() => {
    //     // When this piece is the one being dragged, manage the clone
    //     if (draggedPiece === pieceObj) {

    //         const clone = pieceRef.current.cloneNode(true);
    //         clone.classList.add('dragging');
            
    //         // if (dragPosition){
    //         //     clone.style.left = `${dragPosition.x - pieceRef.current.offsetWidth / 2}px`;
    //         //     clone.style.top = `${dragPosition.y}px`;
    //         // }
    //         // const squareBelow = findChessSquareFromCoordinates(dragPosition.x, dragPosition.y)
    //         // if (squareBelow){
    //         //     dispatch(receiveHighlightedSquare(squareBelow))
    //         // }

    //         clone.style.position = 'absolute';
    //         document.body.appendChild(clone);
    //         cloneRef.current = clone;

    //         // Hide the original piece
    //         pieceRef.current.style.visibility = 'hidden';
         
    //     } else {
    //         // Ensure the clone is removed or hidden and normal piece is visible
    //         console.log("cloneRef", cloneRef.current)
    //         if (cloneRef.current) {
    //             // console.log(cloneRef.current)
    //             // debugger
    //             document.body.removeChild(cloneRef.current);
    //             cloneRef.current = null;
    //         }
    //         // Show the original piece
    //         pieceRef.current.style.visibility = '';

    //     }
    // }, [draggedPiece]);


    // useEffect(() => {
    //     // When this piece is the one being dragged, manage the clone
    //     if (isDragging) {

    //         const clone = pieceRef.current.cloneNode(true);
    //         clone.classList.add('dragging');
            
    //         if (dragPosition){
    //             clone.style.left = `${dragPosition.x - pieceRef.current.offsetWidth / 2}px`;
    //             clone.style.top = `${dragPosition.y}px`;
    //         }
    //         const squareBelow = findChessSquareFromCoordinates(dragPosition.x, dragPosition.y)
    //         if (squareBelow){
    //             dispatch(receiveHighlightedSquare(squareBelow))
    //         }

    //         clone.style.position = 'absolute';
    //         document.body.appendChild(clone);
    //         cloneRef.current = clone;

    //         // Hide the original piece
    //         pieceRef.current.style.visibility = 'hidden';
         
    //     } else {
    //         // Ensure the clone is removed or hidden and normal piece is visible
    //         console.log("cloneRef", cloneRef.current)
    //         if (cloneRef.current) {
    //             console.log(cloneRef.current)
    //             // debugger
    //             document.body.removeChild(cloneRef.current);
    //             cloneRef.current = null;
    //         }
    //         // Show the original piece
    //         pieceRef.current.style.visibility = '';

    //     }
    // }, [isDragging]);


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
            alt={`${pieceObj.getColor()} ${pieceObj.getType()}`}
            src={PIECE_IMAGES[pieceObj.getType()]} 
            ref={pieceRef}
            className={`chess-piece`}
        />
    );
};

export default ChessPiece;

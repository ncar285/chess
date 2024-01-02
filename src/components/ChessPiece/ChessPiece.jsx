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



const ChessPiece = ({ pieceObj, updateBoard }) => {

    const dispatch = useDispatch();
    const pieceRef = useRef(null);
    const cloneRef = useRef(null);

    const gameBoard = useSelector(getGameBoard);
    const selectedSquare = useSelector(getSelected)

    const [lasthighlightedSquare, setLasthighlightedSquare] = useState(null);

    const color = pieceObj.getColor();
    const pieceName = [color === "white" ? 'w' : 'b', pieceObj.getType()].join('_');
    const imgSource = pieceImages[pieceName]

    const updatePosition = (clone, X, Y) => {
        clone.style.left = `${X - pieceRef.current.offsetWidth / 2}px`;
        clone.style.top = `${Y}px`;
    };

    let finalSquareDuringDrag = null;
    let startTouchPos = null
    let isTouchDragging = false; 

    const handleTouchStart = (e) => {
        e.preventDefault();

        const touch = e.touches[0];
        startTouchPos = [touch.clientX, touch.clientY];

        const pos = pieceObj.getSquare();
        const id = posToId(pos);
        dispatch(receiveSelected(id));
        dispatch(receiveMoveOptions(pieceObj.getMoves()));

        // Add touchmove listener here
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
    };


    const handleTouchMove = (e) => {
        e.preventDefault();

        // Current touch pos
        const touch = e.touches[0];

        if (!isTouchDragging){
            const currentTouchPos = [touch.clientX, touch.clientY];
            const deltaX = currentTouchPos[0] - startTouchPos[0];
            const deltaY = currentTouchPos[1] - startTouchPos[1];
            const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

            if (distance > 20){
                isTouchDragging = true;
                // Create a clone and append to body and move  under cursor
                const clone = pieceRef.current.cloneNode(true);
                clone.classList.add('dragging');
                updatePosition(clone, touch.clientX, touch.clientY);
                clone.style.position = 'absolute';
                document.body.appendChild(clone);
                pieceRef.current.style.visibility = 'hidden';
                cloneRef.current = clone;

                // wait for a potential drop
                console.log("added a touchend")
                document.addEventListener('touchend', handleTouchEnd, { passive: false });
            }
        }


        if (isTouchDragging){
            // keep updating the position
            if (cloneRef.current){
                updatePosition(cloneRef.current, touch.clientX, touch.clientY);
            }
    
            // update the last Highlighted square
            const squareUnderneath = findChessSquareFromCoordinates(touch.clientX, touch.clientY)
            finalSquareDuringDrag = squareUnderneath;
            if (lasthighlightedSquare !== squareUnderneath){
                dispatch(receiveHighlightedSquare(squareUnderneath))
            }
        }


    };

    const handleTouchEnd = (e) => {
        e.preventDefault();

        // Remove the clone from body
        if (cloneRef.current) {
            document.body.removeChild(cloneRef.current);
            cloneRef.current = null;
        }

        playMoveIfValid();

        // Unhide the original piece
        pieceRef.current.style.visibility = 'visible';

        setLasthighlightedSquare(null);

        isTouchDragging = false;
        dispatch(removeSelected());
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    function playMoveIfValid(){
        const startSquare = pieceObj.getSquareId()
        const endSquare = finalSquareDuringDrag;
        if (startSquare && endSquare && startSquare !== endSquare){
            const validOptions = pieceObj.getMoves().options;
            const validTakeOptions = pieceObj.getMoves().takeOptions;

            if (validOptions.has(endSquare) || validTakeOptions.has(endSquare)){
                const startPos = idToPos(startSquare);
                const endPos = idToPos(endSquare);

                gameBoard.movePiece(startPos, endPos, pieceObj);
                updateBoard();

            }

        }
        return false;
    }


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


    useEffect(() => {
        const pieceElement = pieceRef.current;
        if (pieceElement) {
            pieceElement.addEventListener('touchstart', handleTouchStart, { passive: false });
            return () => {
                pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
            };
        }
    }, []);




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

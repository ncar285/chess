import React, { useEffect, useRef, useState } from 'react';
// import { selectSquare, unSelectSquare } from "./pieceSelection";
// import { gameState, playMove, lastHighlightedSquare } from './gameState';
import './ChessPiece.css';
import { receiveDraggingPiece, receiveHighlightedSquare, receiveMoveOptions, receiveSelected } from '../../store/uiReducer';


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
import { useDispatch } from 'react-redux';
import { posToId } from '../../Utils/posIdConversion';

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



const ChessPiece = ({ pieceObj }) => {

    const dispatch = useDispatch();
    const pieceRef = useRef(null);
    const cloneRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [lasthighlightedSquare, setLasthighlightedSquare] = useState(null);
    const color = pieceObj.getColor();
    const pieceName = [color === "white" ? 'w' : 'b', pieceObj.getType()].join('_');
    const imgSource = pieceImages[pieceName]

    const updatePosition = (clone, X, Y) => {
        clone.style.left = `${X - pieceRef.current.offsetWidth / 2}px`;
        clone.style.top = `${Y - pieceRef.current.offsetHeight / 2}px`;
    };

    const handleTouchStart = (e) => {

        e.preventDefault();

        setIsDragging(true);    // update state

        console.log("touch start!")

        // Create a clone and append to body and move  under cursor
        const touch = e.touches[0];
        const clone = pieceRef.current.cloneNode(true);
        updatePosition(clone, touch.clientX, touch.clientY);
        clone.style.position = 'absolute';
        document.body.appendChild(clone);

        pieceRef.current.style.visibility = 'hidden';

        cloneRef.current = clone;

        // show visual aids
        const pos = pieceObj.getSquare();
        const id = posToId(pos);
        dispatch(receiveSelected(id));
        dispatch(receiveMoveOptions(pieceObj.getMoves()));

        // wait for a potential drag or drop
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });
    };


    const handleTouchMove = (e) => {
        e.preventDefault();

        console.log("MOVING ... ")

        // keep updating the position
        const touch = e.touches[0];
        if (cloneRef.current){
            updatePosition(cloneRef.current, touch.clientX, touch.clientY);
        }

        // update the last Highlighted square
        const squareUnderneath = getSquareUnderMouse(touch.clientX, touch.clientY)
        if (lasthighlightedSquare !== squareUnderneath){
            dispatch(receiveHighlightedSquare(squareUnderneath))
        }

        // // wait for drag to end
        // document.addEventListener('touchend', handleTouchEnd, { passive: false });
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        console.log("drag has ended")

        // Remove the clone from body
        if (cloneRef.current) {
            document.body.removeChild(cloneRef.current);
            cloneRef.current = null;
        }

        // Unhide the original piece
        pieceRef.current.style.visibility = 'visible';


        setIsDragging(false);
        setLasthighlightedSquare(null)

        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);

        // would reset the chess pieces position if the move wasn't valid...
    
    };




    function getSquareUnderMouse(x, y) {
        const element = document.elementFromPoint(x, y);
        if (element && element.classList.contains('board-square')) {
            return element.id; // Assuming your squares have IDs like 'A1', 'C4', etc.
        } else if (element.parentElement.classList.contains('board-square')){
            return element.parentElement.id;
        } else{
            console.log("couldn't find a chess square")
        }
        return null;
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
        return { x, y };
    }


    useEffect(() => {
        const pieceElement = pieceRef.current;
        if (pieceElement) {
            pieceElement.addEventListener('touchstart', handleTouchStart, { passive: false });

            // Cleanup the event listener
            return () => {
                pieceElement.removeEventListener('touchstart', handleTouchStart, { passive: false });
            };
        }
    }, []);

    useEffect(()=>{

    }, [isDragging])


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

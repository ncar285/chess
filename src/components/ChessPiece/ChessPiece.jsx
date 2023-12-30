import React, { useRef, useState } from 'react';
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
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [lasthighlightedSquare, setLasthighlightedSquare] = useState(null);
    const color = pieceObj.getColor();
    const pieceName = [color === "white" ? 'w' : 'b', pieceObj.getType()].join('_');
    const imgSource = pieceImages[pieceName]

    const updatePosition = (clientX, clientY) => {
        const chessboard = pieceRef.current.closest('body');
        const rect = chessboard.getBoundingClientRect();
        const newX = clientX - rect.left - pieceRef.current.offsetWidth / 2;
        const newY = clientY - rect.top - pieceRef.current.offsetHeight / 2;
        setDragPosition({ x: newX, y: newY });
    };

    const handleTouchStart = (e) => {

        e.preventDefault();

        console.log("touch start!")

        // update state
        setIsDragging(true);

        // move piece to under cursor
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);

        // show visual aids
        const pos = pieceObj.getSquare();
        const id = posToId(pos);
        dispatch(receiveSelected(id));
        dispatch(receiveMoveOptions(pieceObj.getMoves()));

        // wait for a potential drag
        document.addEventListener('touchmove', handleTouchMove);
    };


    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        // keep updating the position
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);

        // update the last Highlighted square
        const pos = {x: touch.clientX, y: touch.clientY}
        setDragPosition(pos);
        const squareUnderneath = getSquareUnderMouse(pos)
        if (lasthighlightedSquare !== squareUnderneath){
            dispatch(receiveHighlightedSquare(squareUnderneath))
        }

        // wait for drag to end
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setLasthighlightedSquare(null)

        console.log("drag has ended")

        // would reset the chess pieces position if the move wasn't valid...
    };




    function handleClick(e){
        e.preventDefault();
        const imageElement = e.target;
        const pos = pieceObj.getSquare();
        const id = posToId(pos);
        dispatch(receiveSelected(id));
        dispatch(receiveMoveOptions(pieceObj.getMoves()));
    }

    const dragStyle = {
        position: 'absolute',
        left: `${dragPosition.x}px`,
        top: `${dragPosition.y}px`
    }


    // function onMove(dragPosition){
    //     const {x, y} = dragPosition;
    //     const square = findChessSquareFromCoordinates(x,y);
    //     if (square !== null && square.id !== startSquare.id){
    //         playMoveIfValid(pieceObj, startSquare, square)
    //     }
    // }


    function handleDragStart(e){
        setIsDragging(true);
        const mousePosition = getMousePos(e)
        setDragPosition(mousePosition);
        const pos = pieceObj.getSquare();
        const id = posToId(pos);
        dispatch(receiveSelected(id));
        dispatch(receiveMoveOptions(pieceObj.getMoves()));
        dispatch(receiveDraggingPiece(imgSource));
        dispatch(receiveHighlightedSquare(id))
        setLasthighlightedSquare(id)
    }


    const handleDrag = (e) => {
        e.preventDefault();
        const mousePosition = getMousePos(e)
        setDragPosition(mousePosition);
        const squareUnderneath = getSquareUnderMouse(mousePosition)
        if (lasthighlightedSquare !== squareUnderneath){
            dispatch(receiveHighlightedSquare(squareUnderneath))
        }
    };

    // const handleTouchStart = (e) => {
    //     e.preventDefault();
    //     setIsDragging(true);
    //     const touch = e.touches[0];
    //     const pos = {x: touch.clientX, y: touch.clientY}
    //     console.log("touch pos", pos);

    //     // updatePosition(touch.clientX, touch.clientY);
    //     // ... rest of the logic
    // };

    function getSquareUnderMouse(pos) {
        const element = document.elementFromPoint(pos.x, pos.y);
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

    function handleDragEnd(e){
        e.preventDefault();

        console.log("drag has ended")

        setLasthighlightedSquare(null)

    }


    return (
        <img 
            alt={`${pieceObj.getColor()} ${pieceObj.getType()}`}
            src={imgSource} 
            ref={pieceRef}
            className={`chess-piece ${isDragging ? 'dragging' : ''}`}
            draggable
            // onClick={handleClick}
            // onDragStart={handleDragStart}
            // onDrag={handleDrag}
            // onDragEnd={handleDragEnd}
            style = {isDragging ? {dragStyle} : {}}
            // onMouseDown={handleMouseDown}
            // onTouchStart={handleTouchStart}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        />
    );
};

export default ChessPiece;

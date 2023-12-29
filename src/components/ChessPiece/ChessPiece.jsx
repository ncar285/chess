import React, { useState } from 'react';
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

    const [isDragging, setIsDragging] = useState(false);
    // const [selected, setSelected] = useState(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });


    const [lasthighlightedSquare, setLasthighlightedSquare] = useState(null);

    const dispatch = useDispatch();

    const color = pieceObj.getColor();

    const pieceName = [color === "white" ? 'w' : 'b', pieceObj.getType()].join('_');
    const imgSource = pieceImages[pieceName]


    function handleClick(e){
        e.preventDefault();
        const imageElement = e.target;
        const pos = pieceObj.getSquare();
        const id = posToId(pos);
        dispatch(receiveSelected(id));
        dispatch(receiveMoveOptions(pieceObj.getMoves()));
    }
    // const handleDragStart = (e) => {

    //     e.preventDefault();
    //     setIsDragging(true);

    //     const imageElement = e.target;
    //     const id = imageElement.parentNode.id;

    //     setSelected(id)

    //     console.log("set the selected id")

    //     console.log("imageElement",imageElement)
    //     console.log("id ",id)
    //     // setDragPosition({ x: e.clientX, y: e.clientY });

    //     // Handle the coordinates for both touch and mouse events
    //     let x, y;
    //     if (e.type === 'touchstart' && e.touches) {
    //         x = e.touches[0].clientX;
    //         y = e.touches[0].clientY;
    //     } else {
    //         x = e.clientX;
    //         y = e.clientY;
    //     }

    //     console.log("x,y: ",x,y)

    //     setDragPosition({ x, y });

    //     // const square = findChessSquareFromCoordinates(x,y);
    //     // setSelected(square.id)
    //     // Additional logic...
    // };

    // const handleDrag = (e) => {
    //     setDragPosition({ x: e.clientX, y: e.clientY });
    //     // Additional logic for highlighting, etc.
    // };

    // const handleDragEnd = (e) => {
    //     setIsDragging(false);
    //     onMove(dragPosition); // Assuming onMove is a prop function to handle the move
    //     // Additional logic...
    // };

    // const pieceStyle = isDragging ? {
    //     position: 'absolute',
    //     left: `${dragPosition.x}px`,
    //     top: `${dragPosition.y}px`
    //     // other styles
    // } : {};

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


    // ! STARTWITH SIMPLIFIED VERSIONS
    function handleDragStart(e){
        // e.preventDefault();

        console.log("dragg has started")

        // console.log("x, y: ", x, y)

        setIsDragging(true);
        const mousePosition = getMousePos(e)
        setDragPosition(mousePosition);


        // select the dragging piece
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
        console.log("mousePosition ", mousePosition)
        const squareUnderneath = getSquareUnderMouse(mousePosition)
        if (lasthighlightedSquare !== squareUnderneath){

            dispatch(receiveHighlightedSquare(squareUnderneath))
            console.log("NEWSQUARE", squareUnderneath)
        }
    };

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

    }

    function findChessSquareFromCoordinates(x,y){
        let square;
        if (isFinite(x) && isFinite(y)) {
            square = document.elementFromPoint(x, y);
        }
        // Check if the element below is not a board square and update it to its parent if needed
        if (!square.classList.contains('board-square')) {
            square = square.parentNode;
        }
        return square;
    };


    return (
        <img 
            alt={`${pieceObj.getColor()} ${pieceObj.getType()}`}
            src={imgSource} 
            className={`chess-piece ${isDragging ? 'dragging' : ''}`}
            draggable
            onClick={handleClick}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style = {isDragging ? {dragStyle} : {}}
        />
    );
};

export default ChessPiece;

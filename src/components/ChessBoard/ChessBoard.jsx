import React, { useEffect, useState } from 'react';
import "./ChessBoard.css"
import { posToId, indexToFile } from '../../Utils/posIdConversion'; 
// import ChessSquare from '../ChessSquare/ChessSquare';
import { useDispatch, useSelector } from 'react-redux';
import { getGameBoard, receiveGameBoard } from '../../store/gameReducer';
import { Board } from '../../chessLogic/board';
import { getHighlightedSquare, getMoveOptions, getSelected, getTakeOptions, receiveHighlightedSquare, receiveMoveOptions, receiveSelected } from '../../store/uiReducer';
import ChessPiece from '../ChessPiece/ChessPiece';
import '../ChessSquare/ChessSquare.css'

function ChessBoard({  }) {

    const dispatch = useDispatch();


    const gameBoard = useSelector(getGameBoard);
    const selectedSquare = useSelector(getSelected);
    const movingOptions = useSelector(getMoveOptions);
    const takingOptions = useSelector(getTakeOptions);

    const highlightedSquare = useSelector(getHighlightedSquare);

    const [chessBoard, setChessBoard] = useState([]);
    const [lasthighlightedSquare, setLasthighlightedSquare] = useState(null);

    const [isDragging, setIsDragging] = useState(false);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    // const [startCoordinates, setStartCoordinates] = useState(null);
    const [startSquare, setStartSquare] = useState(null);


    let startCoordinates = null;

    // const 

    let finalSquareDuringDrag = null;


    const handleTouchStart = (piece, e) => {
        e.preventDefault();

        console.log("handle TOUCH start logic")
        startActions(piece, e)

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });

    };

    const handleClickStart = (piece, e) => {
        e.preventDefault();

        console.log("handle CLICK start logic")
        startActions(piece, e)

        document.addEventListener('mousemove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', handleMouseEnd, { passive: false });

    };

    const startActions = (piece, e) => {
        setDraggedPiece(piece);
        console.log("setDraggedPiece to : ", piece)

        // const touch = e.touches[0];
        console.log("getMousePos(e)", getMousePos(e))
        const [x, y] = getMousePos(e)
        console.log("setDragPosition to : ", {x, y})
        setDragPosition({x, y});

        const startSquareId = posToId(piece.getSquare());
        setStartSquare(startSquareId);
        dispatch(receiveSelected(startSquareId));
        console.log("startSquareId : ", startSquareId)

        // const touch = e.touches[0];
        // setDragPosition({ x: touch.clientX, y: touch.clientY });

        dispatch(receiveMoveOptions(piece.getMoves()));
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

    function handleTouchMove (e) {

        console.log("handle TOUCH move logic ")

        const touch = e.touches[0];
        setDragPosition({ x: touch.clientX, y: touch.clientY });
        
        moveActions(e);
    };

    function handleMouseMove (e) {

        console.log("handle MOUSE move logic ")

        // Update drag position for mouse
        setDragPosition({ x: e.clientX, y: e.clientY });

        moveActions(e);
    };

    function moveActions(e){
        setIsDragging(true);

    }

    function handleTouchEnd (e) {
        console.log("handle TOUCH end logic  ")
        setIsDragging(false);
        setDraggedPiece(null);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };



    function handleMouseEnd (e) {
        console.log("handle MOUSE end logic  ")
        setIsDragging(false);
        setDraggedPiece(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    };



    useEffect(() => {
        if (!gameBoard) {
            const newGameBoard = new Board();
            dispatch(receiveGameBoard(newGameBoard));
            initialiseBoard(newGameBoard)
        }
    }, [gameBoard, dispatch]);


    function initialiseBoard(gameBoard){
        let color = "brown";
        const board = [];
        for (let a = 7 ; a  >= 0 ; a-- ){
            board.push([]);
            const rank = a + 1;
            for (let b = 0 ; b  < 8 ; b++ ){
                const file = indexToFile(b);

                const pieceObj = gameBoard.getPiece([a, b]);
                board[board.length -1].push({pieceObj, file, rank, color});

                color = switchColor(color);
            }
            color = switchColor(color);
        }
        setChessBoard(board)
    }


    function switchColor(color){
        if (color === "brown"){
            return "white";
        } else {
            return "brown"
        }
    }


    return (
        <div className="chess-board">
            {/* render your chess board and pieces */}
            {chessBoard.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell) => {

                        const {pieceObj, file, rank, color} = cell;
                    
                        const id = `${file}${rank}`;

                        const selected = selectedSquare === id ? 'selected' : '';
                        
                        const highlighted = highlightedSquare === id ? 'highlight' : '';

                        return (
                            <div className={`board-square ${color} ${selected} ${highlighted}`} key={id} id={id}>

                                {
                                    pieceObj &&
                                    <ChessPiece 
                                        pieceObj={cell.pieceObj}
                                        onTouchDragStart={handleTouchStart}
                                        onClickDragStart={handleClickStart}

                                        draggedPiece={draggedPiece}
                                        dragPosition={dragPosition}
                                        // ... other props and handlers ...
                                    />
                                }

                                {   
                                    (file === "A") && 
                                    <div className="rank square-label">{rank}</div>
                                }

                                {
                                    (rank === 1) && 
                                    <div className="file square-label">{file.toLowerCase()}</div>
                                }

                                {   
                                    movingOptions && movingOptions.has(id) && 
                                    <div className="suggested-square" 
                                    // onClick={makeMove}
                                    >

                                    </div>
                                }

                                {
                                    takingOptions && takingOptions.has(id) && 
                                    <div className="suggested-capture" 
                                    // onClick={makeMove}
                                    ></div>
                                }

                            </div>

                        )
                        

                    })}
                </div>
            ))}
        </div>
    );
}


export default ChessBoard;
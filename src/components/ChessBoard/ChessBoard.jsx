import React, { useEffect, useRef, useState } from 'react';
import { posToId, indexToFile, idToPos } from '../../Utils/posIdConversion'; 
import { useDispatch, useSelector } from 'react-redux';
import { getGameBoard, receiveGameBoard } from '../../store/gameReducer';
import { Board } from '../../chessLogic/board';
import { getHighlightedSquare, getMoveOptions, getSelected, getTakeOptions, receiveDragPosition, receiveDraggingPiece, receiveMoveOptions, receiveSelected, removeHighlightedSquare, removeSelected } from '../../store/uiReducer';
import ChessPiece from '../ChessPiece/ChessPiece';
import '../ChessSquare/ChessSquare.css'
import "./ChessBoard.css"

const STATIC_BOARD = [];
for (let a = 7 ; a  >= 0 ; a-- ){
    STATIC_BOARD.push([]);
    const rank = a + 1;
    for (let b = 0 ; b  < 8 ; b++ ){
        const color = ((a + b) % 2 === 0) ? "white" : "brown"
        const file = indexToFile(b);
        const len = STATIC_BOARD.length;
        STATIC_BOARD[len-1].push({file, rank, color});
    }
}

function ChessBoard({  }) {

    const dispatch = useDispatch();

    const gameBoard = useSelector(getGameBoard);
    const selectedSquare = useSelector(getSelected);
    const movingOptions = useSelector(getMoveOptions);
    const takingOptions = useSelector(getTakeOptions);
    const highlightedSquare = useSelector(getHighlightedSquare);

    const [draggedPiece, setDraggedPiece] = useState(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    const [finalDragSquare, setFinalDragSquare] = useState(null)

    const [attemptMove, setAttemptMove] = useState(false)

    const [isDragging, setIsDragging] = useState(false)

    // Define refs to track current values of selectedSquare and finalDragSquare
    const selectedSquareRef = useRef(null);
    const finalDragSquareRef = useRef(null);

    // Update refs whenever the related state changes
    useEffect(() => {
        selectedSquareRef.current = selectedSquare;
        finalDragSquareRef.current = finalDragSquare;
    }, [selectedSquare, finalDragSquare]);

    useEffect(() => {
        if (!gameBoard) {
            const newGameBoard = new Board();
            dispatch(receiveGameBoard(newGameBoard));
        } 
    }, [gameBoard, dispatch]);


    const handleTouchStart = (piece, e) => {
        e.preventDefault();

        startActions(piece, e)

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', (e)=>handleTouchEnd(piece,e), { passive: false });

    };

    const handleClickStart = (piece, e) => {
        e.preventDefault();

        startActions(piece, e)

        document.addEventListener('mousemove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', (e)=>handleMouseEnd(piece,e), { passive: false });

    };

    const startActions = (piece, e) => {

        setDraggedPiece(piece);

        dispatch(receiveDraggingPiece(piece))

        const [x, y] = getMousePos(e)
        setDragPosition({x, y});

        setIsDragging(true)

        const startSquareId = posToId(piece.getSquare());
  
        dispatch(receiveSelected(startSquareId));

        dispatch(receiveMoveOptions(piece.getMoves()));

    }

    function getMousePos(e){
        let x, y;
        if ((e.type === 'touchstart' || e.type === 'touchmove' ) && e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;  
        } else if (e.type === 'touchend' && e.changedTouches) {
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;  
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        return [x, y];
    }

    function handleTouchMove (e) {
        moveActions(e);
    };

    function handleMouseMove (e) {
        moveActions(e);
    };

    function moveActions(e){

        const [x,y] = getMousePos(e);
        setDragPosition({x,y});

        dispatch(receiveDragPosition({x,y}));

    }

    function handleTouchEnd (piece, e) {
        e.preventDefault()
        
        endActions(piece, e)

        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    function handleMouseEnd (piece, e) {
        e.preventDefault()

        endActions(piece, e)
    
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    };

    function endActions(piece, e) {

        // console.log("======END ACTIONS============")

        // console.log("start square", selectedSquareRef.current )
        // console.log("end square", finalDragSquareRef.current )
        // console.log("piece", piece)\\

        setIsDragging(false)

        playMoveIfValid(piece, selectedSquareRef.current, finalDragSquareRef.current)

        setAttemptMove(true);

        setDraggedPiece(null);

        dispatch(removeHighlightedSquare());
        dispatch(removeSelected());
    }

    function playMoveIfValid(piece, startSquare, endSquare){
        if (startSquare && endSquare && startSquare !== endSquare){
            const validOptions = piece.getMoves().options;
            const validTakeOptions = piece.getMoves().takeOptions;

            console.log("==============")
            console.log("piece",piece.getSquare())
            console.log("startSquare", startSquare)
            console.log("endSquare", endSquare)
            console.log("validOptions",validOptions)
            console.log("validTakeOptions",validTakeOptions)


            if (validOptions.has(endSquare) || validTakeOptions.has(endSquare)){
                const startPos = idToPos(startSquare);
                const endPos = idToPos(endSquare);
                gameBoard.movePiece(startPos, endPos, piece);

                // console.log("startPos", startPos)
                // console.log("endPos", endPos)

                console.log("VALID MOVE")
            } else {
                console.log("NOT A VALID MOVE")
            }
        }
    }


    return (
        <div className="chess-board">
            {gameBoard && [...gameBoard.board].reverse().map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((piece, colIndex) => {
                        const squareInfo = STATIC_BOARD[rowIndex][colIndex]
                        const {file, rank, color} = squareInfo;
                        const id = `${file}${rank}`;
                        const selected = selectedSquare === id ? 'selected' : '';
                        const highlighted = highlightedSquare === id ? 'highlight' : '';

                        return (
                            <div className={`board-square ${color} ${selected} ${highlighted}`} key={id} id={id}>

                                {
                                    piece &&
                                    <ChessPiece 
                                        pieceObj={piece}
                                        onTouchDragStart={handleTouchStart}
                                        onClickDragStart={handleClickStart}
                                        draggedPiece={draggedPiece}
                                        dragPosition={dragPosition}

                                        setFinalDragSquare={setFinalDragSquare}

                                        isDragging={isDragging}

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
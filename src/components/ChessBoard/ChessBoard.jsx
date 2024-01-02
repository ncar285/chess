import React, { useEffect, useState } from 'react';
import "./ChessBoard.css"
import { posToId, indexToFile } from '../../Utils/posIdConversion'; 
// import ChessSquare from '../ChessSquare/ChessSquare';
import { useDispatch, useSelector } from 'react-redux';
import { getGameBoard, receiveGameBoard } from '../../store/gameReducer';
import { Board } from '../../chessLogic/board';
import { getHighlightedSquare, getMoveOptions, getSelected, getTakeOptions } from '../../store/uiReducer';
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

    // const 

    let finalSquareDuringDrag = null;


    const handleTouchStart = (piece, e) => {
        console.log("handle touch start logic")
        // ... handle touch start logic ...
        setDraggedPiece(piece);
        setDraggedPiece(piece);
        // Consider adding touchmove and touchend listeners here
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });

    };

    const handleTouchMove = (e) => {
        // ... handle touch move logic ...

        console.log("handle touch move logic ")
    };

    const handleTouchEnd = (e) => {
        // ... handle touch end logic ...
        setDraggedPiece(null);

        console.log("handle touch end logic  ")
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

                        return (
                            <div className={`board-square ${color}`} key={id} id={id}>

                                {
                                    pieceObj &&
                                    <ChessPiece 
                                        pieceObj={cell.pieceObj}
                                        onDragStart={handleTouchStart}
                                        onDragMove={handleTouchMove}
                                        onDragEnd={handleTouchEnd}
                                        draggedPiece={draggedPiece}
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
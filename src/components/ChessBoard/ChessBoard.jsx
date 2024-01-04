import React, { useEffect, useState } from 'react';
import { posToId, indexToFile, idToPos } from '../../Utils/posIdConversion'; 
import { useDispatch, useSelector } from 'react-redux';
import { getGameBoard, receiveGameBoard } from '../../store/gameReducer';
import { Board } from '../../chessLogic/board';
import { getHighlightedSquare, getMoveOptions, getSelected, getTakeOptions, receiveMoveOptions, receiveSelected, removeHighlightedSquare } from '../../store/uiReducer';
import ChessPiece from '../ChessPiece/ChessPiece';
import '../ChessSquare/ChessSquare.css'
import "./ChessBoard.css"

function ChessBoard({  }) {

    const dispatch = useDispatch();

    const gameBoard = useSelector(getGameBoard);
    const selectedSquare = useSelector(getSelected);
    const movingOptions = useSelector(getMoveOptions);
    const takingOptions = useSelector(getTakeOptions);
    const highlightedSquare = useSelector(getHighlightedSquare);

    const [chessBoard, setChessBoard] = useState([]);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    const [finalDragSquare, setFinalDragSquare] = useState(null)

    const [attemptMove, setAttemptMove] = useState(false)



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

        const [x, y] = getMousePos(e)
        setDragPosition({x, y});

        const startSquareId = posToId(piece.getSquare());
  
        dispatch(receiveSelected(startSquareId));

        dispatch(receiveMoveOptions(piece.getMoves()));

        // setAttemptMove(false)
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

        setAttemptMove(true);

        setDraggedPiece(null);

        dispatch(removeHighlightedSquare())
    }

    
    function findSquareAtPosition(x,y) {
        // console.log("------findSquareAtPosition-----")
        const element = document.elementFromPoint(x, y);
        const parent = element.parentElement;
        // console.log("x,y",x,y)
        // console.log("element",element)
        // console.log("highlightedSquare",highlightedSquare)
        // console.log("finalDragSquare",finalDragSquare)
        if (element && element.classList.contains('board-square')) {
            return element.id;
        } else if (parent && parent.classList.contains('board-square')){
            return parent.id;
        }
        return null;
    }

    function playMoveIfValid(piece, startSquare, endSquare){

        console.log("in play move if valid")

        if (startSquare && endSquare && startSquare !== endSquare){
            const validOptions = piece.getMoves().options;
            const validTakeOptions = piece.getMoves().takeOptions;
            if (validOptions.has(endSquare) || validTakeOptions.has(endSquare)){
                const startPos = idToPos(startSquare);
                const endPos = idToPos(endSquare);
                gameBoard.movePiece(startPos, endPos, piece);
                // updateBoard();
            }
        }
    }

    function updateBoard(){
        const updatedBoard = chessBoard.map(row => row.map(cell => ({ ...cell })));
        for (let a = 0 ; a  < 8 ; a++ ){
            for (let b = 0 ; b  < 8 ; b++ ){
                const localPiece = updatedBoard[a][b].pieceObj;
                const reduxPiece = gameBoard.getPiece([a, b]);
                if ((localPiece === null ^ reduxPiece === null) || 
                    (localPiece && reduxPiece && localPiece.constructor !== reduxPiece.constructor)) {
                    const screenRank = 7 - a;
                    updatedBoard[screenRank][b].pieceObj = reduxPiece
                }
            }
        }
        setChessBoard(updatedBoard)
    }


    useEffect(() => {
        if (!gameBoard) {
            const newGameBoard = new Board();
            dispatch(receiveGameBoard(newGameBoard));
            // initialiseBoard(newGameBoard)
        } 
    }, [gameBoard, dispatch]);

    useEffect(() => {

        if (attemptMove){
            const piece = gameBoard.getPieceFromId(selectedSquare);
            console.log("piece", piece)
            playMoveIfValid(piece, selectedSquare, finalDragSquare);
            setAttemptMove(false);

            // updateBoard();
        }

    }, [attemptMove, finalDragSquare, selectedSquare, draggedPiece]);


    // function initialiseBoard(gameBoard){
    //     let color = "brown";
    //     const board = [];
    //     for (let a = 7 ; a  >= 0 ; a-- ){
    //         board.push([]);
    //         const rank = a + 1;
    //         for (let b = 0 ; b  < 8 ; b++ ){
    //             const file = indexToFile(b);

    //             const pieceObj = gameBoard.getPiece([a, b]);
    //             board[board.length -1].push({pieceObj, file, rank, color});

    //             color = switchColor(color);
    //         }
    //         color = switchColor(color);
    //     }
    //     setChessBoard(board)

    //     console.log("board", board)
    // }
    let color = "brown";
    const STATIC_BOARD = [];
    for (let a = 7 ; a  >= 0 ; a-- ){
        STATIC_BOARD.push([]);
        const rank = a + 1;
        for (let b = 0 ; b  < 8 ; b++ ){
            const file = indexToFile(b);

            // const pieceObj = gameBoard.getPiece([a, b]);
            const len = STATIC_BOARD.length;
            STATIC_BOARD[len-1].push({file, rank, color});

            color = switchColor(color);
        }
        color = switchColor(color);
    }

    // {pieceObj: null, file: 'A', rank: 8, color: 'brown'}


    function switchColor(color){
        if (color === "brown"){
            return "white";
        } else {
            return "brown"
        }
    }

    // console.log(gameBoard.board, "gameboard")


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
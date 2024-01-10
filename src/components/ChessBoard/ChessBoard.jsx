import React, { useEffect, useRef } from 'react';
import { posToId, indexToFile} from '../../Utils/posIdConversion'; 
import { useDispatch, useSelector } from 'react-redux';
import { getGame, getGameBoard, receiveGameBoard } from '../../store/gameReducer';
import { Board } from '../../chessLogic/board';
import { getDragType, getHighlightedSquare, getMoveOptions, getSelected, getTakeOptions, getTouchHighlightedSquare, receiveDragPosition, receiveDragType, receiveDraggingPiece, receiveMoveOptions, receiveSelected, removeDragPosition, removeDraggingPiece, removeHighlightedSquare, removeSelected, removeTouchHighlightedSquare } from '../../store/uiReducer';
import ChessPiece from '../ChessPiece/ChessPiece';
import { playMoveIfValid } from '../../Utils/playMoveIfValid';
import "./ChessBoard.css"
import { getMousePos } from '../../Utils/getMousePos';
import { findChessSquareFromCoordinates } from '../../Utils/findChessSquare';

const STATIC_BOARD = [];
for (let a = 7 ; a  >= 0 ; a-- ){
    STATIC_BOARD.push([]);
    const rank = a + 1;
    for (let b = 0 ; b  < 8 ; b++ ){
        const color = ((a + b) % 2 === 0) ? "brown" : "white"
        const file = indexToFile(b);
        const len = STATIC_BOARD.length;
        STATIC_BOARD[len-1].push({file, rank, color});
    }
}

function ChessBoard({  }) {

    const dispatch = useDispatch();

    const gameBoard = useSelector(getGameBoard);
    const game = useSelector(getGame)
    const selectedSquare = useSelector(getSelected);
    const movingOptions = useSelector(getMoveOptions);
    const takingOptions = useSelector(getTakeOptions);

    const highlightedSquare = useSelector(getHighlightedSquare);
    const touchHighlightedSquare = useSelector(getTouchHighlightedSquare);
    // const dragType = useSelector(getDragType);

    const finalDragSquareRef = useRef(null);
    const selectedPiece = useRef(null);


    useEffect(() => {
        if (!gameBoard) {
            const newGameBoard = new Board();
            dispatch(receiveGameBoard(newGameBoard));
        } 
    }, [gameBoard, dispatch]);
    
    useEffect(() => {
        if (highlightedSquare){
            finalDragSquareRef.current = highlightedSquare;
        }
    }, [highlightedSquare]);

    useEffect(() => {
        if (touchHighlightedSquare){
            finalDragSquareRef.current = touchHighlightedSquare;
        }
    }, [touchHighlightedSquare]);

    useEffect(() => {
        if (!selectedSquare){
            selectedPiece.current = null;
        }
    }, [selectedSquare]);


    const handleTouchStart = (piece, e) => {
        e.preventDefault();

        const isClickMove = playClickMove(e);

        if (isClickMove){
            dispatch(removeSelected());
        } else {
            dispatch(receiveDragType('touch'))
            startActions(piece, e)
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd, { passive: false });
        }

    };

    const handleClickStart = (piece, e) => {
        e.preventDefault();

        const isClickMove = playClickMove(e);

        if (isClickMove){
            dispatch(removeSelected());
        } else {
            dispatch(receiveDragType('mouse'))
            startActions(piece, e)
            document.addEventListener('mousemove', handleMouseMove, { passive: false });
            document.addEventListener('mouseup', handleMouseEnd, { passive: false });
        }

    };

    const startActions = (piece, e) => {
        const [x, y] = getMousePos(e);
        const startSquareId = posToId(piece.getSquare());
        selectedPiece.current = piece;

        dispatch(receiveDraggingPiece(piece));
        dispatch(receiveDragPosition({x,y}));
        dispatch(receiveSelected(startSquareId));
        dispatch(receiveMoveOptions(piece.getMoves()));
    }

    function handleTouchMove (e) {
        e.preventDefault();
        moveActions(e);
    };

    function handleMouseMove (e) {
        e.preventDefault();
        moveActions(e);
    };

    function moveActions(e){
        const [x,y] = getMousePos(e);
        dispatch(receiveDragPosition({x,y}));
    }

    function handleTouchEnd (e) {
        e.preventDefault()
        
        endActions();

        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    function handleMouseEnd (e) {
        e.preventDefault()

        endActions();
    
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    };

    function endActions() {
        const endSquare = finalDragSquareRef.current;
        const piece = selectedPiece.current;
        if (endSquare){
            if (playMoveIfValid(piece, game, endSquare)){
                dispatch(removeSelected())
            }
            finalDragSquareRef.current = null;
            // selectedPiece.current = null;
        }

        dispatch(removeTouchHighlightedSquare())
        dispatch(removeHighlightedSquare());

        dispatch(removeDragPosition());
        dispatch(removeDraggingPiece());

    }

    function handleSquareClick(e){
        e.preventDefault();
        playClickMove(e);
    }

    function playClickMove(e){
        if (selectedPiece.current){
            const [x, y] = getMousePos(e);
            const squareId = findChessSquareFromCoordinates(x,y);
            return playMoveIfValid(selectedPiece.current, game, squareId);
        }
        return false
    }


    return (
        <div className="chess-board">
            {gameBoard && [...gameBoard].reverse().map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((piece, colIndex) => {
                        const squareInfo = STATIC_BOARD[rowIndex][colIndex]
                        const {file, rank, color} = squareInfo;
                        const id = `${file}${rank}`;
                        const selected = selectedSquare === id ? 'selected' : '';
                        let hightlight = '';
                        if (highlightedSquare === id){
                            hightlight = 'highlight';
                        } else if (touchHighlightedSquare === id){
                            hightlight = 'touchHighlight';
                        }

                        return (
                            <div className={`board-square ${color} ${selected} ${hightlight} `} key={id} id={id}
                                onClick={handleSquareClick}>

                                {
                                    piece &&
                                    <ChessPiece 
                                        piece={piece}
                                        onTouchDragStart={handleTouchStart}
                                        onClickDragStart={handleClickStart}
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
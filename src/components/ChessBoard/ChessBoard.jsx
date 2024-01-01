import React, { useEffect, useState } from 'react';
import "./ChessBoard.css"
import { posToId, indexToFile } from '../../Utils/posIdConversion'; 
import ChessSquare from '../ChessSquare/ChessSquare';
import { useDispatch, useSelector } from 'react-redux';
import { getGameBoard, receiveGameBoard } from '../../store/gameReducer';
import { Board } from '../../chessLogic/board';

function ChessBoard({  }) {

    const dispatch = useDispatch();
    const gameBoard = useSelector(getGameBoard);
    const [chessBoard, setChessBoard] = useState([])

    useEffect(() => {
        if (!gameBoard) {
            // console.log("Initializing game board");
            const newGameBoard = new Board();
            dispatch(receiveGameBoard(newGameBoard));
            initialiseBoard(newGameBoard)
        }
    }, [gameBoard, dispatch]);


    function updateBoard(){
        const updatedBoard = chessBoard;
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



    function initialiseBoard(gameBoard){
        let color = "brown";
        const board = [];
        for (let a = 7 ; a  >= 0 ; a-- ){
            board.push([]);
            const rank = a + 1;
            for (let b = 0 ; b  < 8 ; b++ ){

                const file = indexToFile(b);

                const square = {};

                square.id = `${file}${rank}`;
                square.className = `board-square ${color}`
                square.pieceObj = gameBoard.getPiece([a, b]);

                square.rankLabel = (file === "A") ? true : false;
                square.fileLabel = (rank === 1) ? true : false;

                board[board.length -1].push(square);
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
            {chessBoard.map((row, r) => (
                <div 
                    key={`rank-${r+1}`} 
                    id={`rank-${r+1}`} 
                    className={`board-row ${r+1}`}
                >
                    {row.map((square, c) => {
                        return (
                            <ChessSquare 
                                key={`${posToId([r,c])}`} 
                                // id={`${id}`} 
                                squareParams={square} 
                                updateBoard={updateBoard}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}


export default ChessBoard;
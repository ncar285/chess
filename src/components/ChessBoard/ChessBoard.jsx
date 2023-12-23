import React, { useEffect, useState } from 'react';
import { posToId, indexToFile } from '../../Utils/posIdConversion'; 
// import { startDrag, clickMove } from "./pieceMovement";
import "./ChessBoard.css"
import ChessSquare from '../ChessSquare/ChessSquare';
// import { Board } from '../../chessLogic/board';

function ChessBoard({ gameBoard }) {

    const [chessBoard, setChessBoard] = useState([]);


    useEffect(() => {
        let color = "brown";
        const board = [];
        // for (let a = 0 ; a  < 8 ; a++ ){
        for (let a = 7 ; a  >= 0 ; a-- ){
            board.push([]);
            const rank = a + 1;
            // for (let b = 0 ; b  < 8 ; b++ ){
            for (let b = 0 ; b  < 8 ; b++ ){

                const file = indexToFile(b);

                const square = {};

                square.id = `${rank}-${file}`;
                square.className = `board-square ${color}`
                square.pieceObj = gameBoard.getPiece([a, b]);

                square.rankLabel = (file === "a") ? true : false;
                square.fileLabel = (rank === 1) ? true : false;

                board[board.length -1].push(square);
                color = switchColor(color);
            }
            color = switchColor(color);
        }
        setChessBoard(board)
    }, [gameBoard]);


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
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}


export default ChessBoard;
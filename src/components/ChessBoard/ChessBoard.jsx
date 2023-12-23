import React, { useEffect, useState } from 'react';
import { posToId } from '../../Utils/posIdConversion'; 
// import { startDrag, clickMove } from "./pieceMovement";
import "./ChessBoard.css"
import ChessSquare from '../ChessSquare/ChessSquare';
import { Board } from '../../chessLogic/board';

function ChessBoard({ gameBoard }) {

    const [chessBoard, setChessBoard] = useState([]);


    useEffect(() => {
        let color = "brown";
        const board = [];
        for (let a = 0 ; a  < 8 ; a++ ){
            board.push([]);
            const rank = a + 1;
            for (let b = 0 ; b  < 8 ; b++ ){
                const square = {};
                square.pieceObj = gameBoard.getPiece([a, b]);
                const charCode = 'a'.charCodeAt(0) + b;
                const file = String.fromCharCode(charCode)
                square.id = `${rank}-${file}`;
                square.className = `board-square ${color}`;
                square.rankLabel = (file === "a") ? true : false;
                square.fileLabel = (rank === 1) ? true : false;
                board[a].push(square);
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
                    {row.map((squareParams, c) => {
                        const id = posToId([r,c]);
                        // console.log("id", id)
                        return (
                            <ChessSquare 
                                key={`${id}`} 
                                id={`${id}`} 
                                squareParams={squareParams} 
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}


export default ChessBoard;
import React, { useEffect, useState } from 'react';
import { posToId } from '../../Utils/posIdConversion'; 
import { startDrag, clickMove } from "./pieceMovement";
import "./ChessBoard.css"
import ChessSquare from '../ChessSquare/ChessSquare';

function ChessBoard({ gameBoard }) {
    const [pieces, setPieces] = useState([]);

    const [chessBoard, setChessBoard] = useState([]);


    useEffect(() => {
        const gameStateBoard = gameBoard.getBoard();
        let color = "brown";
        const board = [];
        for (let a = 0 ; a  < 8 ; a++ ){
            board.push([]);
            const rank = a + 1;
            for (let b = 0 ; b  < 8 ; b++ ){
                const square = {};
                square.pieceObj = gameStateBoard.getPiece([a, b]);
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


    useEffect(() => {
        const newPieces = [];
        const board = gameBoard.getBoard();

        board.forEach((row, a) => {
            row.forEach((_, b) => {
                const pieceObj = gameBoard.getPiece([a, b]);
                if (pieceObj) {
                    const name = `${pieceObj.getColor() === "white" ? "w_" : "b_"}${pieceObj.getType()}`;
                    const source = `../../assets/images/pieces/${name}.png`;
                    newPieces.push({ id: posToId([a, b]), imgSrc: source, pieceObj });
                }
            });
        });

        setPieces(newPieces);
    }, [gameBoard]);


    <div className="chess-board">
    {pieces.map(({ id, imgSrc, pieceObj }) => (
        <div key={id} id={id}>
            <img 
                src={imgSrc} 
                className="chess-piece"
                onMouseDown={(e) => startDrag(e, pieceObj)}
                onTouchStart={(e) => startDrag(e, pieceObj)} 
            />
        </div>
    ))}
    {/* Render the rest of your chess board here */}
</div>


// .map(({ id, imgSrc, pieceObj }) => (
//     <div key={id} id={id}>
//         <img 
//             src={imgSrc} 
//             className="chess-piece"
//             onMouseDown={(e) => startDrag(e, pieceObj)}
//             onTouchStart={(e) => startDrag(e, pieceObj)} 
//         />
//     </div>



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

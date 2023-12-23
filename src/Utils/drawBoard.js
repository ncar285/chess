import React, { useEffect } from 'react';
import { posToId } from "../chessLogic/utils";
import { startDrag, clickMove } from "./pieceMovement";
// import { gameBoard } from "../chessLogic/board";
// Assuming you have a way to import `addDragEventsToPiece`

function ChessBoard({ gameBoard }) {
    useEffect(() => {
        renderPiecesOnDOM(gameBoard);
    }, [gameBoard]);

    const renderSquare = (file, rank, color) => (
        <div
            id={`${rank}-${file}`}
            className={`board-square ${color}`}
            onClick={clickMove}
        >
            {file === 'a' && <div className="rank square-label">{rank}</div>}
            {rank === 1 && <div className="file square-label">{file}</div>}
        </div>
    );

    const renderPiecesOnDOM = (gameBoard) => {
        const board = gameBoard.getBoard();
        board.forEach((row, a) => {
            row.forEach((_, b) => {
                const pos = [a, b];
                const pieceObj = gameBoard.getPiece(pos);
                if (pieceObj) {
                    let name = pieceObj.getColor() === "white" ? "w_" : "b_";
                    name += pieceObj.getType();
                    const source = `./images/pieces/${name}.png`;
                    document.getElementById(posToId([a, b])).innerHTML = 
                        `<img src=${source} class="chess-piece" onmousedown="${e => startDrag(e, pieceObj)}" ontouchstart="${e => startDrag(e, pieceObj)}">`;
                }
            });
        });
    };

    const createBoard = () => {
        let board = [];
        let color = "brown";
        for (let a = 0; a < 8; a++) {
            let row = [];
            const rank = a + 1;
            for (let b = 0; b < 8; b++) {
                const charCode = 'a'.charCodeAt(0) + b;
                const file = String.fromCharCode(charCode);
                row.push(renderSquare(file, rank, color));
                color = color === "brown" ? "white" : "brown";
            }
            board.push(<div className={`board-row ${rank}`} key={rank}>{row}</div>);
            color = color === "brown" ? "white" : "brown";
        }
        return board;
    };

    return (
        <div className="chess-board">
            {createBoard()}
        </div>
    );
}

export default ChessBoard;
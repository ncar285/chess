import React from 'react';
import "./InactiveChessBoard.css"
import { FEN_PIECE_IMAGES, PIECE_NAMES } from '../../Utils/chessPieces.js';
import { useGame } from '../GameContext.jsx';

function InactiveChessBoard() {

    const BOARD = Array(8).fill(null).map(() => Array(8).fill(null));
    const startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const startingRows = startingPos.split('/');
    startingRows.forEach((fenRow, r) => {
        const expandedRow = fenRow.replace(/\d/g, num => '-'.repeat(num));
        [...expandedRow].forEach((fenChar, c) => {
            BOARD[r][c] = fenChar !== '-' ? fenChar : null;
        });
    });

    function squareLabel(file, rank){
        const labels = [];
        if (file === "A"){
            labels.push(<div className="rank square-label">{rank}</div>)
        }
        if (rank === 1){
            labels.push(<div className="file square-label">{file.toLowerCase()}</div>)
        }
        return labels
    }

    const {isDesktop} = useGame()

    return (
        <div className={`chess-board inactive ${isDesktop ? 'desktop' : 'non-desktop'}`}>
                {BOARD.map((row, reversedR) => (
                    <div key={reversedR} className="board-row">
                        {row.map((fenChar, c) => {
                            const r = 7 - reversedR;
                            const squareColor = (r + c) % 2 === 0 ? "brown" : "white";
                            const rank = r + 1
                            const charCode = 'A'.charCodeAt(0) + c;
                            const file =  String.fromCharCode(charCode)
                            const id = `${file}${rank}`;
                            return (
                                <div className={`board-square ${squareColor} `} key={id} id={id}>
                                    {
                                        fenChar &&
                                        <img 
                                            alt={PIECE_NAMES[fenChar]}
                                            src={FEN_PIECE_IMAGES[fenChar]} 
                                            className='chess-piece inactive'
                                        />
                                    }
                                    {squareLabel(file, rank)}
                                </div>
                            )
                        })}
                    </div>
                ))}
        </div>
    );
}


export default InactiveChessBoard;
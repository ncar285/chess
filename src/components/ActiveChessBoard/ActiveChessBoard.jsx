import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import './ActiveChessBoard.css'

const ActiveChessBoard = () => {



    return (
        <div id="game" onClick={handleClick}>
            <ChessBoard />
        </div>
    );
};

export default ActiveChessBoard;

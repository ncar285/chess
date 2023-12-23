import React from 'react';
import { Board } from '../../chessLogic/board';
import ChessBoard from '../ChessBoard/ChessBoard';
import './HomePage.css'

const HomePage = () => {

    const gameBoard = new Board(); // Initialize the game board

    return (
        <div id="game">
            <ChessBoard gameBoard={gameBoard} />
        </div>
    );
};

export default HomePage;

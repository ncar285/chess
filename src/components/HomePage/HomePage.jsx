import React, { useEffect } from 'react';
import Board from './chessLogic/Board';
import ChessBoard from '../src/Utils/ChessBoard';

const HomePage = () => {
    const gameBoard = new Board(); // Initialize the game board

    useEffect(() => {
        // Remove 'is-preload' class if it's present
        if (document.body.classList.contains('is-preload')) {
            document.body.classList.remove('is-preload');
        }
    }, []);

    return (
        <div>
            {/* Render the chess board component */}
            <ChessBoard gameBoard={gameBoard} />
        </div>
    );
};

export default HomePage;
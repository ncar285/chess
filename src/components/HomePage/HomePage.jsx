import React, { useEffect } from 'react';
import { Board } from '../../chessLogic/board';
import ChessBoard from '../ChessBoard/ChessBoard';

const HomePage = () => {
    const gameBoard = new Board(); // Initialize the game board

    useEffect(() => {
        // Remove 'is-preload' if present
        if (document.body.classList.contains('is-preload')) {
            document.body.classList.remove('is-preload');
        }
    }, []);

    return (
        <div>
            <ChessBoard gameBoard={gameBoard} />
        </div>
    );
};

export default HomePage;
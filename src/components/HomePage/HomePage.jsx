import React from 'react';
import { Board } from '../../chessLogic/board';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import './HomePage.css'
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getGameBoard, receiveGameBoard } from '../../store/gameReducer.js';

// export const gameBoard = new Board(); // Initialize the game board

const HomePage = () => {

    const dispatch = useDispatch();

    // const gameBoard = useSelector(getGameBoard);
    
    // const gameBoard = new Board(); // Initialize the game board
    
    const selectedSquare = useSelector(getSelected);
    // unselect squares when you click elsewhere
    function handleClick(e){
        e.preventDefault();
        const notOnBoard = e.target.id === 'game';
        const isEmptySquare = e.target.classList.contains('board-square');
        if (selectedSquare && isEmptySquare || notOnBoard){
            dispatch(removeSelected());
            dispatch(removeMoveOptions());
        }
    }

    return (
        <div id="game" onClick={handleClick}>
            <ChessBoard />
        </div>
    );
};

export default HomePage;

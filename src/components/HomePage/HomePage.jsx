import React from 'react';
import { Board } from '../../chessLogic/board';
import ChessBoard from '../ChessBoard/ChessBoard';
import './HomePage.css'
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {

    const dispatch = useDispatch();
    
    const gameBoard = new Board(); // Initialize the game board
    
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
            <ChessBoard gameBoard={gameBoard} />
        </div>
    );
};

export default HomePage;

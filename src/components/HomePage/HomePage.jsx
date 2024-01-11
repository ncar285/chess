import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import './HomePage.css'
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {

    const dispatch = useDispatch();
    
    const selectedSquare = useSelector(getSelected);
    
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

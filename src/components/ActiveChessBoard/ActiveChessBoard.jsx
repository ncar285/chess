import React, { useEffect } from 'react';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import './ActiveChessBoard.css'
import { useDispatch } from 'react-redux';
import { Board } from '../../chessLogic/board.js';
import { receiveGameBoard } from '../../store/gameReducer.js';

export const SESSION_GAME_KEY = 'ongoingGame';

const ActiveChessBoard = () => {

    const dispatch = useDispatch();



    useEffect(() => {
        try {
            const boardHash = JSON.parse(sessionStorage.getItem(SESSION_GAME_KEY));
            if (boardHash) {
                const ongoingGame = Board.createBoardFromHash(boardHash);
                dispatch(receiveGameBoard(ongoingGame));
            } else {
                const newGameBoard = new Board();
                dispatch(receiveGameBoard(newGameBoard));
                sessionStorage.setItem(SESSION_GAME_KEY, JSON.stringify(newGameBoard.getBoardHash()));
            }
        } catch (error) {
            console.error("Error loading game:", error);
        }
    }, [dispatch]);



    return (
        <ChessBoard />
    );
};

export default ActiveChessBoard;

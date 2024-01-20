import React, { useEffect } from 'react';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import './ActiveChessBoard.css'
import { useDispatch } from 'react-redux';
import { Board } from '../../chessLogic/board.js';
import { receiveBoard, receiveGame, receiveGameBoard, receiveGameType } from '../../store/gameReducer.js';
import { useGame } from '../GameContext.jsx';

export const SESSION_GAME_KEY = 'ongoingGame';

const ActiveChessBoard = () => {

    const dispatch = useDispatch();

    const { setIsActive } = useGame();

    useEffect(() => {
        setIsActive(true);
    }, [setIsActive]);

    useEffect(() => {
        try {
            const boardHash = JSON.parse(sessionStorage.getItem(SESSION_GAME_KEY));
            if (boardHash) {
                const ongoingGame = Board.createBoardFromHash(boardHash);
                dispatch(receiveGame(ongoingGame));
                dispatch(receiveBoard(ongoingGame.board));
            } else {
                const newGameBoard = new Board();
                dispatch(receiveGame(newGameBoard));
                dispatch(receiveBoard(newGameBoard.board));
                sessionStorage.setItem(SESSION_GAME_KEY, JSON.stringify(newGameBoard.getBoardHash()));
            }
        } catch (error) {
            console.error("Error loading game:", error);
        }
    }, [dispatch]);



    return (
        <ChessBoard/>
    );
};

export default ActiveChessBoard;

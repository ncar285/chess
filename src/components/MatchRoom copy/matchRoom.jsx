import './MatchRoom.css'
import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { useGame } from '../GameContext.jsx';
import PlayOptions from '../PlayOptions/PlayOptions.jsx';


const MatchRoom = () => {

    const dispatch = useDispatch();
    
    const selectedSquare = useSelector(getSelected);
    
    const { isDesktop } = useGame();

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
        <div id="match-room" className={`${isDesktop ? 'desktop' : 'phone'}`} onClick={handleClick}>
            {
                isDesktop && 
                <div className='desktop-game'>
                    <div className='desktop-board'>
                        <ChessBoard/>
                    </div>
                    <div className='desktop-play-options'>
                        <PlayOptions/>
                    </div>
                </div>
            }
            {
                !isDesktop && 
                <div className='phone-game'>
                    <div className='computer bench'></div>
                    <ActiveChessBoard/>
                    <div className='user bench'></div>
                </div>
            }
        </div>
    );
};

export default MatchRoom;
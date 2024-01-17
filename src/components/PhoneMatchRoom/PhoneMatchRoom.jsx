import './PhoneMatchRoom.css'
import React from 'react';
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { useGame } from '../GameContext.jsx';

const PhoneMatchRoom = ({ boardComponent }) => {

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
        <div id="match-room-phone" className={`${isDesktop ? 'desktop' : 'phone'}`} onClick={handleClick}>
            <div className='phone-game'>
                <div className='computer bench'></div>
                { boardComponent }
                <div className='user bench'></div>
            </div>
        </div>
    );
};

export default PhoneMatchRoom;
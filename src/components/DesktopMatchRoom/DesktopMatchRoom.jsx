import './DesktopMatchRoom.css'
import React from 'react';
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer.js';
import { useDispatch, useSelector } from 'react-redux';


const DesktopMatchRoom = ({ boardComponent, menuComponent }) => {

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
        <div id="match-room-desktop" onClick={handleClick}>
            <div className='desktop-game'>
                <div className='desktop-board'>
                    {boardComponent}
                </div>
                <div className='desktop-play-options'>
                    {menuComponent}
                </div>
            </div>
        </div>
    );
};

export default DesktopMatchRoom;
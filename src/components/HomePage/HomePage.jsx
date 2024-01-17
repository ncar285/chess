import React from 'react';
import './HomePage.css'
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useGame } from '../GameContext.jsx';
import PlayOptions from '../PlayOptions/PlayOptions.jsx';
import DesktopMatchRoom from '../DesktopMatchRoom/DesktopMatchRoom.jsx';


const HomePage = () => {

    const dispatch = useDispatch();
    
    const selectedSquare = useSelector(getSelected);
    
    // const { isDesktop } = useGame();
    const isDesktop = false;


    return (
        <>
            {
                isDesktop && 
                <DesktopMatchRoom
                    boardComponent={<ChessBoard />} 
                    menuComponent={<PlayOptions />} 
                />
            }
            {
                !isDesktop && 
                <div className='phone-homepage'>
                    <PlayOptions/>
                </div>
            }
        </>
    );
};

export default HomePage;

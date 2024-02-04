import './HomePage.css'
import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import { useGame } from '../GameContext.jsx';
import PlayOptions from '../PlayOptions/PlayOptions.jsx';
import DesktopMatchRoom from '../DesktopMatchRoom/DesktopMatchRoom.jsx';
import InactiveChessBoard from '../InactiveChessBoard/InactiveChessBoard.jsx';


const HomePage = () => {

    const { isDesktop } = useGame();
    // const isDesktop = false;

    return (
        <>
            {
                isDesktop && 
                <DesktopMatchRoom
                    boardComponent={<InactiveChessBoard />} 
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

import './ComputerOpponent.css'
import React from 'react';
import PhoneMatchRoom from '../PhoneMatchRoom/PhoneMatchRoom';
import { useGame } from '../GameContext';
import PlayOptions from '../PlayOptions/PlayOptions';
import DesktopMatchRoom from '../DesktopMatchRoom/DesktopMatchRoom';
import ActiveChessBoard from '../ActiveChessBoard/ActiveChessBoard';

const ComputerOpponent = () => {

    // include stockfish API logic here

    // think about computer move speed
    
    const { isDesktop } = useGame();

    return (
        <div className='computer-opponent'>
            {
                isDesktop && 
                <DesktopMatchRoom
                    boardComponent={<ActiveChessBoard />} 
                    menuComponent={<PlayOptions />} 
                />
            }
            {
                !isDesktop && 
                <PhoneMatchRoom
                    boardComponent={<ActiveChessBoard />} 
                />
            }
        </div>
    );
};

export default ComputerOpponent;

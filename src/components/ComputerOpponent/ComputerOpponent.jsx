import './ComputerOpponent.css'
import React from 'react';
import ActiveChessBoard from '../ActiveChessBoard/ActiveChessBoard';
import PhoneMatchRoom from '../PhoneMatchRoom/PhoneMatchRoom';
import { useGame } from '../GameContext';
import PlayOptions from '../PlayOptions/PlayOptions';
import DesktopMatchRoom from '../DesktopMatchRoom/DesktopMatchRoom';

const ComputerOpponent = () => {

    // include stockfish API logic here

    // think about computer move speed
    
    const { isDesktop } = useGame();

    return (
        <div className='computer-opponent'>
            {
                isDesktop && 
                <DesktopMatchRoom
                    boardComponent={<ComputerOpponent />} 
                    menuComponent={<PlayOptions />} 
                />
            }
            {
                !isDesktop && 
                <PhoneMatchRoom
                    boardComponent={<ComputerOpponent />} 
                />
            }
        </div>
    );
};

export default ComputerOpponent;

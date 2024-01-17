import './HumanOpponent.css'
import React from 'react';
import ActiveChessBoard from '../ActiveChessBoard/ActiveChessBoard';
import PlayOptions from '../PlayOptions/PlayOptions';
import PhoneMatchRoom from '../PhoneMatchRoom/PhoneMatchRoom';
import DesktopMatchRoom from '../DesktopMatchRoom/DesktopMatchRoom';
import { useGame } from '../GameContext';

const HumanOpponent = () => {

    // include websockets stuff here

    const { isDesktop } = useGame();

    return (
        <div className='human-opponent'>
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

export default HumanOpponent;

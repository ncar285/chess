import './Playground.css'
import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';
import PlayOptions from '../PlayOptions/PlayOptions';
import PhoneMatchRoom from '../PhoneMatchRoom/PhoneMatchRoom';
import { useGame } from '../GameContext';
import DesktopMatchRoom from '../DesktopMatchRoom/DesktopMatchRoom';

const Playground = () => {

    // include things like freely removing and adding pieces
    
    // return (
    //     <div className='playground'>
    //         <div className='workspace opponent'></div>
    //         <ChessBoard />
    //         <div className='workspace user'></div>
    //     </div>
    // );

    const { isDesktop } = useGame();

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
                <PhoneMatchRoom
                    boardComponent={<ChessBoard />} 
                />
            }
        </>
    );
};

export default Playground;

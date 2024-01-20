import './ComputerGameOptions.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import StopWatch from '../StopWatch/StopWatch';

const ComputerGameOptions = ({opponentTime, userTime}) => {

    // useEffect(()=>{

    //     let intervalId;

    //     intervalId = setInterval(() => {
    //         if (playerOneTime && playerTwoTime) {
    //             setPlayerOneTime(time => time - 1);
    //             setPlayerTwoTime(time => time - 1);
    //             sessionStorage.setItem("player-one-time",JSON.stringify(playerOneTime - 1));
    //             sessionStorage.setItem("player-one-time",JSON.stringify(playerTwoTime - 1));
    //         }
    //     }, 1000);
    
    //     return () => clearInterval(intervalId);

    // },[playerOneTime, playerTwoTime])



    return (
        <div className="game-options-container">
            <div className='player-2-stopwatch'>
                <StopWatch time={opponentTime}/>
            </div>

            <div>Middle content</div>


            <div className='player-1-stopwatch'>
                <StopWatch time={userTime}/>
            </div>
        </div>
    );
}

export default ComputerGameOptions;
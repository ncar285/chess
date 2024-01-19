import './ComputerGameOptions.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGame } from '../GameContext';
import StopWatch from '../StopWatch/StopWatch';

export const TIME_VALUES = ['1|0','1|1','2|1','3|0','3|2','5|0','10|0','15|10','30|0','inf'];

export function displayTime(timeControl){
    if (!timeControl) return false;
    if (timeControl === 'inf') return 'No Limit'
    const [limit, increment] = timeControl.split('|');
    return (increment === '0') ? limit + ' min' : timeControl;
}


const ComputerGameOptions = () => {

    const timeControl = useSelector(state => state.game.timeControl);

    const [playerOneTime, setPlayerOneTime] = useState(null);
    const [playerTwoTime, setPlayerTwoTime] = useState(null);


    useEffect(() => {
        let intervalId;
        
        try {
            const playerOne = JSON.parse(sessionStorage.getItem("player-one-time"));
            const playerTwo = JSON.parse(sessionStorage.getItem("player-one-time"));

    
            if (playerOne) {
                setPlayerOneTime(parseInt(playerOne));
            } else {
                const [min, _] = timeControl.split('|');
                setPlayerOneTime(min * 60);
            }
    
            if (playerTwo) {
                setPlayerTwoTime(parseInt(playerTwo));
            } else {
                const [min, _] = timeControl.split('|');
                setPlayerTwoTime(min * 60);
            }
        } catch (error) {
            console.error("Error setting time:", error);
        }
    
        // Store the interval ID
        intervalId = setInterval(() => {
            if (playerOneTime && playerTwoTime) {
                setPlayerOneTime(time => time - 1);
                setPlayerTwoTime(time => time - 1);
            }
        }, 1000);
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="game-options-container">
            <div className='player-2-stopwatch'>
                <StopWatch time={playerTwoTime}/>
            </div>


            <div className='player-1-stopwatch'>
                <StopWatch time={playerOneTime}/>
            </div>
        </div>
    );
}

export default ComputerGameOptions;
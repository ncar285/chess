import './ComputerGameOptions.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import StopWatch from '../StopWatch/StopWatch';

const ComputerGameOptions = () => {

    // const timeControl = useSelector(state => state.game.timeControl);

    // const [playerOneTime, setPlayerOneTime] = useState(null);
    // const [playerTwoTime, setPlayerTwoTime] = useState(null);


    // useEffect(() => {
        
    //     try {
    //         const playerOne = JSON.parse(sessionStorage.getItem("player-one-time"));
    //         const playerTwo = JSON.parse(sessionStorage.getItem("player-two-time"));

    
    //         if (playerOne) {
    //             setPlayerOneTime(parseInt(playerOne));
    //         } else {
    //             const [min, _] = timeControl.split('|');
    //             setPlayerOneTime(min * 60);
    //         }
    
    //         if (playerTwo) {
    //             setPlayerTwoTime(parseInt(playerTwo));
    //         } else {
    //             const [min, _] = timeControl.split('|');
    //             setPlayerTwoTime(min * 60);
    //         }
    //     } catch (error) {
    //         console.error("Error setting time:", error);
    //     }
    
    // }, []);

    useEffect(()=>{

        let intervalId;

        intervalId = setInterval(() => {
            if (playerOneTime && playerTwoTime) {
                setPlayerOneTime(time => time - 1);
                setPlayerTwoTime(time => time - 1);
                sessionStorage.setItem("player-one-time",JSON.stringify(playerOneTime - 1));
                sessionStorage.setItem("player-one-time",JSON.stringify(playerTwoTime - 1));
            }
        }, 1000);
    
        return () => clearInterval(intervalId);

    },[playerOneTime, playerTwoTime])

    console.log("playerOneTime", playerOneTime)
    console.log("playerTwoTime", playerTwoTime)



    return (
        <div className="game-options-container">
            <div className='player-2-stopwatch'>
                <StopWatch time={playerTwoTime}/>
            </div>

            <div>Middle content</div>


            <div className='player-1-stopwatch'>
                <StopWatch time={playerOneTime}/>
            </div>
        </div>
    );
}

export default ComputerGameOptions;
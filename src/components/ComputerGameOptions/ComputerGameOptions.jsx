import './ComputerGameOptions.css';
import React from 'react';
import StopWatch from '../StopWatch/StopWatch';

const ComputerGameOptions = ({opponentTime, userTime}) => {

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
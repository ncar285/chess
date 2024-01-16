import './HumanOpponent.css'
import React from 'react';
import ActiveChessBoard from '../ActiveChessBoard/ActiveChessBoard';

const HumanOpponent = () => {

    // include websockets stuff here
    
    return (
        <div className='human-opponent'>
            <div className='opponent bench'></div>
            <ActiveChessBoard/>
            <div className='user bench'></div>
        </div>
    );
};

export default HumanOpponent;

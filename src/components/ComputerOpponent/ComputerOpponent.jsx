import './ComputerOpponent.css'
import React from 'react';
import ActiveChessBoard from '../ActiveChessBoard/ActiveChessBoard';

const ComputerOpponent = () => {

    // include stockfish API logic here

    // think about computer move speed
    
    return (
        <div className='computer-opponent'>
            <div className='computer bench'></div>
            <ActiveChessBoard/>
            <div className='user bench'></div>
        </div>
    );
};

export default ComputerOpponent;

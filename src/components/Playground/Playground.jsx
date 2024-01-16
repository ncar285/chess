import './Playground.css'
import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';

const Playground = () => {

    // include things like freely removing and adding pieces
    
    return (
        <div className='playground'>
            <div className='workspace opponent'></div>
            <ChessBoard />
            <div className='workspace user'></div>
        </div>
    );
};

export default Playground;

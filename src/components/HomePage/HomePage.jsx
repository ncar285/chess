import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard.jsx';
import './HomePage.css'
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import ActiveChessBoard from '../ActiveChessBoard/ActiveChessBoard.jsx';
import { useGame } from '../GameContext.jsx';
import PlayOptions from '../PlayOptions/PlayOptions.jsx';

const HomePage = () => {

    const dispatch = useDispatch();
    
    const selectedSquare = useSelector(getSelected);
    
    const { isDesktop } = useGame();
    // const isDesktop = false

    function handleClick(e){
        e.preventDefault();
        const notOnBoard = e.target.id === 'game';
        const isEmptySquare = e.target.classList.contains('board-square');
        if (selectedSquare && isEmptySquare || notOnBoard){
            dispatch(removeSelected());
            dispatch(removeMoveOptions());
        }
    }


    return (

        <div id="home-page" onClick={handleClick}>

            {
                isDesktop && 
                <div className='desktop-homepage'>
                    <div className='desktop-practice-board'>
                        <ChessBoard/>
                        {/* <div className='temp-chessBoard'></div> */}
                    </div>
                    <div className='desktop-play-options'>
                        <PlayOptions/>
                    </div>
                </div>
            }
            {
                !isDesktop && 
                <div className='phone-homepage'>
                    <PlayOptions/>
                </div>
            }

            {/* <ChessBoard /> */}
            {/* <ActiveChessBoard/> */}
        </div>
    );
};

export default HomePage;

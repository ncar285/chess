import React, { useState } from 'react';
// import ChessPieceImage from '../../chessPieces/smallModern/svg/3.svg';
import PlayImage from '../../assets/play-image.svg'
import { FaHandHolding } from "react-icons/fa6";
import './PlayOptions.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { openSelectTimeModal } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { receiveTimeControl } from '../../store/gameReducer';
import { useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";

export const TIME_VALUES = ['1|0','1|1','2|1','3|0','3|2','5|0','10|0','15|10','30|0','inf'];

export function displayTime(timeControl){
    if (!timeControl) return false;
    if (timeControl === 'inf') return 'No Limit'
    const [limit, increment] = timeControl.split('|');
    return (increment === '0') ? limit + ' min' : timeControl;
}

const PlayOptions = () => {
    const history = useHistory()

    // const [timeControl, setTimeControl] = useState("10|0");

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(receiveTimeControl("10|0"));
    },[dispatch])

    const timeControl = useSelector(state => state.game.timeControl);


    console.log("TIME_CONTROL", timeControl);

    function playComputer(){
        sessionStorage.setItem("ongoingGame", null)
        history.push('/play-computer');
    }

    function playground(){
        sessionStorage.setItem("ongoingGame", null)
        history.push('/playground');
    }

    function handleTimeSelect(){
        dispatch(openSelectTimeModal());
    }

    return (
        <div className='play-options-container'>
            <header className='play-options-header'>
                <h1>Play</h1>
            </header>
            <img src={PlayImage} alt="Chess Piece" className='play-options-logo' />
            <form className='play-options-form'>
                <button className='dropdown' onClick={handleTimeSelect}>
                    <IoIosArrowDown className='timeControl-icon hidden'/>
                    {displayTime(timeControl) || '10 min'}
                    <IoIosArrowDown className='timeControl-icon'/>
                </button>
                <button className='option' onClick={playComputer}>
                    vs Computer
                </button>
                <button className='option' onClick={playground}>
                    Playground
                </button>
            </form>
        </div>
    );
}

export default PlayOptions;
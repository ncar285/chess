import './PlayOptions.css';
import React, { useState } from 'react';
// import ChessPieceImage from '../../chessPieces/smallModern/svg/3.svg';
import PlayImage from '../../assets/play-image.svg'
import { FaHandHolding } from "react-icons/fa6";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { openSelectTimeModal } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { receiveTimeControl } from '../../store/gameReducer';
import { useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { GiLightningHelix } from "react-icons/gi";
import { RxLapTimer } from "react-icons/rx";
import { LuCalendarDays } from "react-icons/lu";
import { GiBulletBill } from "react-icons/gi";

export const TIME_VALUES = ['1|0','1|1','2|1','3|0','3|2','5|0','10|0','15|10','30|0','inf'];

export function displayTime(timeControl){
    if (!timeControl) return false;
    if (timeControl === 'inf') return 'No Limit'
    const [limit, increment] = timeControl.split('|');
    return (increment === '0') ? limit + ' min' : timeControl;
}

const icon = (timeVal) => {
    console.log("time val: ", timeVal)
    if (!timeVal) return false;
    const [mins,_] = timeVal.split('|');
    if (mins <= 2){
        console.log(" return bullet")
        return (<GiBulletBill className="STM-icon bullet"/>)
    } else if (mins > 2 && mins <= 5){
        console.log(" return lightnming")
        return (<GiLightningHelix className="STM-icon blitz"/>)
    } else if (mins > 5 && mins <= 30){
        console.log(" return timer")
        return (<RxLapTimer className="STM-icon rapid"/>)
    } else if (mins === 'inf'){
        console.log(" return calendar")
        return (<LuCalendarDays className="STM-icon long"/>)
    }
}

const PlayOptions = () => {
    const history = useHistory()

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(receiveTimeControl("10|0"));
    },[dispatch])

    const timeControl = useSelector(state => state.game.timeControl);


    function playFriend(){
        sessionStorage.setItem("ongoingGame", null)
        history.push('/play-friend');
    }

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
                    <div className='inner-option-button'>
                        {icon(timeControl) && icon(timeControl)}
                        {displayTime(timeControl) && displayTime(timeControl)}
                    </div>
                    <IoIosArrowDown className='timeControl-icon'/>
                </button>
                <button className='start-game' onClick={playFriend}>
                    Start Game
                </button>
                <button className='option' onClick={playFriend}>
                    Play a Friend
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
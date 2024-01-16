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

const STYLES = ['Play a Friend', 'vs Computer', 'Playground']

const URLS = {
    'Play a Friend': '/play-friend',
    'vs Computer': '/play-computer',
    'Playground': '/playground'
}

const PlayOptions = () => {
    const history = useHistory()

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(receiveTimeControl("10|0"));
    },[dispatch])

    const timeControl = useSelector(state => state.game.timeControl);

    const [gameStyle, setGameStyle] = useState(null)

    const [prevTimeControl, setPrevTimeControl] = useState(null);

    const [gameStyleWarning, setGameStyleWarning] = useState(null);

    function startGame(){
        if (!gameStyle){
            setGameStyleWarning(true);
        } else {
            sessionStorage.setItem("ongoingGame", null)
            history.push(URLS[gameStyle]);
        }
    }

    const selectStyle = (e) => {

        // if we forcefully set time control to inf, restore
        if (prevTimeControl){
            dispatch(receiveTimeControl(prevTimeControl));
            setPrevTimeControl(null);
        }

        setGameStyle(e.target.value);
        setGameStyleWarning(false)

        // force no time limit for playground
        if (e.target.value === 'Playground'){
            setPrevTimeControl(timeControl);
            dispatch(receiveTimeControl("inf"));
        }
    }

    const isSelected = (style) => gameStyle === style ? 'selected' : '';


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
                <button disabled={gameStyle === 'Playground'} className='dropdown' onClick={handleTimeSelect}>
                    <IoIosArrowDown className='timeControl-icon hidden'/>
                    <div className='inner-option-button'>
                        {icon(timeControl) && icon(timeControl)}
                        {displayTime(timeControl) && displayTime(timeControl)}
                    </div>
                    <IoIosArrowDown className={`timeControl-icon ${gameStyle === 'Playground' ? 'hidden' : ''}`}/>
                </button>
                <button  className='start-game' onClick={startGame}>
                    Start Game
                </button>
                {gameStyleWarning && <p className='select-game-type-warning'>Please select a game type below</p>}
                { STYLES.map(style => (
                    <>
                        <button value={style} className={`option ${isSelected(style)}`} onClick={selectStyle}>
                            {style}
                        </button>
                    </>
                ))}
            </form>
        </div>
    );
}

export default PlayOptions;
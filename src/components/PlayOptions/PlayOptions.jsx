import React, { useState } from 'react';
// import ChessPieceImage from '../../chessPieces/smallModern/svg/3.svg';
import PlayImage from '../../assets/play-image.svg'
import { FaHandHolding } from "react-icons/fa6";
import './PlayOptions.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { openSelectTimeModal } from '../../store/uiReducer';
import { useDispatch } from 'react-redux';

const timeDisplayValues = {
    "1|0": '1 min',
    '1|1': '1|1',
    '2|1': '2|1',
    "3|0": '3 minn',
    '15|10': '15|10',
    '30|0': '30 min',
    "10|0": '10 min',
    '15|10': '15|10',
    '30|0': '30 min'
        
}


const PlayOptions = () => {
    const history = useHistory()

    const [timeControl, setTimeControl] = useState("10|0");

    const dispatch = useDispatch();


    function playComputer(e){
        sessionStorage.setItem("ongoingGame", null)
        history.push('/play');
    }

    function handleTimeSelect(){
        dispatch(openSelectTimeModal());
    }

    function displayTime(timeControl){
        const [limit, increment] = timeControl.split('|');
        return (increment === '0') ? limit + ' min' : timeControl;
    }

    return (
        <div className='play-options-container'>
            <header className='play-options-header'>
                <h1>Play</h1>
            </header>
            <img src={PlayImage} alt="Chess Piece" className='play-options-logo' />
            <form className='play-options-form'>
                <button className='button dropdown' onClick={handleTimeSelect}>
                    {displayTime(timeControl)}
                </button>
                <button onClick={playComputer}>Computer</button>
                {/* <button>Play a Friend</button> */}
            </form>
        </div>
    );
}

export default PlayOptions;
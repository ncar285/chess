import React, { useState } from 'react';
// import ChessPieceImage from '../../chessPieces/smallModern/svg/3.svg';
import PlayImage from '../../assets/play-image.svg'
import { FaHandHolding } from "react-icons/fa6";
import './PlayOptions.css';

const PlayOptions = () => {
    const [timeControl, setTimeControl] = useState("10|0");

    const updateSelectedTimeControl = (e) => {
        setTimeControl(e.target.value);
    }

    return (
        <div className='play-options-container'>
            <h1>Play Chess</h1>
            <img src={PlayImage} alt="Chess Piece" className='play-options-logo' />
            <form className='play-options-form'>
                <select name="timeControl" onChange={updateSelectedTimeControl}>
                    <option value="10|0">10 min</option>
                    {/* Add other time control options here */}
                </select>
                <button>Computer</button>
                <button>Play a Friend</button>
            </form>
        </div>
    );
}

export default PlayOptions;
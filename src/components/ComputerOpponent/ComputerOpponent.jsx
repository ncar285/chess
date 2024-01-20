import './ComputerOpponent.css'
import React, { useEffect, useState } from 'react';
import PhoneMatchRoom from '../PhoneMatchRoom/PhoneMatchRoom';
import { useGame } from '../GameContext';
import DesktopMatchRoom from '../DesktopMatchRoom/DesktopMatchRoom';
import ActiveChessBoard from '../ActiveChessBoard/ActiveChessBoard';
import ComputerGameOptions from '../ComputerGameOptions/ComputerGameOptions';
import { useSelector } from 'react-redux';

const ComputerOpponent = () => {

    const timeControl = useSelector(state => state.game.timeControl);

    const [userTime, setUserTime] = useState(null);
    const [opponentTime, setOpponentTime] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(null);
    // const [userColor, setUserColor] = useState(null);

    const { setUserColor } = useGame();

    const randomSelect = (array) => array[Math.floor(Math.random() * array.length)];

    // when component mounts, set the player stopwatches, 
    // randomly assign colors to the players
    useEffect(()=>{
        const color = randomSelect(['white', 'black']);
        
        setUserColor(color);
        setCurrentTurn(color === 'white');

        const [min, _] = timeControl.split('|');
        const initialTime = parseInt(min, 10) * 60;

        setUserTime(initialTime);
        setOpponentTime(initialTime);
    },[])



    // reset the time on a refresh
    useEffect(() => {
        try {
            const playerOne = JSON.parse(sessionStorage.getItem("user-time"));
            const playerTwo = JSON.parse(sessionStorage.getItem("opponent-time"));
            if (playerOne) {
                setUserTime(parseInt(playerOne));
            } else {
                const [min, _] = timeControl.split('|');
                setUserTime(min * 60);
            }
    
            if (playerTwo) {
                setOpponentTime(parseInt(playerTwo));
            } else {
                const [min, _] = timeControl.split('|');
                setOpponentTime(min * 60);
            }
        } catch (error) {
            console.error("Error setting time:", error);
        }
    }, []);



    // include stockfish API logic here

    // think about computer move speed
    
    const { isDesktop } = useGame();

    return (
        <div className='computer-opponent'>
            {
                isDesktop && 
                <DesktopMatchRoom
                    boardComponent={<ActiveChessBoard />} 
                    menuComponent={<ComputerGameOptions opponentTime={opponentTime} userTime={userTime} />} 
                />
            }
            {
                !isDesktop && 
                <PhoneMatchRoom
                    boardComponent={<ActiveChessBoard />} 
                />
            }
        </div>
    );
};

export default ComputerOpponent;

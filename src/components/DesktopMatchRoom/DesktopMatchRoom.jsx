import './DesktopMatchRoom.css'
import React from 'react';
import { getSelected, removeMoveOptions, removeSelected } from '../../store/uiReducer.js';
import { useDispatch, useSelector } from 'react-redux';
// import StopWatch from '../StopWatch/StopWatch.jsx';
import GamePanel from '../GamePanel/GamePanel.jsx';


const DesktopMatchRoom = ({ boardComponent, menuComponent }) => {

    const dispatch = useDispatch();
    
    const selectedSquare = useSelector(getSelected);

    function handleClick(e){
        e.preventDefault();
        const notOnBoard = e.target.id === 'game';
        const isEmptySquare = e.target.classList.contains('board-square');
        if (selectedSquare && isEmptySquare || notOnBoard){
            dispatch(removeSelected());
            dispatch(removeMoveOptions());
        }
    }

    // const timeControl = useSelector(state => state.game.timeControl);

    // const game = useSelector(state => state.game.game);

    // const [userTime, setUserTime] = useState(null);
    // const [opponentTime, setOpponentTime] = useState(null);

    // const { userColor, setUserColor } = useGame();

    // const randomSelect = (array) => array[Math.floor(Math.random() * array.length)];

    // // when component mounts, set the player stopwatches, 
    // // randomly assign colors to the players
    // useEffect(()=>{
    //     const color = randomSelect(['white', 'black']);
    //     setUserColor(color);

    //     if (timeControl){
    //         const min = timeControl.split('|')[0];
    //         const initialTime = parseInt(min, 10) * 60;
    //         setUserTime(initialTime);
    //         setOpponentTime(initialTime);
    //     }

    //     // play the start sound
    //     const gameStartSound = new Audio(GAME_SOUNDS.gameStart);
    //     gameStartSound.play()
    // },[])


    // // reset the time on a refresh
    // useEffect(() => {
    //     try {
    //         const playerOne = JSON.parse(sessionStorage.getItem("user-time"));
    //         const playerTwo = JSON.parse(sessionStorage.getItem("opponent-time"));

    //         const initialTime = timeControl ? timeControl.split('|')[0] * 60 : null;

    //         if (playerOne) {
    //             setUserTime(parseInt(playerOne));
    //         } else {
    //             if (initialTime) setUserTime(initialTime);
    //         }
    //         if (playerTwo) {
    //             setOpponentTime(parseInt(playerTwo));
    //         } else {
    //             if (initialTime) setOpponentTime(initialTime);
    //         }
    //     } catch (error) {
    //         console.error("Error setting time:", error);
    //     }
    // }, []);


    // // decrement a the player's turn's time
    // useEffect(()=>{

    //     let intervalId;

    //     intervalId = setInterval(() => {
        
    //         const isOurMove = game.whosMove() === userColor;
    //         if (isOurMove && userTime){   // i.e. the main user's turn
    //             setUserTime(time => time - 1);
    //             sessionStorage.setItem("user-time",JSON.stringify(userTime - 1));
    //         } else if(opponentTime){
    //             setOpponentTime(time => time - 1);
    //             sessionStorage.setItem("opponent-time",JSON.stringify(opponentTime - 1));
    //         }
    //     }, 1000);
    
    //     return () => clearInterval(intervalId);

    // },[userTime, opponentTime, game, userColor])

    return (
        <div className='desktop-game' onClick={handleClick} >

            <div className='side-nav'>

            </div>

            <div className='centered-game-content'>

                <div className='match-container'>
                    <div className='temp-game-panel'>
                        <GamePanel user={false} />
                    </div>
                    <div className='desktop-board'>
                        <div className='temp-board'>
                            {boardComponent}
                        </div>
                    </div>
                    <div className='temp-game-panel'>
                        <GamePanel user={true} />
                    </div>
                </div>
                <div className='desktop-play-options'>
                    <div className='temp-menu'>
                        {menuComponent} 
                    </div>
                </div>
            </div>


        </div>
    );
};

export default DesktopMatchRoom;
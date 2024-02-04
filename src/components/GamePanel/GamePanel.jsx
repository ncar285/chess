import StopWatch from '../StopWatch/StopWatch'
import './GamePanel.css'

export default function GamePanel({ user, time }){
    return (
        <div className={`game-panel ${user ? 'user' : 'opponent'}`}>
            {/* <UserIcon/> */}
            <div className='userIcon'>
                <div className='profile-image'></div>
                <p>Opponent</p>
            </div>
            <StopWatch 
            // time={opponentTime}
            time={10}
        />
        </div>
    )
}
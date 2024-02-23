import StopWatch from '../StopWatch/StopWatch'
import { CgProfile } from "react-icons/cg";
import './GamePanel.css'

export default function GamePanel({ user, time }){
    return (

        <div className="game-panel-container">
        
        <div className={`game-panel ${user ? 'user' : 'opponent'}`}>
            {/* <UserIcon/> */}

            
            <div className='userIcon'>
                <div className='profile-image'>
                    <CgProfile className='default-icon'/>
                </div>
                {
                    user ? 
                    <p>Me</p>
                    :
                    <p>Opponent</p>
                }
            </div>
            <StopWatch 
            // time={opponentTime}
            time={10}
            />
        </div>

        </div>
    )
}
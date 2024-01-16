import { RxCross2 } from "react-icons/rx";
import './SelectTimeModal.css'
import { useDispatch, useSelector } from "react-redux";
import { exitSelectTimeModal } from "../../store/uiReducer";
import { GiSupersonicBullet } from "react-icons/gi";
import { GiLightningHelix } from "react-icons/gi";
import { RxLapTimer } from "react-icons/rx";
import { LuCalendarDays } from "react-icons/lu";
import { GiBulletBill } from "react-icons/gi";

const SelectTimeModal = () => {
    const display = useSelector(state => state.ui.selectTimeModal);
    const modalClass = `select-time-modal ${display ? 'active' : ''}`;

    const dispatch = useDispatch();

    function handleExitModal(){
        dispatch(exitSelectTimeModal());
    }

    return (
        <div className={modalClass}>
            <header className='STM-header'>
                <div className="exit-cross">
                    <RxCross2 onClick={handleExitModal} className="cross-icon"/>
                </div>
                <h1>Choose Time</h1>
                <div className="exit-cross invisible"></div>
            </header>
            <div className="STM-body">
                <div className="STM-section">
                    <h2><GiBulletBill className="STM-icon bullet"/>Bullet</h2>
                    <div className="time-category">
                        <button className="button">1 min</button>
                        <button className="button">1|1</button>
                        <button className="button">2|0</button>
                    </div>
                </div>
                <div className="STM-section">
                    <h2><GiLightningHelix className="STM-icon blitz"/> Blitz</h2>
                    <div className="time-category">
                        <button className="button">1|1</button>
                        <button className="button">3 min</button>
                        <button className="button">2|0</button>
                    </div>
                </div>
                <div className="STM-section">
                    <h2><RxLapTimer className="STM-icon rapid"/> Rapid</h2>
                    <div className="time-category">
                        <button className="button">1 min</button>
                        <button className="button">1|1</button>
                        <button className="button">2|0</button>
                    </div>
                </div>
                <div className="STM-section">
                    <h2><LuCalendarDays className="STM-icon long"/> Long</h2>
                    <div className="time-category">
                        <button className="button">No limit</button>
                        <button className="button hidden"></button>
                        <button className="button hidden"></button>
                    </div>
                </div>
            </div>
            
        </div>

    );
}


export default SelectTimeModal
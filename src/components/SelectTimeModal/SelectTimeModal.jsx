import './SelectTimeModal.css'
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { exitSelectTimeModal } from "../../store/uiReducer";
import { GiLightningHelix } from "react-icons/gi";
import { RxLapTimer } from "react-icons/rx";
import { LuCalendarDays } from "react-icons/lu";
import { GiBulletBill } from "react-icons/gi";
import { receiveTimeControl } from "../../store/gameReducer";
import { displayTime } from "../PlayOptions/PlayOptions";

export const TIME_CATEGORIES = ['Bullet', 'Blitz','Rapid','No Limit'];

const TIME_OPTIONS = {
    'Bullet': ['1|0','1|1','2|1'],
    'Blitz': ['3|0','3|2','5|0'],
    'Rapid': ['10|0','15|10','30|0'],
    'No Limit': ['inf'],
};

export const HEADERS = {
    'Bullet': (<h2><GiBulletBill className="STM-icon bullet"/>Bullet</h2>),
    'Blitz': (<h2><GiLightningHelix className="STM-icon blitz"/> Blitz</h2>),
    'Rapid': (<h2><RxLapTimer className="STM-icon rapid"/> Rapid</h2>),
    'No Limit': (<h2><LuCalendarDays className="STM-icon long"/> Long</h2>),
};

const SelectTimeModal = () => {
    const display = useSelector(state => state.ui.selectTimeModal);

    const timeControl = useSelector(state => state.game.timeControl);

    const modalClass = `select-time-modal ${display ? 'active' : ''}`;

    const dispatch = useDispatch();

    function handleExitModal(){
        dispatch(exitSelectTimeModal());
    }

    const isSelected = (value) => timeControl === value ? 'selected' : '';

    const updateTimeControl = (e) => {
        e.preventDefault();
        dispatch(receiveTimeControl(e.target.value));
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
                {TIME_CATEGORIES.map((category)=>(
                        <div className="STM-section">
                            {   HEADERS[category] }
                            <div className="time-category">
                                { TIME_OPTIONS[category].map(timeVal => (
                                    <button value={timeVal} onClick={updateTimeControl} className={`${isSelected(timeVal)}`}>{displayTime(timeVal)}</button>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>

    );
}


export default SelectTimeModal
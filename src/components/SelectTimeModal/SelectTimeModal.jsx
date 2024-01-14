import { RxCross2 } from "react-icons/rx";
import './SelectTimeModal.css'
import { useDispatch, useSelector } from "react-redux";
import { exitSelectTimeModal } from "../../store/uiReducer";

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
        </div>

    );
}


export default SelectTimeModal
import { RxCross2 } from "react-icons/rx";
import './SelectTimeModal.css'
import { useDispatch, useSelector } from "react-redux";
import { exitSelectTimeModal } from "../../store/uiReducer";

const SelectTimeModal = () => {

    const display = useSelector(state => state.ui.selectTimeModal);

    console.log("display modal? ", display)
    const dispatch = useDispatch();

    if (!display) return null;

    function handleExitModal(){
        dispatch(exitSelectTimeModal());
    }

    return (

        <div>
            <header className='STM-header'>
                <div className="exit-cross">
                    <RxCross2 onClick={handleExitModal}/>
                </div>
                <h1>Choose Time</h1>
                <div className="exit-cross invisible"></div>
            </header>
        </div>

    );
}


export default SelectTimeModal
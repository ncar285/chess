// import { useState } from 'react';
import { Switch } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import HomePage from './components/HomePage/HomePage';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getDragPosition, getDraggingPiece, getHighlightedSquare } from './store/uiReducer';
import DragClone from './components/DragClone/DragClone';
// import { getGameBoard } from './store/gameReducer';
// import { playMoveIfValid } from './Utils/playMoveIfValid';

function App() {
    const draggingPiece = useSelector(getDraggingPiece)
    const dragPosition = useSelector(getDragPosition)

    return (
        <div className="app-container">
            {draggingPiece && dragPosition && <DragClone piece={draggingPiece} position={dragPosition}/>}
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>

            <footer className="footer">
                {/* <p className='copyright'>
                    &copy; Nico's Chess Game
                </p>                 */}
            </footer>
        </div>
    )
}

export default App;

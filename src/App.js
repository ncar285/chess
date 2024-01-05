// import { useState } from 'react';
import { Switch } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import HomePage from './components/HomePage/HomePage';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { getDragPosition, getDraggingPiece } from './store/uiReducer';
import DragClone from './components/DragClone/DragClone';

function App() {
    const draggingPiece = useSelector(getDraggingPiece)
    const dragPosition = useSelector(getDragPosition)
    console.log("in APP.js")
    console.log("draggingPiece", draggingPiece)

    return (
        <div className="app-container">
                
            <Switch>
                {
                    (draggingPiece && dragPosition) && 
                    <DragClone piece={draggingPiece} position={dragPosition}/>
                }
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

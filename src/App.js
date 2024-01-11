import { HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { getDragPosition, getDraggingPiece } from './store/uiReducer';
import DragClone from './components/DragClone/DragClone';
import { GameProvider } from './components/GameContext';

function App() {
    const draggingPiece = useSelector(getDraggingPiece)
    const dragPosition = useSelector(getDragPosition)

    return (
        <HashRouter>
            <GameProvider>
                <div className="app-container">
                    {draggingPiece && dragPosition && <DragClone piece={draggingPiece} position={dragPosition}/>}


                    <Switch>
                        <Route exact path="/" component={HomePage} />
                    </Switch>

                    <footer className="footer">
                        {/* Footer content */}
                    </footer>
                </div>
            </GameProvider>
        </HashRouter>
    )
}

export default App;
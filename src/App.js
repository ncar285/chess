import { HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import { useSelector } from 'react-redux';
import { getDragPosition, getDraggingPiece } from './store/uiReducer';
import DragClone from './components/DragClone/DragClone';
import { GameProvider } from './components/GameContext';
import SelectTimeModal from './components/SelectTimeModal/SelectTimeModal';
import ComputerOpponent from './components/ComputerOpponent/ComputerOpponent';
import HumanOpponent from './components/HumanOpponent/HumanOpponent';
import Playground from './components/Playground/Playground';

function App() {
    const draggingPiece = useSelector(getDraggingPiece)
    const dragPosition = useSelector(getDragPosition)

    return (
        <HashRouter>
            <GameProvider>
                <div className="app-container">
                    {draggingPiece && dragPosition && <DragClone piece={draggingPiece} position={dragPosition}/>}

                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                            <SelectTimeModal />
                        </Route>
                        <Route exact path="/play-friend">
                            <HumanOpponent />
                        </Route>
                        <Route exact path="/play-computer">
                            <ComputerOpponent />
                        </Route>
                        <Route exact path="/playground">
                            <Playground/>
                        </Route>
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
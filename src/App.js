// import { useState } from 'react';
import { Switch } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import HomePage from './components/HomePage/HomePage';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { getDraggingPiece } from './store/uiReducer';
import DragClone from './components/DragClone/DragClone';

function App() {

    // const [loaded, setLoaded] = useState(false);
    // check if page is loaded...
    // setLoaded(true)
    // return loaded && (

    const draggingPiece = useSelector(getDraggingPiece)

    return (
        <div className="app-container">
                
            <Switch>
                {draggingPiece && <DragClone piece={draggingPiece}/>}
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

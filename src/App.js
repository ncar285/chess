import { useState } from 'react';
import { Switch } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import HomePage from './components/HomePage/HomePage'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

    // const [loaded, setLoaded] = useState(false);
    // check if page is loaded...
    // setLoaded(true)
    // return loaded && (

    return (
        <div className="app-container">
                
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>

            <footer className="footer">
                <p className='copyright'>
                    Copyright &copy; 2023 Interview Bot
                </p>                
            </footer>
        </div>
    )
}

export default App;

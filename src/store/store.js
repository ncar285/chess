import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import users from './users.jsx'
// import ui from './ui.jsx'
import uiReducer from './uiReducer.js';
import gameReducer from './gameReducer.js';

const rootReducer = combineReducers({
    ui: uiReducer,
    game: gameReducer
});

let enhancer;

// if (process.env.NODE_ENV === 'production') {
//     enhancer = applyMiddleware(thunk);
// } else {
//     // console.log("we are applying the logger")
//     const logger = require('redux-logger').default;
//     const composeEnhancers =
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// !temporary:
enhancer = applyMiddleware(thunk);

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;


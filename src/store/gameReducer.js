// CONSTANTS
export const RECEIVE_GAME_BOARD = 'RECEIVE_GAME_BOARD';
export const UPDATE_GAME_BOARD = 'UPDATE_GAME_BOARD';


// ACTION CREATORS
export const receiveGameBoard = board => {
    return {
        type: RECEIVE_GAME_BOARD,
        payload: board
    };
};


// SELECTORS
export const getGameBoard = state => state.ui.gameBoard;

// REDUCER
const initialState = {
    gameBoard: null,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_GAME_BOARD:
            return {
                ...state,
                gameBoard: action.payload
            };
        default:
            return state;
    }
};

export default gameReducer;
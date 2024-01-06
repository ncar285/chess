// CONSTANTS
export const RECEIVE_GAME_BOARD = 'RECEIVE_GAME_BOARD';

// ACTION CREATORS
export const receiveGameBoard = board => {
    return {
        type: RECEIVE_GAME_BOARD,
        payload: board
    };
};

// SELECTORS
export const getGame = state => state.game.game;
export const getGameBoard = state => state.game.game ? state.game.game.getBoard() : null;
export const getTakenPieces = state => state.game.game.getTakenPieces();

// REDUCER
const initialState = {
    game: null
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_GAME_BOARD:
            return {
                ...state,
                game: action.payload
            };
        default:
            return state;
    }
};

export default gameReducer;
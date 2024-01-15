// CONSTANTS
export const RECEIVE_GAME = 'RECEIVE_GAME';
export const RECEIVE_GAME_TYPE = 'RECEIVE_GAME_TYPE';
export const RECEIVE_BOARD = 'RECEIVE_GAME_BOARD';

// ACTION CREATORS
export const receiveGame = game => {
    return {
        type: RECEIVE_GAME,
        payload: game
    };
};

export const receiveGameType = type => {
    return {
        type: RECEIVE_GAME_TYPE,
        payload: type
    };
};

export const receiveBoard = board => {
    return {
        type: RECEIVE_BOARD,
        payload: board
    };
};

// SELECTORS
export const getGame = state => state.game.game;
export const getTakenPieces = state => state.game.game.getTakenPieces();
export const getGameType = state => state.game.game.getTakenPieces();
export const getBoard = state => state.game.board ? state.game.game.getBoard() : null;

// REDUCER
const initialState = {
    game: null,
    gameType: null,
    board: null,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_GAME:
            return {
                ...state,
                game: action.payload
            };
        case RECEIVE_GAME_TYPE:
            return {
                ...state,
                gameType: action.payload
            }
        case RECEIVE_BOARD:
            return {
                ...state,
                board: action.payload
            };
        default:
            return state;
    }
};

export default gameReducer;
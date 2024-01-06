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

// export const updateGameBoard = (pieceObj, startPos, endPos) => {
//     return {
//         type: UPDATE_GAME_BOARD,
//         payload: {pieceObj, startPos, endPos}
//     }
// }


// SELECTORS
export const getGameBoard = state => state.game.gameBoard ? state.game.gameBoard.getBoard() : null;
export const getGame = state => state.game.gameBoard;

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
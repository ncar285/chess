// CONSTANTS
export const RECEIVE_SELECTED = 'RECEIVE_SELECTED';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';

export const RECEIVE_MOVE_OPTIONS = 'RECEIVE_MOVE_OPTIONS';
export const REMOVE_MOVE_OPTIONS = 'REMOVE_MOVE_OPTIONS';

// ACTION CREATORS
export const receiveSelected = selectedId => {
    return {
        type: RECEIVE_SELECTED,
        payload: selectedId
    };
};

export const removeSelected = () => {
    return {
        type: REMOVE_SELECTED
    };
};

export const receiveMoveOptions = movesObject => {
    return {
        type: RECEIVE_MOVE_OPTIONS,
        payload: movesObject
    };
};

export const removeMoveOptions = () => {
    return {
        type: REMOVE_MOVE_OPTIONS,
    };
};

// SELECTORS
export const getSelected = state => state.ui.selectedId;

// REDUCER
const initialState = {
    selectedId: null
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SELECTED:
            return {
                ...state,
                selectedId: action.payload
            };
        case REMOVE_SELECTED:
            return {
                ...state,
                selectedId: null
            }
        case REMOVE_MOVE_OPTIONS:
            return {
                ...state,
                validMoves: action.payload.moveOptions
            }
        case RECEIVE_MOVE_OPTIONS:
            return {
                ...state,
                validMoves: action.payload.validMoves,
                validTakes: action.payload.validTakes
            }
        case REMOVE_MOVE_OPTIONS:
            return {
                ...state,
                validMoves: null,
                validTakes: null
            }
        default:
            return state;
    }
};

export default uiReducer;
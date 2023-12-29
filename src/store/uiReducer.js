// CONSTANTS
export const RECEIVE_SELECTED = 'RECEIVE_SELECTED';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';

export const RECEIVE_MOVE_OPTIONS = 'RECEIVE_MOVE_OPTIONS';
export const REMOVE_MOVE_OPTIONS = 'REMOVE_MOVE_OPTIONS';

export const RECEIVE_DRAGGING_PIECE = "RECEIVE_DRAGGING_PIECE"
export const REMOVE_DRAGGING_PIECE = "REMOVE_DRAGGING_PIECE"


export const RECEIVE_HIGHLIGHTED_SQUARE  = "RECEIVE_HIGHLIGHTED_SQUARE";

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


    //actions for if a piece is being dragged  on the screen

export const receiveDraggingPiece = (piece) => {
    return {
        type: RECEIVE_DRAGGING_PIECE,
        payload: piece
    }
}

export const removeDraggingPiece = () => {
    return {
        type: REMOVE_DRAGGING_PIECE
    }
}

export const receiveHighlightedSquare = (squareId) => {
    return {
        type: RECEIVE_HIGHLIGHTED_SQUARE,
        payload: squareId
    }
}

// SELECTORS
export const getSelected = state => state.ui.selectedId;

export const getMoveOptions = state => state.ui.validMoves;

export const getTakeOptions = state => state.ui.validTakes;

export const getDraggingPiece = state => state.ui.draggingPiece;

export const getHighlightedSquare = state => state.ui.highlightedSquare;

// REDUCER
const initialState = {
    selectedId: null,
    validMoves: null,
    validTakes: null,
    draggingPiece: null,
    highlightedSquare: null
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
        case RECEIVE_MOVE_OPTIONS:
            return {
                ...state,
                validMoves: action.payload.options,
                validTakes: action.payload.takeOptions.size ? action.payload.takeOptions : null
            }
        case REMOVE_MOVE_OPTIONS:
            return {
                ...state,
                validMoves: null,
                validTakes: null
            }
        case RECEIVE_DRAGGING_PIECE:
            return {
                ...state,
                draggingPiece: action.payload
            }
        case REMOVE_DRAGGING_PIECE:
            return {
                ...state,
                draggingPiece: null
            }
        case RECEIVE_HIGHLIGHTED_SQUARE:
            return {
                ...state,
                highlightedSquare: action.payload
            }
        default:
            return state;
    }
};

export default uiReducer;
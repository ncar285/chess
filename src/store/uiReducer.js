// CONSTANTS
export const RECEIVE_SELECTED = 'RECEIVE_SELECTED';

// ACTION CREATORS
export const receiveSelected = selectedId => {
    return {
        type: RECEIVE_SELECTED,
        payload: selectedId
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
        default:
            return state;
    }
};

export default uiReducer;
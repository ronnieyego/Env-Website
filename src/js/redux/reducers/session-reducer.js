// Just loading state for now.
export default (state = {
    showLoadingAction: false
 }, action) => {
    switch (action.type) {
        case 'SET_LOADING': {
            state = { ...state, showLoadingAction: action.payload };
            break;
        }
    }
    return state;
};

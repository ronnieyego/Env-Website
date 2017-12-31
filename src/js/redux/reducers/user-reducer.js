const userReducer = (state = {
    userState: 'US'
}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_STATE': {
            state = { ...state, userState: action.payload};
            break;
        }
    }
    return state;
    
};

module.exports = userReducer;
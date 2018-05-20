const userReducer = (state = {
    userState: 'US',
    userGender: '',
    isMobile: false
}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_STATE': {
            state = { ...state, userState: action.payload};
            break;
        }
        case 'UPDATE_USER_GENDER': {
            state = { ...state, userGender: action.payload};
            break;
        }
    }
    return state;
    
};

module.exports = userReducer;
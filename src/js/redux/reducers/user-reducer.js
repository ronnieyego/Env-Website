const userReducer = (state = {
    userZipCode: null,
    userZipData: {
        city: null,
        state: null,
        population: null,
        lat: null,
        long: null
    },
    userState: 'CA',
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
        case 'UPDATE_USER_ZIP_CODE': {
            state = { ...state, userZipCode: action.payload};
            break;
        }
        case 'UPDATE_USER_ZIP_CODE_DATA': {
            state = { ...state, userZipData: action.payload};
            break;
        }
    }
    return state;
    
};

module.exports = userReducer;
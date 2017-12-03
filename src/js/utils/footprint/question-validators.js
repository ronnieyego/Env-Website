const standardIntQuestion = value => {
    let errorText = '';
    if(value === '') {
        errorText = '';
    } else if (value < 0 ) {
        errorText = 'Please enter a positive number';
    } else if (value > 999999999999999999999999999) {
        errorText = 'The observeable universe is about this many meters wide (8 x 10^26).  Your footprint is now about the size of the observable universe!';
    } else if (isNaN(parseInt(value)) || /[^\d.,]/g.test(value)) {
        errorText = "Please enter a valid number";
    }
    return errorText;
}

const nonZeroIntQuestion = value => {
    let errorText = '';
    if(value === '') {
        errorText = 'Please enter a positive number';
    } else if (value < 1 ) {
        errorText = 'Please enter a positive number';
    } else if (value > 999999999999999999999999999) {
        errorText = 'The observeable universe is about this many meters wide (8 x 10^26).  Your footprint is now about the size of the observable universe!';
    } else if (isNaN(parseInt(value)) || /[^\d.,]/g.test(value)) {
        errorText = "Please enter a valid number";
    }
    return errorText;
}

const hourQuestion = value => {
    let errorText = '';
    if(value === '') {
        errorText = '';
    } else if(value > 24) {
        errorText = "Fun fact, a day on Pluto lasts 153 hours, on Earth its only lasts 24 hours.";
    } else if (value > 999999999999999999999999999) {
        errorText = 'The observeable universe is about this many meters wide (8 x 10^26).  Your footprint is now about the size of the observable universe!';
    }else if (value < 0) {
        errorText = "Where can I buy this magical appliance which runs in reverse?";
    } else if (isNaN(parseInt(value)) || /[^\d.,]/g.test(value)) {
        errorText = "Please enter a valid number";
    }
    return errorText;
};

const mpgValidator = value => {
    let errorText = '';
    if(value === '') {
        errorText = '';
    } else if(value > 1000) {
        errorText = 'Congratulations on having the world\'s most fuel efficient car!';
    } else if (value === 0 ) {
        errorText = 'A 0 MPG car is called a cart!';
    } else if (value < 0 ) {
        errorText = 'How does this work?  Does your car reduce other people\'s mpg?';
    } else if (isNaN(parseInt(value)) || /[^\d.,]/g.test(value)) {
        errorText = "Please enter a valid number";
    }
    return errorText;
}

export const getErrorText = (value, type) => {
    if (!type) {
        return standardIntQuestion(value);
    }
    switch(type) {
        case 'hour-question':
            return hourQuestion(value);
        case 'standard-int':
            return standardIntQuestion(value);
        case 'non-zero-int':
            return nonZeroIntQuestion(value);
        case 'mpg':
            return mpgValidator(value);
        default:
            return standardIntQuestion(value);
    };
};
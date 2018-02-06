const standardIntQuestion = value => {
    let errorText = '';
    if(value === '') {
        errorText = '';
    } else if (value < 0 ) {
        errorText = 'Please enter a positive number';
    } else if (value > 999999999999999999999999999) {
        errorText = 'The observeable universe is about this many meters wide (8 x 10^26).  Your footprint is now about the size of the observable universe!';
    } else if(!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
        errorText = "Please enter a valid number";
    }
    return errorText;
}

const underTwentyQuestion = value => {
    let errorText = '';
    if(value === '') {
        errorText = '';
    } else if (value < 0 ) {
        errorText = 'I don\'t know how to calculate diet programs.';
    } else if (value >= 20) {
        errorText = 'That\'s a lot of food.  Please enter a real value or consult a doctor immediately.';
    } else if(!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
        errorText = "Please enter a valid number";
    }
    return errorText;
}

const underThreeHundredQuestion = value => {
    let errorText = '';
    if(value === '') {
        errorText = '';
    } else if (value < 0 ) {
        errorText = 'I don\'t know how to calculate diet programs.';
    } else if (value >= 300) {
        errorText = 'You really light up a room!  Please enter a number under 300.';
    } else if(!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
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
    } else if(!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
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
    } else if(!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
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
    } else if (value == 0 ) { // want to match "0"
        errorText = 'A 0 MPG car is called a cart!';
    } else if (value < 0 ) {
        errorText = 'How does this work?  Does your car reduce other people\'s mpg?';
    } else if(!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
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
        case 'under-20':
            return underTwentyQuestion(value);
        case '<300':
            return underThreeHundredQuestion(value);
        case 'mpg':
            return mpgValidator(value);
        default:
            return standardIntQuestion(value);
    };
};
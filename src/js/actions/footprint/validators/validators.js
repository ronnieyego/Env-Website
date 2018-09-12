export const isNaturalNumber = input => {
    try {
        if(!/^(\d+\.?\d*|\.\d+)$/.test(input)) {
            return false;
        }
        return parseFloat(input) >= 0;
    } catch(e) {
        return false;
    }
};

export const isGreaterThanZero = input => {
    try {
        if(!/^(\d+\.?\d*|\.\d+)$/.test(input)) {
            return false;
        }
        return parseFloat(input) > 0;
    } catch(e) {
        return false;
    }
};

export const isInArray = (input, array) => {
    return array.indexOf(input) !== -1;
};

export const isBoolean = input => {
    return [true, false].indexOf(input) !== -1;
};

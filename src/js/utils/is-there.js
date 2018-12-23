export default (field, errorMessage) => {
    if(typeof field === 'undefined' || field === null) {
        throw new Error(`${errorMessage}  -- typeof field is: ${typeof field}`);
    }
}

export const oneOfIsThere = (inputArray, errorMessage) => {
    const anyMissing = inputArray.every(field => {
        if(typeof field === 'undefined' || field === null) {
            return true
        }
    });
    if(anyMissing) {
        throw new Error(errorMessage);
    }
}
export default (field, errorMessage) => {
    if(typeof field === 'undefined' || field === null) {
        throw new Error(`${errorMessage}  -- typeof field is: ${typeof field}`);
    }
}
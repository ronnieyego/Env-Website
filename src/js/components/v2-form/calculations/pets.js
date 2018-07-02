
const getPetCo2 = pet => {
    if(pet === 'Dog') {
        return 7840;
    } else if(pet === 'Cat') {
        return 9264;
    } else if(pet === 'Turtle') {
        return 14812;
    } else if(pet === 'Hamster') {
        return 42;
    } else if(pet === 'Gecko') {
        return 1277;
    } else {
        console.log('Error -- Pet answer not found');
    }
}

export default petsArray => {
    const totalCo2 = petsArray.reduce((acc, pet) => {
        return getPetCo2(pet) + acc;
    }, 0);
    return { totalCo2 };
};

// To form the pets array, I'll need to search for all question names beginning with
// The parent quesiton's child question name.  In this case pet#

// Should make this a question util
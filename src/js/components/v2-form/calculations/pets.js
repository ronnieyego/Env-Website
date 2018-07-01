
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
    return petsArray.reduce((acc, pet) => {
        return getPetCo2(pet) + acc;
    }, 0);
};

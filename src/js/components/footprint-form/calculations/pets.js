import { lifeExpectancy } from '../../costs/pet/pet-data';
import { MONTHS_IN_YEAR } from '../../../utils/utils-data/constants';
import isThere from '../../../utils/is-there';

const getPetCo2 = pet => {
    if(pet === 'Dog') {
        const totalCo2 = 7840;
        const monthlyCo2 = Math.round(totalCo2 / lifeExpectancy[pet]['25-50 pounds'] / MONTHS_IN_YEAR);
        return { totalCo2 , monthlyCo2 };
    } else if(pet === 'Cat') {
        const totalCo2 = 9264;
        const monthlyCo2 = Math.round(totalCo2 / lifeExpectancy[pet] / MONTHS_IN_YEAR);
        return { totalCo2 , monthlyCo2 };
    } else if(pet === 'Turtle') {
        const totalCo2 = 14812;
        const monthlyCo2 = Math.round(totalCo2 / lifeExpectancy[pet] / MONTHS_IN_YEAR);
        return { totalCo2 , monthlyCo2 };
    } else if(pet === 'Hamster') {
        const totalCo2 = 42;
        const monthlyCo2 = Math.round(totalCo2 / lifeExpectancy[pet] / MONTHS_IN_YEAR);
        return { totalCo2 , monthlyCo2 };
    } else if(pet === 'Gecko') {
        const totalCo2 = 1277;
        const monthlyCo2 = Math.round(totalCo2 / lifeExpectancy[pet] / MONTHS_IN_YEAR);
        return { totalCo2 , monthlyCo2 };
    } else {
        console.log('Error -- Pet answer not found');
    }
}

export default ({ pets }) => {
    isThere(pets, 'pets must be an array');
    let combinedTotalCo2 = 0;
    let combinedMonthlyCo2 = 0;
    pets.forEach(pet => {
        const {totalCo2, monthlyCo2 } = getPetCo2(pet);
        combinedTotalCo2 += totalCo2;
        combinedMonthlyCo2 += monthlyCo2;
    });
    return { totalCo2: combinedTotalCo2, monthlyCo2: combinedMonthlyCo2 };
};

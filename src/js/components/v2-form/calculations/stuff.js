import { co2PerPoundOfStuff, fullBookcasesPerRoom, poundsPerBookcase, stuffLife } from '../data/stuff';
import { getNumberOfRooms, convertLifetimeToMonthly } from './utils';
import isThere from '../../../utils/is-there';

const getMultiplierByAmount = stuffAmount => {
    if(stuffAmount === 'Practically empty') {
        return 0.33;
    } else if(stuffAmount === 'Quite uncluttered') {
        return 0.66;
    } else if(stuffAmount === 'Reasonably full') {
        return 1;
    } else if(stuffAmount === 'Extremely full') {
        return 1.33;
    } else if(stuffAmount === 'There\'s no more room') {
        return 1.66;
    } else {
        console.log('Error -- Stuff Amount answer not found');
        return 1;
    }
}

export default ({homeSqft, stuffAmount}) => {
    isThere(homeSqft, 'homeSqft is required');
    isThere(stuffAmount, 'stuffAmount is required');

    const rooms = getNumberOfRooms(homeSqft);
    const multiplier = getMultiplierByAmount(stuffAmount);
    const co2PerRoom = co2PerPoundOfStuff * fullBookcasesPerRoom * poundsPerBookcase * multiplier;
    const totalCo2 = Math.round(rooms * co2PerRoom);
    const monthlyCo2 = convertLifetimeToMonthly(totalCo2, stuffLife);
    return { totalCo2, monthlyCo2 };
}
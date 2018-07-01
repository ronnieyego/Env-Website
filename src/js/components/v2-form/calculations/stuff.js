import { co2PerPoundOfStuff, fullBookcasesPerRoom, poundsPerBookcase } from '../data/stuff';
import { getNumberOfRooms } from './utils';

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
    const rooms = getNumberOfRooms(homeSqft);
    const multiplier = getMultiplierByAmount(stuffAmount);
    const co2PerRoom = co2PerPoundOfStuff * fullBookcasesPerRoom * poundsPerBookcase * multiplier;
    return Math.round(rooms * co2PerRoom);
}
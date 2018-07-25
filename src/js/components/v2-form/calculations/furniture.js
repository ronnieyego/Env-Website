import { co2PerFurniturePound, furnitureLife, furnitureWeightPerRoom } from '../data/furniture';
import { getNumberOfRooms, convertLifetimeToMonthly } from './utils';
import isThere from '../../../utils/is-there';

const getMultiplierByAmount = furnitureAmount => {
    if(furnitureAmount === 'I have almost no furniture') {
        return 0.5;
    } else if(furnitureAmount === 'My rooms are sparesly furnished') {
        return 0.75;
    } else if(furnitureAmount === 'I have all of the essentials') {
        return 1;
    } else if(furnitureAmount === 'My home is cramped') {
        return 1.3;
    } else {
        console.log('Error -- Furniture Amount answer not found');
        return 1;
    }
}

export default ({homeSqft, furnitureAmount}) => {
    isThere(homeSqft, 'homeSqft required');
    isThere(furnitureAmount, 'furnitureAmount required');
    const rooms = getNumberOfRooms(homeSqft);
    const co2PerRoom = co2PerFurniturePound * furnitureWeightPerRoom * getMultiplierByAmount(furnitureAmount);
    const totalCo2 = Math.round(rooms * co2PerRoom);
    const monthlyCo2 = convertLifetimeToMonthly(totalCo2, furnitureLife);
    return { totalCo2, monthlyCo2 };
}
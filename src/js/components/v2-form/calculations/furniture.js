import { co2PerFurniturePound, furnitureWeightPerRoom } from '../data/furniture';
import { getNumberOfRooms } from './utils';

export default ({homeSqft}) => {
    const rooms = getNumberOfRooms(homeSqft);
    const co2PerRoom = co2PerFurniturePound * furnitureWeightPerRoom;
    return Math.round(rooms * co2PerRoom);
}
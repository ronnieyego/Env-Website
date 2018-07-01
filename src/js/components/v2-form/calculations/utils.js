import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { averageRoomSize } from '../data/home';

export const convertKwhToCo2 = (state, kwh) => {
    return Math.round(utilityEmissionsPerState[state] * kwh * 10)/10;
};

export const getNumberOfRooms = houseSqft => {
    return Math.round(houseSqft/averageRoomSize);
};
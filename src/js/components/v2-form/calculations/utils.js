import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { averageRoomSize } from '../data/home';
import { DAYS_IN_MONTH, MONTHS_IN_YEAR } from '../../../utils/utils-data/constants';

export const convertKwhToCo2 = (state, kwh) => {
    return Math.round(utilityEmissionsPerState[state] * kwh * 10)/10;
};

export const getNumberOfRooms = houseSqft => {
    return Math.round(houseSqft/averageRoomSize);
};

export const convertDailyToMonthly = value => {
    return value * DAYS_IN_MONTH;
};

export const convertLifetimeToMonthly = (value, years) => {
    return Math.round(value / years / MONTHS_IN_YEAR);
};
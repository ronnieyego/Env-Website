import stateTemps from '../data/average-temp-by-state';
import { acPenaltyTempDiff, acWattage, acWattageTemperature, fanWattage } from '../data/heating-cooling';
import { convertKwhToCo2, getNumberOfRooms, convertDailyToMonthly } from './utils';
import isThere, { oneOfIsThere } from '../../../utils/is-there';
import { getDifferenceInTemp } from './utils-fetch-user-zip';

const ROOMS_PER_AC_UNIT = 3;

const getTimeOn = (hoursHome, coolingOnWhileSleeping) => {
    return coolingOnWhileSleeping ? hoursHome + 8 : hoursHome;
};

const getAcEnergy = (acType, tempDiff, rooms, timeOn) => {
    const unitWattage = acWattage[acType];
    if (!unitWattage) {
        console.log('ERROR -- could not find acWattage for ', unitWattage);
    }
    const multiplier = tempDiff > acPenaltyTempDiff ? (tempDiff - acPenaltyTempDiff) * acWattageTemperature : 1;
    const adjustedUnitWattage = unitWattage * multiplier;
    const unitKwhPerDay = adjustedUnitWattage * timeOn / 1000;
    const acUnits = acType === 'Central AC' ? 1 : Math.round(rooms / ROOMS_PER_AC_UNIT);
    const kwhPerDay = unitKwhPerDay * acUnits;
    return kwhPerDay;
};

const getFanEnergy = (rooms, timeOn) => {
    // Assume 1 fan per room.
    return fanWattage * rooms * timeOn / 1000;
};

const checkIfAllFieldsPresent = ({ state, userZip, userZipData, coolingType, summerTemp, winterTemp, hoursHome, coolingWhileSleeping, houseSqft, usesPersonalFan }) => {
    isThere(state, 'state required');
    isThere(coolingType, 'coolingType required');
    isThere(summerTemp, 'summerTemp required');
    isThere(winterTemp, 'winterTemp required');
    isThere(hoursHome, 'hoursHome required');
    isThere(coolingWhileSleeping, 'coolingWhileSleeping required');
    isThere(houseSqft, 'houseSqft required');
    isThere(usesPersonalFan, 'usesPersonalFan required');
    oneOfIsThere([userZip, userZipData], 'Either need a user zip code or user zip data.')
}

export default ({
    state,
    userZip,
    userZipData,
    coolingType,
    summerTemp,
    winterTemp,
    hoursHome,
    coolingWhileSleeping = true,
    houseSqft,
    usesPersonalFan
}) => {
    checkIfAllFieldsPresent({ state, userZip, userZipData, coolingType, summerTemp, winterTemp, hoursHome, coolingWhileSleeping, houseSqft, usesPersonalFan });
    const personalFanKwh = usesPersonalFan ? getFanEnergy(1, hoursHome) : 0; // 1 fan not used while sleeping

    if( coolingType === 'None') {
        const totalCo2 = convertKwhToCo2(state, personalFanKwh);
        const monthlyCo2 = convertDailyToMonthly(totalCo2);
        return { totalCo2, monthlyCo2 };
    }
    const tempDiff = getDifferenceInTemp({userZip, userZipData, state, summerTemp, winterTemp});
    const timeOn = getTimeOn(hoursHome, coolingWhileSleeping);
    const numRooms = getNumberOfRooms(houseSqft);
    let kwhPerDay = 0;
    if(coolingType === 'Lots of Fans') {
        kwhPerDay = getFanEnergy(numRooms, timeOn);
    } else {
        kwhPerDay = getAcEnergy(coolingType, tempDiff.summer, numRooms, timeOn);
        if( winterTemp > stateTemps[state]) {
            kwhPerDay += getAcEnergy(coolingType, tempDiff.winter, numRooms, timeOn);
        }
    }
    
    kwhPerDay += personalFanKwh;


    kwhPerDay = kwhPerDay / 2;  // Since you're only cooling for half of the year.
    const totalCo2 = convertKwhToCo2(state, kwhPerDay);
    const monthlyCo2 = convertDailyToMonthly(totalCo2);
    return { totalCo2, monthlyCo2 };
};

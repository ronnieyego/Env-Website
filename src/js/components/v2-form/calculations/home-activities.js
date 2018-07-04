import { 
    applianceKwhPerHour,
    applianceKwhPerDay,
    applianceKwhPerUse,
} from '../data/home';

import { convertKwhToCo2, convertDailyToMonthly,  getNumberOfRooms } from './utils';

const getNightsCooking = cookAtHomeFrequency => {
    if(cookAtHomeFrequency === 'Most nights') {
        return 6/7;
    } else if(cookAtHomeFrequency === '2-3 times per week') {
        return 3/7;
    } else if(cookAtHomeFrequency === 'Once a week') {
        return 1/7;
    } else if(cookAtHomeFrequency === 'Less than once a week') {
        return .25/7;
    } else {
        console.log('Error - Invalid cooking frequecy answer');
        return 0;
    }
};

const getCookingKwh = cookAtHomeFrequency => {
    const cookingFreq = getNightsCooking(cookAtHomeFrequency);
    return ((applianceKwhPerHour.oven + applianceKwhPerHour.stoveTop) * cookingFreq);
};

// Calculates everything on a daily basis
export default ({
    state,
    hoursHome,
    hoursTv,
    hoursComputer,
    cookAtHomeFrequency,
    doesShowerDaily,
    doesMusicAtHome,
    laundryLoads,
    homeSqft
}) => {
    const res = {
        entertainment: 0,
        cooking: 0,
        cleanliness: 0,
        background: 0
    };

    // Entertainment
    const tvCo2 = convertKwhToCo2(state, hoursHome * applianceKwhPerHour.tv);
    const computerCo2 = convertKwhToCo2(state, hoursHome * applianceKwhPerHour.laptopComputer);
    const speakerCo2 = convertKwhToCo2(state, hoursHome * applianceKwhPerHour.speakers);
    
    res.entertainment += Math.round(tvCo2 + computerCo2 + speakerCo2);

    // Cooking
    const cookingCo2 = convertKwhToCo2(state, getCookingKwh(cookAtHomeFrequency));
    res.cooking += Math.round(cookingCo2);

    // Cleanliness
    const showerFrequency = doesShowerDaily ? 1 : .33;
    const showerCo2 = convertKwhToCo2(state, applianceKwhPerUse.shower * showerFrequency);
    const laundryCo2 = convertKwhToCo2(state, applianceKwhPerUse.laundry * laundryLoads / 30); //Get daily value instead of monthly
    
    res.cleanliness += Math.round(showerCo2 + laundryCo2);

    // Background
    const numRooms = getNumberOfRooms(homeSqft);
    const lightsCo2 = convertKwhToCo2(state, hoursHome * applianceKwhPerHour.light * numRooms);
    const fridgeCo2 = convertKwhToCo2(state,  applianceKwhPerDay.refrigerator);
    res.background += Math.round(lightsCo2 + fridgeCo2);

    const totalCo2 = Object.keys(res).reduce((accumulator, value) => accumulator + res[value], 0);
    const monthlyCo2 = convertDailyToMonthly(totalCo2);
    res.totalCo2 = totalCo2;
    res.monthlyCo2 = monthlyCo2;

    return res;
}


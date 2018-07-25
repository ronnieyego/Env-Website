import { homeLife, homeTypeAdjuster, co2PerSqFt, co2Breakdown, homeQuestions } from '../../costs/home/home-data';
import isThere from '../../../utils/is-there';

export default ({
    homeMaterial,
    homeType,
    homeSqft,
    numHousemates
}) => {
    isThere(homeMaterial, 'homeMaterial is required');
    isThere(homeType, 'homeType is required');
    isThere(homeSqft, 'homeSqft is required');
    isThere(numHousemates, 'numHousemates is required');

    const adjuster = homeTypeAdjuster[homeType];
    const materialCo2PerSqft = co2PerSqFt[homeMaterial];
    const homeCo2 = homeSqft *  materialCo2PerSqft * adjuster;
    const totalCo2 = Math.round(homeCo2/(numHousemates + 1));
    const lifeMonths = homeLife[homeType] * 12;
    const monthlyCo2 = Math.round(totalCo2 / lifeMonths);
    return { totalCo2, homeType, homeMaterial, monthlyCo2 };
}


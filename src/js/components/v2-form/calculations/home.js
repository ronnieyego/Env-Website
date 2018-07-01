import { homeTypeAdjuster, co2PerSqFt, co2Breakdown, homeQuestions } from '../../costs/home/home-data';

export default ({
    homeMaterial,
    homeType,
    homeSqft,
    numHousemates
}) => {
    const adjuster = homeTypeAdjuster[homeType];
    const materialCo2PerSqft = co2PerSqFt[homeMaterial];
    const homeCo2 = homeSqft *  materialCo2PerSqft * adjuster;
    const totalCo2 = Math.round(homeCo2/(numHousemates + 1));
    return { totalCo2, homeType, homeMaterial };
}


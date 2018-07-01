import { homeTypeAdjuster, co2PerSqFt, co2Breakdown, homeQuestions } from '../../costs/home/home-data';

export default ({
    homeMaterial,
    homeType,
    homeSqft
}) => {
    const adjuster = homeTypeAdjuster[homeType];
    const materialCo2PerSqft = co2PerSqFt[homeMaterial];

    const totalCo2 = Math.round(homeSqft *  materialCo2PerSqft * adjuster);
    return { totalCo2, homeType, homeMaterial };
}


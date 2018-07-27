import { 
    busMpgPerPerson,
    carLife,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    kwhPer100MilesElectricCar,
    planeMpgPerPerson,
    trainMpgPerPerson } from '../data/transportation';
import { convertKwhToCo2, convertLifetimeToMonthly } from './utils';
import { classData, co2PerPound, creationBreakdown } from '../../costs/car/car-data';
import { MONTHS_IN_YEAR } from '../../../utils/utils-data/constants';
import isThere from '../../../utils/is-there';


const getGasVehicleCo2 = (miles, mpg) => {
    return Math.round(miles / mpg * co2PerGallonOfGas);
};

const getCarpoolMultiplier = carpoolFrequency => {
    // Multiplier on total milage
    if(carpoolFrequency === 'Never') {
        return 1;
    } else if(carpoolFrequency === 'Just to and from work') {
        return .75; // Carpool half the time with 1 person
    } else if(carpoolFrequency === 'Most of the time') {
        return .66; // Carpool 3/4 of the time with 1 person
    } else if(carpoolFrequency === 'Always') {
        return .5; // Carpool always with 1 person
    } else {
        console.log('Error - Invalid carpool frequecy answer');
        return 1;
    }
};

const getCarBuildCo2 = (carBuildType, carClass) => {
    const carWeight = classData[carClass].weight;
    const carCo2PerPound = co2PerPound[carBuildType];
    const carCreationCo2 = Math.round(carWeight * carCo2PerPound);
    return carCreationCo2;
}

const getCarCo2 = ({
    carFuelType,
    carBuildType,
    carClass,
    carMpg,
    carpoolFrequency,
    carMilesMonth,
    state
}) => {
    const carpoolMilageMultiplier = getCarpoolMultiplier(carpoolFrequency);
    const totalMiles = carMilesMonth * carpoolMilageMultiplier;
    if(['Gasoline', 'Diesel'].indexOf(carFuelType) !== -1) {
        const carCo2 = getGasVehicleCo2(totalMiles, carMpg);
        const carBuildCo2 = getCarBuildCo2(carBuildType, carClass);
        const carMonthlyBuildCo2 = convertLifetimeToMonthly(carBuildCo2, carLife);
        return { carCo2, carBuildCo2, carMonthlyBuildCo2 };
    } else if (carFuelType === 'Electric') {
        const kwh = totalMiles * kwhPer100MilesElectricCar/100;
        const carCo2 = Math.round(convertKwhToCo2(state, kwh));
        const carBuildCo2 = getCarBuildCo2(carBuildType, carClass); // SInce no MPG, hardcode it to be car;
        const carMonthlyBuildCo2 = convertLifetimeToMonthly(carBuildCo2, carLife);
        return { carCo2, carBuildCo2, carMonthlyBuildCo2 };
    } else {
        console.log('Error -- Invalid car type answer');
        return 0;
    }
}

const checkIfFieldsArePresent = ({ doesDrive, carBuildType, carFuelType, carClass, carMpg, carpoolFrequency, carMilesMonth, busMiles, trainMiles, flyMiles, doesPublicTransit, state }) => {
    isThere(doesDrive, 'doesDrive is required');
    isThere(carBuildType, 'carBuildType is required');
    isThere(carFuelType, 'carFuelType is required');
    isThere(carClass, 'carClass is required');
    isThere(carMpg, 'carMpg is required');
    isThere(carpoolFrequency, 'carpoolFrequency is required');
    isThere(carMilesMonth, 'carMilesMonth is required');
    isThere(busMiles, 'busMiles is required');
    isThere(trainMiles, 'trainMiles is required');
    isThere(flyMiles, 'flyMiles is required');
    isThere(doesPublicTransit, 'doesPublicTransit is required');
    isThere(state, 'state is required');
} 


export default ({
    doesDrive,
    carBuildType,
    carFuelType,
    carClass,
    carMpg,
    carpoolFrequency,
    carMilesMonth,
    busMiles,
    trainMiles,
    flyMiles,
    doesPublicTransit,
    state,
}) => {
    checkIfFieldsArePresent({ doesDrive, carBuildType, carFuelType, carClass, carMpg, carpoolFrequency, carMilesMonth, busMiles, trainMiles, flyMiles, doesPublicTransit, state });
    const { carCo2, carBuildCo2, carMonthlyBuildCo2 } = doesDrive ? getCarCo2({ carFuelType, carMpg, carpoolFrequency, carClass, carMilesMonth, state, carBuildType}) : { carCo2: 0, carBuildCo2: 0, carMonthlyBuildCo2: 0 };
    const busCo2 = doesPublicTransit ? getGasVehicleCo2(busMiles, busMpgPerPerson) : 0;
    const trainCo2 = doesPublicTransit ? getGasVehicleCo2(trainMiles, trainMpgPerPerson) : 0;
    const planeCo2 = Math.round(getGasVehicleCo2(flyMiles, planeMpgPerPerson) / 12); // Plane is asked per year instead of per month 
    const totalCo2 = carCo2 + busCo2 + trainCo2 + planeCo2;
    return {
        car: carCo2,
        carBuild: carBuildCo2,
        carMonthlyBuild: carMonthlyBuildCo2,
        bus: busCo2,
        train: trainCo2,
        plane: planeCo2,
        totalCo2
    }
};

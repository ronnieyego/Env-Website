import { 
    busMpgPerPerson,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    kwhPer100MilesElectricCar,
    planeMpgPerPerson,
    trainMpgPerPerson } from '../data/transportation';
import { convertKwhToCo2 } from './utils';
import { classData, co2PerPound, creationBreakdown } from '../../costs/car/car-data';

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

const getCarClassFromMpg = mpg => {
    if(mpg > 25) {
        return 'Compact car';
    } else if(mpg > 20) {
        return 'Large car';
    } else if(mpg > 15) {
        return 'Midsize truck';
    } else if(mpg < 15) {
        return 'Large SUV';
    }
}
const getCarBuildCo2 = (carMpg, carBuildType) => {
    const carClass = getCarClassFromMpg(carMpg);
    const carWeight = classData[carClass].weight;
    const carCo2PerPound = co2PerPound[carBuildType];
    const carCreationCo2 = Math.round(carWeight * carCo2PerPound);
    return carCreationCo2;
}

const getCarCo2 = ({
    carFuelType,
    carBuildType,
    carMpg,
    carpoolFrequency,
    carMilesMonth,
    state
}) => {
    const carpoolMilageMultiplier = getCarpoolMultiplier(carpoolFrequency);
    const totalMiles = carMilesMonth * carpoolMilageMultiplier;
    if(['Gasoline', 'Diesel'].indexOf(carFuelType) !== -1) {
        const carCo2 = getGasVehicleCo2(totalMiles, carMpg);
        const carBuildCo2 = getCarBuildCo2(carMpg, carBuildType);
        return { carCo2, carBuildCo2 };
    } else if (carFuelType === 'Electric') {
        const kwh = totalMiles * kwhPer100MilesElectricCar/100;
        const carCo2 = Math.round(convertKwhToCo2(state, kwh));
        const carBuildCo2 = getCarBuildCo2(25, carBuildType); // SInce no MPG, hardcode it to be car;
        return { carCo2, carBuildCo2 };
    } else {
        console.log('Error -- Invalid car type answer');
        return 0;
    }
}
export default ({
    doesDrive,
    carBuildType,
    carFuelType,
    carMpg,
    carpoolFrequency,
    carMilesMonth,
    busMiles,
    trainMiles,
    flyMiles,
    state
}) => {
    const { carCo2, carBuildCo2 } = doesDrive ? getCarCo2({ carFuelType, carMpg, carpoolFrequency, carMilesMonth, state, carBuildType}) : { carCo2: 0, carBuildCo2: 0 };
    const busCo2 = getGasVehicleCo2(busMiles, busMpgPerPerson);
    const trainCo2 = getGasVehicleCo2(trainMiles, trainMpgPerPerson);
    // Changed plane MPG Var name
    const planeCo2 = Math.round(getGasVehicleCo2(flyMiles, planeMpgPerPerson) / 12); // Plane is asked per year instead of per month 
    const totalCo2 = carCo2 + busCo2 + trainCo2 + planeCo2;
    return {
        car: carCo2,
        carBuild: carBuildCo2,
        bus: busCo2,
        train: trainCo2,
        plane: planeCo2,
        totalCo2
    }
};

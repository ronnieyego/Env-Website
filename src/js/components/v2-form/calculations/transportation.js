import { 
    busMpgPerPerson,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    kwhPer100MilesElectricCar,
    planeMpgPerPerson,
    trainMpgPerPerson } from '../data/transportation';
import { convertKwhToCo2 } from './utils';

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

const getCarCo2 = ({
    carType,
    carMpg,
    carpoolFrequency,
    carMilesMonth,
    state
}) => {
    const carpoolMilageMultiplier = getCarpoolMultiplier(carpoolFrequency);
    const totalMiles = carMilesMonth * carpoolMilageMultiplier;
    if(['Gasoline', 'Diesel'].indexOf(carType) !== -1) {
        return getGasVehicleCo2(totalMiles, carMpg);
    } else if (carType === 'Electric') {
        const kwh = totalMiles * kwhPer100MilesElectricCar/100;
        return Math.round(convertKwhToCo2(state, kwh));
    } else {
        console.log('Error -- Invalid car type answer');
        return 0;
    }
}
export default ({
    doesDrive,
    carType,
    carMpg,
    carpoolFrequency,
    carMilesMonth,
    busMiles,
    trainMiles,
    flyMiles,
    state
}) => {
    const carCo2 = doesDrive ? getCarCo2({ carType, carMpg, carpoolFrequency, carMilesMonth, state}) : 0;
    const busCo2 = getGasVehicleCo2(busMiles, busMpgPerPerson);
    const trainCo2 = getGasVehicleCo2(trainMiles, trainMpgPerPerson);
    // Changed plane MPG Var name
    const planeCo2 = Math.round(getGasVehicleCo2(flyMiles, planeMpgPerPerson) / 12); // Plane is asked per year instead of per month 
    const totalCo2 = carCo2 + busCo2 + trainCo2 + planeCo2;
    return {
        car: carCo2,
        bus: busCo2,
        train: trainCo2,
        plane: planeCo2,
        totalCo2
    }
};

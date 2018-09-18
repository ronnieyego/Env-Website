import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';
import { isNaturalNumber, isGreaterThanZero, isBoolean, isInArray } from './validators';
import ids from '../../../utils/ids/index';

export default () => {
    return (dispatch, getState) => {
        try {
            const store = getState();
            const questions = store.questions.questions;
            const errorQuestions = [];

            const doesDrive = getAnswerFromId(questions, ids.doesDrive);
            const carSize = getAnswerFromId(questions, ids.carSize);
            const carRuggedness = getAnswerFromId(questions, ids.carRuggedness);
            const carMpg = getAnswerFromId(questions, ids.carMpg);
            const milesDrivenMonth = getAnswerFromId(questions, ids.milesDrivenMonth);
            const carFuel = getAnswerFromId(questions, ids.carFuel);
            const carpoolFrequency = getAnswerFromId(questions, ids.carpoolFrequency);
            const doesPublicTransit = getAnswerFromId(questions, ids.doesPublicTransit);
            const milesBusMonth = getAnswerFromId(questions, ids.milesBusMonth);
            const milesTrainMonth = getAnswerFromId(questions, ids.milesTrainMonth);
            const milesFlyYear = getAnswerFromId(questions, ids.milesFlyYear);

            if (!isBoolean(doesDrive)) {
                errorQuestions.push(ids.doesDrive);
            }

            if (!isInArray(carSize, [
                ids.smartCar,
                ids.compactCar,
                ids.midsizeCar,
                ids.largeCar,
                ids.compactSuv,
                ids.midsizeSuv,
                ids.largeSuv,
                ids.compactTruck,
                ids.midsizeTruck,
                ids.largeTruck
            ])) {
                errorQuestions.push(ids.carSize);
            }

            if (!isInArray(carRuggedness, [ids.rugged, ids.luxurious, ids.lightweight, ids.standard])) {
                errorQuestions.push(ids.carRuggedness);
            }

            if (!isGreaterThanZero(carMpg)) {
                errorQuestions.push(ids.carMpg);
            }

            if (!isNaturalNumber(milesDrivenMonth)) {
                errorQuestions.push(ids.milesDrivenMonth);
            }

            if (!isInArray(carFuel, [ids.diesel, ids.gasoline, ids.electricity])) {
                errorQuestions.push(ids.carFuel);
            }

            if (!isInArray(carpoolFrequency, [ids.never, ids.justToAndFromWork, ids.mostOfTheTime, ids.always])) {
                errorQuestions.push(ids.carpoolFrequency);
            }

            if (!isBoolean(doesPublicTransit)) {
                errorQuestions.push(ids.doesPublicTransit);
            }

            if (!isNaturalNumber(milesBusMonth)) {
                errorQuestions.push(ids.milesBusMonth);
            }

            if (!isNaturalNumber(milesTrainMonth)) {
                errorQuestions.push(ids.milesTrainMonth);
            }

            if (!isNaturalNumber(milesFlyYear)) {
                errorQuestions.push(ids.milesFlyYear);
            }

            const valid = errorQuestions.length === 0;

            return {
                valid,
                errorQuestions
            }
        } catch(e) {
            return {
                valid: false,
                errorQuestions: [-1]
            }
        }
        
    }
};
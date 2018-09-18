import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';
import { isNaturalNumber, isGreaterThanZero,  isInArray, isBoolean } from './validators';
import ids from '../../../utils/ids/index';

export default () => {
    return (dispatch, getState) => {
        try {
            const store = getState();
            const questions = store.questions.questions;
            const errorQuestions = [];

            const homeInsulation = getAnswerFromId(questions, ids.homeInsulation);
            const summerTemp = getAnswerFromId(questions, ids.summerTemp);
            const coolingSystem = getAnswerFromId(questions, ids.coolingSystem);
            const coolWholeHouse = getAnswerFromId(questions, ids.coolWholeHouse);
            const usesFan = getAnswerFromId(questions, ids.usesFan);
            const winterTemp = getAnswerFromId(questions, ids.winterTemp);
            const heatingSystem = getAnswerFromId(questions, ids.heatingSystem);
            const heatWholeHouse = getAnswerFromId(questions, ids.heatWholeHouse);
            const usesPortableHeater = getAnswerFromId(questions, ids.usesPortableHeater);


            if (!isInArray(homeInsulation, [ids.extremelyInsulated, ids.reasonableInsulated, ids.somewhatInsulated, ids.poorlyInsulated])) {
                errorQuestions.push(ids.homeInsulation);
            }

            if (!isGreaterThanZero(summerTemp)) {
                errorQuestions.push(ids.summerTemp);
            }

            if (!isInArray(coolingSystem, [ids.centralAc, ids.windowMountAc, ids.lotsOfFans, ids.none])) {
                errorQuestions.push(ids.homeInsulation);
            }
            
            if (!isInArray(heatingSystem, [ids.gasVents, ids.radiantFloors, ids.radiator, ids.heatPump, ids.none])) {
                errorQuestions.push(ids.heatingSystem);
            }

            if (!isInArray(coolWholeHouse, [ids.entireHome, ids.someRooms, ids.justCurrentRoom])) {
                errorQuestions.push(ids.coolWholeHouse);
            }

            if (!isInArray(heatWholeHouse, [ids.entireHome, ids.someRooms, ids.justCurrentRoom])) {
                errorQuestions.push(ids.heatWholeHouse);
            }

            if (!isBoolean(usesPortableHeater)) {
                errorQuestions.push(ids.usesPortableHeater);
            }

            if (!isBoolean(usesFan)) {
                errorQuestions.push(ids.usesFan);
            }

            if (!isNaturalNumber(winterTemp)) {
                errorQuestions.push(ids.winterTemp);
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
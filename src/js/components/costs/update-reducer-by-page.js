import ids from '../../utils/ids/index';
import { getAnswerFromId, getQuestionFromId } from '../../utils/footprint/get-question-utils';

export default (storeData, page) => {
    const questions = storeData.costsForms.questions;
    if(page === 'galaxy') {
        const tabletQ = getQuestionFromId(questions, ids.tabletType);
        tabletQ.value = 'Samsung Galaxy';
    } else if(page === 'apartment') {
        const homeTypeQ = getQuestionFromId(questions, ids.homeType);
        homeTypeQ.value = 'Apartment';
        const sqftQ = getQuestionFromId(questions, ids.homeSqft);
        sqftQ.value = 1000;
        const materialQ = getQuestionFromId(questions, ids.homeMaterial);
        materialQ.value = 'Concrete';
    }
    return storeData;
}
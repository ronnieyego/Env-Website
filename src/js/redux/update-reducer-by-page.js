import ids from '../utils/ids/index';
import { getAnswerFromId, getQuestionFromId } from '../utils/footprint/get-question-utils';

export default (storeData, page) => {
    const questions = storeData.costsForms.questions;
    if(page === 'galaxy') {
        const tabletQ = getQuestionFromId(questions, ids.tabletType);
        tabletQ.value = 'Samsung Galaxy';
    } else if(page === 'apartment') {
        updateApartment(questions);
    } else if(page === 'phone') {
        updateComputerType(questions, 'Phone');
    } else if(page === 'tablet') {
        updateComputerType(questions, 'Tablet');
    } else if(page === 'laptop') {
        updateComputerType(questions, 'Laptop');
    } else if(page === 'desktop') {
        updateComputerType(questions, 'Desktop');
    } else if(page === 'iphone') {
        updateiPhone(questions);
    } else if(page === 'cat') {
        updatePet(questions, 'Cat');
    } else if(page === 'dog') {
        updatePet(questions, 'Dog');
    } else if(page === 'hamster') {
        updatePet(questions, 'Hamster');
    }
    return storeData;
}

const updateComputerType = (questions, type) => {
    const deviceTypeQ = getQuestionFromId(questions, ids.computerType);
    deviceTypeQ.value = type;
};

const updateiPhone = questions => {
    const deviceTypeQ = getQuestionFromId(questions, ids.computerType);
    deviceTypeQ.value = 'Phone';
    const phoneBrand = getQuestionFromId(questions, ids.phoneBrand);
    phoneBrand.value = 'Apple';
};

const updateApartment = questions => {
    const homeTypeQ = getQuestionFromId(questions, ids.homeType);
    homeTypeQ.value = 'Apartment';
    const sqftQ = getQuestionFromId(questions, ids.homeSqft);
    sqftQ.value = 1000;
    const materialQ = getQuestionFromId(questions, ids.homeMaterial);
    materialQ.value = 'Concrete';
};

const updatePet = (questions, petType) => {
    const petTypeQ = getQuestionFromId(questions, ids.petType);
    petTypeQ.value = petType;
};
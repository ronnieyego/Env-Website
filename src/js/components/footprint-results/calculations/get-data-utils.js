import ids from '../../../utils/ids/index';

export const getHeatingCoolingAnswers = questions => {
    const answers = {};
    answers.state = res.userState;
    answers.insulationType = getAnswerFromId(questions, ids.homeInsulation);
    answers.houseSqft = getAnswerFromId(questions, ids.homeSqft);
    answers.hoursHome = getAnswerFromId(questions, ids.hoursAtHome);
    answers.summerTemp = getAnswerFromId(questions, ids.summerTemp);
    answers.coolingType = getAnswerFromId(questions, ids.coolingSystem);
    answers.coolWholeHouse = getAnswerFromId(questions, ids.coolWholeHouse);
    answers.usesPersonalFan = getAnswerFromId(questions, ids.usesFan);
    answers.winterTemp = getAnswerFromId(questions, ids.winterTemp);
    answers.heatType = getAnswerFromId(questions, ids.heatingSystem);
    answers.heatWholeHome = getAnswerFromId(questions, ids.heatWholeHouse);
    answers.usesPersonalHeater = getAnswerFromId(questions, ids.usesPortableHeater);
    return answers;
}
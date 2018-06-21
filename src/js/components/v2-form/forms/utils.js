export const STEPS = {
    home: 1,
    homeActivities: 2,
    heatingCooling: 3,
    transportation: 4,
    food: 5,
    stuffHouse: 6,
    stuffActivities: 7,
}

export const filterQuestions = (questions, filterArray) => {
    return questions.filter(question => filterArray.indexOf(question.id) === -1);
}
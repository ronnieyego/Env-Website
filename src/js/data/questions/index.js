import userQuestions from './user-questions';
import transportationQuestions from './transportation-questions';
import foodQuestions from './food-questions';
import householdQuestions from './household-questions';
import stuffQuestions from './stuff-questions';

import costsQuestions from '../../components/costs/questions-index';

export default [
    ...userQuestions,
    ...householdQuestions,
    ...foodQuestions,
    ...transportationQuestions,
    ...stuffQuestions,

    // Costs
    ...costsQuestions
];
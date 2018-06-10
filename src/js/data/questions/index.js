import userQuestions from './user-questions';
import transportationQuestions from './transportation-questions';
import householdQuestions from './household-questions';
import stuffQuestions from './stuff-questions';

// Costs questions
import { bbqQuestions } from '../../components/costs/bbq/bbq-data';
import { bitcoinQuestions } from '../../components/costs/bitcoin/bitcoin-data';
import { booksQuestions } from '../../components/costs/books/books-data';
import { carQuestions } from '../../components/costs/car/car-data';
import { clothesQuestions } from '../../components/costs/clothes/clothes-data';
import { computerQuestions } from '../../components/costs/computer/computer-data';
import { cupQuestions } from '../../components/costs/cup/cup-data';
import { furnitureQuestions } from '../../components/costs/furniture/furniture-data';
import { homeQuestions } from '../../components/costs/home/home-data';
import { packageQuestions } from '../../components/costs/package/package-data';
import { petQuestions } from '../../components/costs/pet/pet-data';
import { steakQuestions } from '../../components/costs/steak/steak-data';
import { tabletQuestions } from '../../components/costs/tablet/tablet-data';
import { tvQuestions } from '../../components/costs/tv/tv-data';


export default [
    ...transportationQuestions,
    ...userQuestions,
    ...householdQuestions,
    ...stuffQuestions,

    // Costs
    ...bitcoinQuestions,
    ...bbqQuestions,
    ...booksQuestions,
    ...carQuestions,
    ...clothesQuestions,
    ...computerQuestions,
    ...cupQuestions,
    ...furnitureQuestions,
    ...homeQuestions,
    ...packageQuestions,
    ...petQuestions,
    ...steakQuestions,
    ...tabletQuestions,
    ...tvQuestions,
];
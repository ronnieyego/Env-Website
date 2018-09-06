import { bbqQuestions } from './bbq/bbq-data';
import { bitcoinQuestions } from './bitcoin/bitcoin-data';
import { booksQuestions } from './books/books-data';
import { carQuestions } from './car/car-data';
import { clothesQuestions } from './clothes/clothes-data';
import { computerQuestions } from './computer/computer-data';
import { cupQuestions } from './cup/cup-data';
import { furnitureQuestions } from './furniture/furniture-data';
import { garbageQuestions } from './garbage/garbage-data';
import { homeQuestions } from './home/home-data';
import { packageQuestions } from './package/package-data';
import { petQuestions } from './pet/pet-data';
import { steakQuestions } from './steak/steak-data';
import { tabletQuestions } from './tablet/tablet-data';
import { tvQuestions } from './tv/tv-data';

export default [
    ...bitcoinQuestions,
    ...bbqQuestions,
    ...booksQuestions,
    ...carQuestions,
    ...clothesQuestions,
    ...computerQuestions,
    ...cupQuestions,
    ...furnitureQuestions,
    ...garbageQuestions,
    ...homeQuestions,
    ...packageQuestions,
    ...petQuestions,
    ...steakQuestions,
    ...tabletQuestions,
    ...tvQuestions,
];
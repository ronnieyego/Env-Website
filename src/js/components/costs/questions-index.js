import index from './pages-index';

import { bbqQuestions } from './bbq/bbq-data';
import { booksQuestions } from './books/books-data';
import { carQuestions } from './car/car-data';
import { clothesQuestions } from './clothes/clothes-data';
import { cupQuestions } from './cup/cup-data';
import { furnitureQuestions } from './furniture/furniture-data';
import { homeQuestions } from './home/home-data';
import { tabletQuestions } from './tablet/tablet-data';

export default [
    ...bbqQuestions,
    ...booksQuestions,
    ...carQuestions,
    ...clothesQuestions,
    ...cupQuestions,
    ...furnitureQuestions,
    ...homeQuestions,
    ...tabletQuestions
];
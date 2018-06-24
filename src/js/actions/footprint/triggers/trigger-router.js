import isVegan from './is-vegan';
import isVegetarian from './is-vegetarian';

export default (allQuestions, trigger) => {
    switch(trigger) {
        case 'is-vegan':
            return isVegan(allQuestions);
        case 'is-vegetarian':
            return isVegetarian(allQuestions);
    }
    return allQuestions;
};

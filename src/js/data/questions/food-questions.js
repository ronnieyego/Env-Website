import ids from '../../utils/ids/index';

export default [
    {
        name: 'Are you a vegan?',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['food'],
        id: ids.isVegan
    },
    {
        name: 'Are you a vegetarian',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['food'],
        id: ids.isVegetarian
    },
    {
        name: 'How often do you eat beef?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'A few times per month',
            'Once a week',
            '2-3 times per week',
            'Everyday',
        ],
        value: 'Once a week',
        answerText: [
            '',
            'This means a few steak dinners each month',
            'This means a steak dinner once a week',
            'This means a steak dinner on Monday, beef stir fry on Thursday, and a cheesesteak for Sunday lunch.',
            'This means you usually have a beef based meal every day, sometimes two.'
        ],
        forms: ['food'],
        id: ids.beefFrequency
    },
    {
        name: 'How often do you eat chicken?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'A few times per month',
            'Once a week',
            '2-3 times per week',
            'Everyday',
        ],
        value: 'Once a week',
        answerText: [
            '',
            'This means a few chicken dinners each month',
            'This means a chicken dinner once a week',
            'This means a chicken dinner on Monday, fried chicken on Thursday, and a turkey sandwich for Sunday lunch.',
            'This means you usually have a chicken based meal every day, sometimes two.'
        ],
        forms: ['food'],
        id: ids.chickenFrequency
    },
    {
        name: 'How often do you eat pork?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'A few times per month',
            'Once a week',
            '2-3 times per week',
            'Everyday',
        ],
        value: 'Once a week',
        answerText: [
            '',
            'This means a few pork dinners each month',
            'This means a pork dinner once a week',
            'This means a pork dinner on Monday, 2 hot dogs/sausages on Thursday, and some bacon for Sunday breakfast.',
            'This means you usually have a pork based meal every day, sometimes two.'
        ],
        forms: ['food'],
        id: ids.porkFrequency
    },
    {
        name: 'How often do you eat grain?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'Rarely',
            'Once a day',
            'Few times per day',
            'As much as possible',
        ],
        value: 'Few times per day',
        answerText: [
            '',
            'This means a biscut maybe once a week.',
            'This means you generally try to avoid grains but be fine ordering a sandwich or getting sushi.',
            'This means toast/cereal for breakfast, a sandwich for lunch, and a meat dinner with a side of rice.',
            'This means that every meal centers around grain (like pad thai) or has a significant amount of grain (like a burger).  Generally you snack on crackers or bread/cheese.'
        ],
        forms: ['food'],
        id: ids.grainsFrequency
    },
    {
        name: 'How often do you eat cheese?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'Rarely',
            'Once a day',
            'Few times per day',
            'As much as possible',
        ],
        value: 'Once a day',
        answerText: [
            '',
            'This means you never seek out cheese but will eat it if its on a burger or salad',
            'This means you don\'t seek out cheese but generally like cheese based meals like mac and cheese, caesar salads, or grilled cheese sandwiches.',
            'This means incorporate cheese into your routine (like avocado and cheese toast for breakfast) and like cheese based meals like caesar salads and mac and cheese.',
            'This means you aim to add cheese to every meal.'
        ],
        forms: ['food'],
        id: ids.cheeseFrequency
    },
    {
        name: 'How often do you eat dairy (except cheese)?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'Rarely',
            'Once a day',
            'Few times per day',
            'As much as possible',
        ],
        value: 'Once a day',
        answerText: [
            '',
            'This means you never seek out dairy but will have it once a week',
            'This means a glass of milk a day.',
            'This means a glass of milk in the morning and yogurt as a side for lunch.',
            'This means a glass of milk in the morning, yogurt for lunch, and a butter based dish for dinner.'
        ],
        forms: ['food'],
        id: ids.dairyFrequency
    },
    {
        name: 'How often do you eat fruits?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'Rarely',
            'Once a day',
            'Few times per day',
            'As much as possible',
        ],
        value: 'Once a day',
        answerText: [
            'This means you\'re probably close to getting scurvy.',
            'This means an apple once a week.',
            'An apple a day keeps the doctor away.',
            'This means a side of fruit for breakfast and a banana with lunch.  Some nights will have a frit based dessert (like peach cobbler).',
            'This means a side of fruit for breakfast and a banana with lunch.  You might have a peach for a 3pm snack.  You try to add fruit to dinner (like apples on pork chops or grapes in salad).  Some nights will have a frit based dessert (like peach cobbler).'
        ],
        forms: ['food'],
        id: ids.fruitsFrequency
    },
    {
        name: 'How often do you eat vegetables?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'Rarely',
            'Once a day',
            'Few times per day',
            'As much as possible',
        ],
        value: 'Once a day',
        answerText: [
            '',
            'This means a side salad once a week.',
            'This means you generally don\'t order salads, but like it when dinner has some veggies in it (like a stir fry or a side of brocoli).',
            'This means you generally try to incorporate veggies to your meals.  You get "the works" for sandwiches, add peas to mac and cheese, and try to have a side of veggies with dinner.',
            'This means you always try to add veggies to your meals.  Salad goes with everything.  Eggplant can be the main entree for dinner.  Potatoes subsitute grains.'
        ],
        forms: ['food'],
        id: ids.vegetablesFrequency
    },
    {
        name: 'How often do you eat junk food?',
        type: 'dropdown',
        selectOptions: [
            'Never',
            'Rarely',
            'Once a day',
            'Few times per day',
            'As much as possible',
        ],
        value: 'Once a day',
        answerText: [
            '',
            'This means a brownie once a week and some pie on occasions.',
            'This means you reward yourself with some chocolate for making it through the day.',
            'No meal is complete without a small dessert.',
            'Donuts are a valid breakfast.  Lunch deserves a nice ending.  No dinner is complete without some pie or cake.'
        ],
        forms: ['food'],
        id: ids.junkFoodFrequency
    },
];
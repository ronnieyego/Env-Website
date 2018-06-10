import ids from '../../utils/ids/index';

export default [
    {
        name: 'Do you have a lot of furniture?',
        type: 'dropdown',
        selectOptions: [
            'I have almost no furniture',
            'My rooms are sparesly furnished',
            'I have all of the essentials',
            'My home is cramped',
        ],
        value: 'I have all of the essentials',
        forms: ['stuff-home'],
        answerText: [
            'You\'re living room has a chair instead of a couch, which also acts as the kitchen table.  You have a bed, but no desk and there\'s not much in any room.',
            'You have a table, bed, and a few chairs, but aside from that your rooms are pretty much empty.',
            'You have a complete dining room set and living room set.  Your bedroom has a bed, desk, and chair.  Other rooms have enough seating and storage.',
            'Everyone in your house has a place to sit and a place to put something on.  You have plenty of cabinets and bookcases to store stuff.  Each room is full.'
        ],
        id: ids.totalHouseFurniture
    },
    {
        name: 'How many clothes do you own',
        type: 'dropdown',
        selectOptions: [
            'Hardly any',
            'Just the essentials',
            'A good amount',
            'My closet it packed',
            'Way too many',
        ],
        answerText: [
            'You barely have enough clothes to last the week.',
            'You have ~20 shirts, a few pairs of pants, enough socks/underwear, and some coats',
            'You have ~40 shirts, around 10 pairs of pants, pleanty of socks/underwear, some coats, and lots of accessories.',
            'You have ~100 shirts, constantly find identical pants, have plenty of jacket options, and have a ton of accesories.  Your closet is full.',
            'You rarely wear the same outfit more than once a year.  Not only is your closet full, but you struggle to find storage for your clothes.'
        ],
        value: 'Just the essentials',
        forms: ['stuff-home'],
        id: ids.totalWardrobe
    },
]
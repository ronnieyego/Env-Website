import ids from '../../utils/ids/index';

export default [
    {
        name: 'Do you have a lot of furniture?',
        type: 'dropdown',
        selectOptions: [
            ids.veryLittleFurniture,
            ids.spareslyFurnished,
            ids.allTheEssentials,
            ids.crampedHome
        ],
        value: ids.allTheEssentials,
        forms: ['stuff-home'],
        answerText: [
            'You\'re living room has a chair instead of a couch, which also acts as the kitchen table.  You have a bed, but no desk and there\'s not much in any room.',
            'You have a table, bed, and a few chairs, but aside from that your rooms are pretty much empty.',
            'You have a complete dining room set and living room set.  Your bedroom has a bed, desk, and chair.  Other rooms have enough seating and storage.',
            'Everyone in your house has a place to sit and a place to put something on.  You have plenty of cabinets and bookcases to store stuff.  Each room is full.'
        ],
        index: 2,
        id: ids.totalHouseFurniture
    },
    {
        name: 'How many clothes do you own',
        type: 'dropdown',
        selectOptions: [
            ids.hardlyAny,
            ids.justTheEssentials,
            ids.aGoodAmount,
            ids.packedCloset,
            ids.wayTooMany
        ],
        answerText: [
            'You barely have enough clothes to last the week.',
            'You have ~20 shirts, a few pairs of pants, enough socks/underwear, and some coats',
            'You have ~40 shirts, around 10 pairs of pants, pleanty of socks/underwear, some coats, and lots of accessories.',
            'You have ~100 shirts, constantly find identical pants, have plenty of jacket options, and have a ton of accesories.  Your closet is full.',
            'You rarely wear the same outfit more than once a year.  Not only is your closet full, but you struggle to find storage for your clothes.'
        ],
        index: 2,
        value: ids.aGoodAmount,
        forms: ['stuff-home'],
        id: ids.totalWardrobe
    },
    {
        name: 'Please add any pets you have',
        type: 'multiple',
        childQuestionName: 'Pet #',
        questions: [ids.petType],
        forms: ['stuff-home'],
        id: ids.allPets
    },
    {
        name: 'How cluttered is your home?',
        subtext: 'This includes things like speakers, vacuums, trinkets, books, and other stuff you buy',
        type: 'dropdown',
        selectOptions: [
            ids.practicallyEmpty,
            ids.quiteUncluttered,
            ids.reasonablyFull,
            ids.extremelyFull,
            ids.noRoom
        ],
        answerText: [
            'Your shelves are empty and you generally engage in a minimalistic lifestyle.',
            'You don\'t buy stuff you don\'t need, but acquire things every now and then.  Your closets and shelves are about half capacity.',
            'Your shelves are full, but theres still space for more things in the back of the closet.',
            'You have trouble finding homes for new things and donate/dump a few boxes of stuff a few times a year.',
            'You can\'t find room in your home for anything so you buy extra storage space.  Even then things keep piling up.'
        ],
        index: 2,
        value: ids.reasonablyFull,
        forms: ['stuff-home'],
        id: ids.houseClutter
    },
]
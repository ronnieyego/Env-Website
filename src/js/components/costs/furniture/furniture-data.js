import ids from '../../../utils/ids/index';

export const furnitureData = {
    table: {
        sturdy: {
            amount: 192,
            description: 'Sturdy table made of particle board and steel legs'
        },
        particle: {
            amount: 90,
            description: 'Particle board table'
        },
        dining: {
            amount: 55,
            description: 'Wooden dining room table'
        },
        desk: {
            amount: 77,
            description: 'Large wooden desk'
        }
    },
    chair: {
        office: {
            amount: 158,
            description: 'Office chair with all of the frills'
        },
        wooden: {
            amount: 59,
            description: 'Standard wooden chair'
        },
        generic: {
            amount: 19,
            description: 'Generic stacking chair'
        },
    },
    sofa: {
        couch: {
            amount: 198,
            description: 'Standard couch'
        },
        arm: {
            amount: 95,
            description: 'Arm chair'
        },
        ottoman: {
            amount: 37,
            description: 'Ottoman'
        },
    },
    storage: {
        bookcase: {
            amount: 40,
            description: 'A standard bookcase'
        },
        filingCabinet: {
            amount: 97,
            description: 'Waist high steel filing cabinet'
        },
        drawer: {
            amount: 70,
            description: 'Standard wall cupboard'
        }
    },
    bed: {
        queen: {
            amount: 174,
            description: 'Queen size matress'
        },
        frame: {
            amount: 77,
            description: 'Frame for a matress'
        },
        headboard: {
            amount: 48,
            description: 'Headboard for a bed'
        }
    }
};


export const furnitureQuestions = [
    {    
        id: ids.numChairs,
        name: 'How many chairs do you own?',
        type: 'int',
        value: 0,
        forms: ['furniture'],
        formType: 'costs'
    },
    {    
        id: ids.numTables,
        name: 'How many tables do you own?',
        type: 'int',
        value: 0,
        forms: ['furniture'],
        formType: 'costs'
    },
    {    
        id: ids.numCouches,
        name: 'How many couches do you own?',
        type: 'int',
        value: 0,
        forms: ['furniture'],
        formType: 'costs'
    },
    {    
        id: ids.numBookcases,
        name: 'How many bookcases do you own?',
        type: 'int',
        value: 0,
        forms: ['furniture'],
        formType: 'costs'
    },
    {    
        id: ids.numDrawers,
        name: 'How many cupboards and drawers are in your kitchen?',
        type: 'int',
        value: 0,
        forms: ['furniture'],
        formType: 'costs'
    },
    {    
        id: ids.numBeds,
        name: 'How many beds do you own?',
        type: 'int',
        value: 0,
        forms: ['furniture'],
        formType: 'costs'
    }
];

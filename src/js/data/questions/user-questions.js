import ids from '../../utils/ids/index';

export default [
    {
        id: ids.userState,
        name: 'Which state do you live in?',
        type: 'user-state',
        forms: ['pet', 'tv', 'package', 'household-home'],
        omitUs: true
    },
    {
        id: ids.userZip,
        name: 'Which zip code do you live in?',
        type: 'int',
        validator: 'zip-code',
        forms: ['household-home'],
        trigger: 'resolve-zip'
    }
]
import ids from '../../utils/ids/index';

export default [
    {
        id: ids.userState,
        name: 'What state do you live in?',
        type: 'user-state',
        forms: ['pet', 'tv', 'package', 'household-home'],
        omitUs: true
    }
]
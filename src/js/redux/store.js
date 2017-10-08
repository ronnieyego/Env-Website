import { applyMiddleware, createStore } from 'redux';

import reducers from './reducers/index.js';

console.log('inside store');


export default createStore(reducers);



// store.subscribe(() => {
//     console.log('store changed', store.getState());
// })

// store.dispatch({type: 'ADD_QUESTION', payload: 'First question'});
// store.dispatch({type: 'ADD_QUESTION', payload: 'second question'});
// store.dispatch({type: 'ADD_QUESTION', payload: 'third question'});
// store.dispatch({type: 'REMOVE_QUESTIONS'});

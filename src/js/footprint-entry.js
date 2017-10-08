import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducers from './redux/reducers/index';

import ReduxTestHoc from './components/ReduxTestHoc'
import FootprintCalcPage from './pages/FootprintCalculator'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(reducers, preloadedState)


console.log('store is', store);
console.log('store data is', store.getState());

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <FootprintCalcPage/>
    </Provider>, app);

import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers from '../redux/reducers/index';

import Static from '../pages/Static'

// Grab the state from a global variable injected into the server-generated HTML


const preloadedState = window.__PRELOADED_STATE__ || {};
preloadedState.metadata = { isServerSide: false };
const page = preloadedState.page;

// Allow the passed state to be garbage-collected

delete window.__PRELOADED_STATE__;
// No real need to do this, but i get a console warning saying there's an unknown item when i try to make my store.
delete preloadedState.page;


// Create Redux store with initial state
// Note:  I added a store here but don't know if ill use it.
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, preloadedState, middleware);

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Static page={page}/>
        </MuiThemeProvider>
    </Provider>
, app);

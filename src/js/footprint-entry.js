import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './redux/reducers/index';

// Pages
import FootprintCalcPage from './pages/FootprintCalculator';
import Co2e from './pages/static/Co2e';
import HowTheFormWorks from './pages/static/HowTheFormWorks';


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, preloadedState, middleware);

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={FootprintCalcPage} />
                <Route exact path="/pages/co2e" component={Co2e} />
                <Route exact path="/pages/how-your-footprint-was-calculated" component={HowTheFormWorks} />
            </div>
        </Router>
    </Provider>
, app);

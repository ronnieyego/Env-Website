import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import { renderFullPage } from '../../server/ssr-middleware';
import { addMobileToStore } from '../../server/utils';

// Database
import { States } from '../../../../db/models/states';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';
import updateCostsReducer from '../../redux/update-reducer-by-page';

// Page
import SolarWidget from '../../pages/SolarWidget';

// Utils
import validStateId from '../../utils/check-if-valid-state-id';
import { getStateAndUsData } from './load-state-data';

// TODO:  Make solar page use the store.

export default async (req, res) => {
    let state = req.params.state ? req.params.state.toUpperCase() : 'US';
    if(!validStateId(state)) {
        console.log('inproper query param');
        res.status(400).send("inproper query param");
    }
    const stateData = await getStateAndUsData(state);
    if(stateData.error) {
        res.status(500).send(stateData.message);
    }

    const initStore = addMobileToStore(req, stateData);
    const store = createStore(reducers, initStore);

    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
        <MuiThemeProvider>
            <SolarWidget {...stateData}/>
        </MuiThemeProvider>
    </Provider>
    );
    res.status(200).send(renderFullPage(appMarkup, initStore, 'solar-widget'));
};

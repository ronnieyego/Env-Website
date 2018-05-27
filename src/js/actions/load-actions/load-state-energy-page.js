import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import renderFullPage  from '../../server/render-page';
import { addMobileToStore } from '../../server/utils';

// Database
import { States } from '../../../../db/models/states';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';
import updateCostsReducer from '../../redux/update-reducer-by-page';

// Page
import StateEnergyProfile from '../../pages/StateEnergyProfile';

// Utils
import validStateId from '../../utils/check-if-valid-state-id';
import getCo2EmissionsByKwh from '../../utils/get-co2-emissions-by-kwh';
import { getStateAndUsData } from './load-state-data';

export default async (req, res) => {
    let state = (req.params.state).toUpperCase();
    if(!validStateId(state)) {
        console.log('inproper query param');
        res.status(400).send("inproper query param");
    }
    const allData = await getStateAndUsData(state);
    if(allData.error) {
        res.status(500).send(allData.message);
    }
    const formattedData = { stateEnergy: allData.completeStateData };
    const initStore = addMobileToStore(req, formattedData);
    const store = createStore(reducers, formattedData);
    
    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <StateEnergyProfile {...formattedData} />
            </MuiThemeProvider>
        </Provider>
        );

    res.status(200).send(renderFullPage(appMarkup, formattedData, 'state-energy-profile'));
}

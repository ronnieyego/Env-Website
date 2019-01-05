import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import renderFullPage  from '../../server/render-page';
import { addMobileToStore } from '../../server/utils';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';

// Page
import LocalEnergy from '../../pages/LocalEnergy';

export default async (req, res) => {
    const formattedData = { }; // Placeholder until I have the ability to preload based on url path.
    const initStore = addMobileToStore(req, formattedData);
    const store = createStore(reducers, initStore);
    
    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <LocalEnergy {...formattedData} />
            </MuiThemeProvider>
        </Provider>
        );

    res.status(200).send(renderFullPage(appMarkup, formattedData, 'local-energy-profile'));
}

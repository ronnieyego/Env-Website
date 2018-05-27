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
import UsEnergy from '../../pages/UsEnergy';

export default (req,res) => {
    const initStore = addMobileToStore(req, {});
    const store = createStore(reducers, initStore);

    const appMarkup = ReactDOM.renderToString(
    <Provider store={store}>
        <MuiThemeProvider>
            <UsEnergy />
        </MuiThemeProvider>
    </Provider>);
    res.status(200).send(renderFullPage(appMarkup, initStore, 'us-energy'));
}

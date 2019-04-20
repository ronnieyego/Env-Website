import React from 'react';
import ReactDOMServer from 'react-dom/server'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import renderFullPage  from '../../server/render-page';
import { addMobileToStore } from '../../server/utils';


// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';

export default async({ component, dataSeed, page, req, res }) => {
    const updatedDataSeed = addMobileToStore(req, dataSeed)
    const store = createStore(reducers, updatedDataSeed);

    const appMarkup = ReactDOMServer.renderToString(
            <Provider store={store}>
                <MuiThemeProvider >
                    {component}
                </MuiThemeProvider>
            </Provider>
    );
    
    return res.status(200).send(renderFullPage(appMarkup, store.getState(), page));
};

import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import { renderFullPage } from '../../server/ssr-middleware';
import { addMobileToStore } from '../../server/utils';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';

// Pages
import StaticPages from '../../pages/Static';

export default (req, res) => {
    const store = createStore(reducers);
    let currentState = store.getState();
    currentState = addMobileToStore(req, store);
    const appMarkup = ReactDOM.renderToString(
        <Provider store={currentState}>
            <MuiThemeProvider>
                <div />
            </MuiThemeProvider>
        </Provider>
    );
    res.status(200).send(renderFullPage(appMarkup, null, 'static-pages')); 
}
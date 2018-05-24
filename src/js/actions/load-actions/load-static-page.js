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
import staticPages from '../../pages/static/pages-index';
import Static from '../../pages/Static';

export default (req, res) => {
    const page = req.params.page.toLowerCase().replace(/-/g, '');
    const staticPagesKeys = Object.keys(staticPages);
    if(staticPagesKeys.indexOf(page) === -1) {
        return res.status(400).send({ message: 'Page not found :('});
    };

    const dataSeed = {
        userInfo: {
            userState: 'US'
        }
    };
    const initStore = addMobileToStore(req, dataSeed);
    const store = createStore(reducers, initStore);
    const dataPayload = store.getState();
    dataPayload.page = page;

    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <Static page={page}/>
            </MuiThemeProvider>
        </Provider>
    );
    res.status(200).send(renderFullPage(appMarkup, dataPayload, 'static-pages')); 
}
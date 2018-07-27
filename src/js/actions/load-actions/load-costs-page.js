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
import updateCostsReducer from '../../redux/update-reducer-by-page';

// Pages
import CostsPages from '../../pages/Costs';
import costPages from '../../components/costs/pages-index';

export default (req, res) => {
    const page = req.params.page.toLowerCase();
    const costPagesKeys = Object.keys(costPages);
    if(costPagesKeys.indexOf(page) === -1) {
        return res.status(400).send({ message: 'Page not found :('});
    }

    const dataSeed = {
        userInfo: {
            userState: 'US'
        }
    };
    const initStore = addMobileToStore(req, dataSeed);
    const store = createStore(reducers, initStore);
    let currentState = store.getState();
    const updatedReducer = updateCostsReducer(currentState, page);
    updatedReducer.page = page;
    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <CostsPages page={page} />
            </MuiThemeProvider>
        </Provider>
    );
    res.status(200).send(renderFullPage(appMarkup, updatedReducer, 'cost-pages')); 
};
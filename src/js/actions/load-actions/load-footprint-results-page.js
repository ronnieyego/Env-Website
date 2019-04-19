import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import renderFullPage  from '../../server/render-page';
import { addMobileToStore } from '../../server/utils';

// Database
import { FormAnswers } from '../../../../db/models/form-answers';
import { ObjectId } from 'mongodb';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';
import { baseState } from '../../redux/reducers/footprint-form-answers-reducer';

// Providers
import { loadResultsPageData } from '../../server/providers/v2-footprint-provider';

export default async (req, res) => {
    const id = req.params.id;

    // Deprecated.  Getting Results from Mongo

    // try {
    //     id = ObjectId(req.params.id)
    // } catch(e) {
    //     console.log('Invalid Id: ', req.params.id,  e);
    //     res.status(500).send(`Invalid Id: ${req.params.id}`);
    // }

    // const answers = await FormAnswers.find({_id: id});
    // if(!answers || !answers[0]) {
    //     console.log(`Could not find Id: ${req.params.id}`);
    //     res.status(404).send(`Could not find Id: ${req.params.id}`);
    // }
    // const answer = answers[0];
    const v2Data = await loadResultsPageData(id);
    const storeData = {
        footprintFormAnswers: {
            ...baseState,
            answerId: id,
            formResults: v2Data.results,
            userState: 'WA' // FIX ME
        },
        questions: {
            questions: v2Data.answers
        }
    };

    const appendedStoreData = addMobileToStore(req, storeData);
    const store = createStore(reducers, appendedStoreData);
    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <div />
            </MuiThemeProvider>
        </Provider>);
    res.status(200).send(renderFullPage(appMarkup, appendedStoreData, 'results'));
};
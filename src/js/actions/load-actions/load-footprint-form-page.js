import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import { renderFullPage } from '../../server/ssr-middleware';
import { addMobileToStore } from '../../server/utils';

// Database
import { FormAnswers } from '../../../../db/models/form-answers';
import { ObjectId } from 'mongodb';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';

// Pages
import FootprintCalculator from '../../pages/FootprintCalculator';

// Data
import footprintQuestions from '../../../../public/data/temp-footprint-questions.json';

export default async (req, res) => {
    const questions = footprintQuestions.questions;
    // need to default the entire form and not just questions
    // otherwise reducer will think it has state and not do defaults
    const storeData = {
        footprintForm: {
            questions,
            getQuestionsError: false,
            step: 1,
            isSubmitReady: true
        }
    };
    const initStore = addMobileToStore(req, {});
    const store = createStore(reducers, initStore);

    const appMarkup = ReactDOM.renderToString(
    <Provider store={store}>
        <MuiThemeProvider>
            <FootprintCalculator />
        </MuiThemeProvider>
    </Provider>);
    res.status(200).send(renderFullPage(appMarkup, initStore, 'footprint'));
}
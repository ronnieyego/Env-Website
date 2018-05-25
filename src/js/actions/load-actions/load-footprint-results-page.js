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
import { baseState } from '../../redux/reducers/footprint-form-answers-reducer';
import updateCostsReducer from '../../redux/update-reducer-by-page';

// Pages

export default async (req, res) => {
    let id;
    try {
        id = ObjectId(req.params.id)
    } catch(e) {
        console.log('Invalid Id: ', req.params.id,  e);
        res.status(500).send(`Invalid Id: ${req.params.id}`);
    }
    
    const answers = await FormAnswers.find({_id: id});
    if(!answers[0]) {
        console.log(`Could not find Id: ${req.params.id}`);
        res.status(404).send(`Could not find Id: ${req.params.id}`);
    }
    const answer = answers[0];
    const storeData = {
        footprintForm: {
            questions: answer.questions,
            getQuestionsError: false,
            step: 1,
            isSubmitReady: true,
            questions: answer.formAnswers
        },
        footprintFormAnswers: {
            ...baseState,
            answerId: id,
            formResults: answer.results
        }
    };
    const appendedStoreData = addMobileToStore(req, storeData);
    appendedStoreData.page = 'footprintresult';
    const store = createStore(reducers, appendedStoreData);
    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <div />
            </MuiThemeProvider>
        </Provider>);
    res.status(200).send(renderFullPage(appMarkup, appendedStoreData, 'static-pages'));
};
import React from 'react';
import ReactDOM from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Server
import { renderFullPage } from '../../server/ssr-middleware';
import { addMobileToStore } from '../../server/utils';

// Database
import { FormAnswers } from '../../../../db/models/form-answers';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers/index';
import { baseState } from '../../redux/reducers/footprint-form-answers-reducer';
import updateCostsReducer from '../../redux/update-reducer-by-page';

// Pages

export default (req, res) => {
    const id = req.params.id;
    FormAnswers.find({_id: id}).then(answers => {
        const answer = answers[0];
        if(!answer) {
            res.send(404);
        }
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
    })
    .catch(e => {
        console.log('error loading footprint by id ', e);
        res.send(500);
    });
};
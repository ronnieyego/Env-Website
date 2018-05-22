import React from 'react';
import ReactDOM from 'react-dom/server';
import {ServerRouter as Router, Route} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Q from 'q';

// Redux
import reducers from '../redux/reducers/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { baseState } from '../redux/reducers/footprint-form-answers-reducer';
import updateCostsReducer from '../redux/update-reducer-by-page';

// Pages
import SolarWidget from '../pages/SolarWidget'
import StateEnergyProfile from '../pages/StateEnergyProfile';
import UsEnergy from '../pages/UsEnergy';
import FootprintCalculator from '../pages/FootprintCalculator';
import StaticPages from '../pages/Static';
import CostsPages from '../pages/Costs';
import costPages from '../components/costs/pages-index';

// Database
import { mongoose } from '../../../db/mongoose';
import { States } from '../../../db/models/states';
import { FormAnswers } from '../../../db/models/form-answers';

// Utils
import getCo2EmissionsByKwh from '../utils/get-co2-emissions-by-kwh';
import validStateId from '../utils/check-if-valid-state-id';
import getStateData from '../utils/apis/get-state-data';
import { addMobileToStore } from './utils';

// Data
import footprintQuestions from '../../../public/data/temp-footprint-questions.json';

const renderFullPage = (markup, data, page) => {
    let jsLocation;
    switch (page) {
        case 'solar-widget':
            jsLocation = '/public/solar.min.js';
            break;
        case 'us-energy':
            jsLocation = '/public/us-energy.min.js';
            break;
        case 'state-energy-profile':
            jsLocation = '/public/state-energy.min.js';
            break;
        case 'footprint':
            jsLocation = '/public/footprint.min.js';
            break;
        case 'static-pages':
            jsLocation = '/public/static-pages.min.js';
            break;
        case 'cost-pages':
            jsLocation = '/public/costs-pages.min.js';
            break;
        default:
            jsLocation = '/public/solar.min.js';
    };

    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8' name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <title>Footprint Finder</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <link rel="shortcut icon" type="image/png" href="/public/footprint.png">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <link type="text/css" href="/public/less.css" rel="stylesheet"/>
                <script>
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                    ga('create', 'UA-104075818-1', 'auto');
                    ga('send', 'pageview');

                </script>
            </head>

            <body>
                <div id="fb-root"></div>
                <script>(function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11';
                    fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                </script>
                <div id="app">${markup}</div>
                <script type="text/javascript">
                window.__STATE__ = ${JSON.stringify(data)}
                window.__PRELOADED_STATE__ = ${JSON.stringify(data)}
                </script>
                <script type="text/javascript" src=${jsLocation}></script>
            </body>
        </html>
    `
};

const appendUSAverages = stateData => {
    const appendUSAveragesDeferred = Q.defer();
    States.find({ stateId: 'US'})
    .then( usData => {
        if(!usData) {
            appendUSAveragesDeferred.reject('Couldn\'t find state data');
        } else {
            let res = JSON.parse(JSON.stringify(usData[0]));
            stateData['US'] = res;
            appendUSAveragesDeferred.resolve(stateData);
        }
    });
    return appendUSAveragesDeferred.promise
};

const solarMiddleware =  (req, res) => {
    console.log('req is ', req.params);
    let state = req.params.state ? req.params.state.toUpperCase() : 'US';
    if(validStateId(state)) {
        getStateData(state)
        .then(stateData => {
            // Check to see if I have install price data for states.  If not, add it!
            return appendUSAverages(stateData);
        })
        .then(stateData => {
            const appMarkup = ReactDOM.renderToString(<SolarWidget {...stateData}/>);
            res.status(200).send(renderFullPage(appMarkup, stateData, 'solar-widget'));
        })
        .catch(e => {
            console.log('error in getting solar data', e);
            res.status(500).send("Something went wrong while fetching the data :(");
        });
    } else {
        console.log('inproper query param');
        res.status(400).send("inproper query param");
    }
};



const stateEnergyMiddleware =  (req, res) => {
    let state = (req.params.state).toUpperCase();
    if(validStateId(state)) {
        getStateData(state)
        .then(stateData => {
            return appendUSAverages(stateData);
        })
        .then(allData => {
            let comparisons = allData.US.stateComparisons;
            delete allData.US;
            allData['stateComparisons'] = comparisons;

            // Create a new Redux store instance
            const store = createStore(reducers, {stateEnergy: {...allData}});
            
            const appMarkup = ReactDOM.renderToString(
                <Provider store={store}>
                    <MuiThemeProvider>
                        <StateEnergyProfile {...allData} />
                    </MuiThemeProvider>
                </Provider>
                );

            res.status(200).send(renderFullPage(appMarkup, allData, 'state-energy-profile'));
        })
        .catch(e => {
            console.log(e, 'Error appending US data');
            res.status(500).send("There was a problem appending US data");
        });
    } else {
        console.log('inproper query param');
        res.status(400).send("inproper query param");
    }
};

const usEnergyMapMiddleware = (req, res) => {
     // Create a new Redux store instance
     const store = createStore(reducers);
     
    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    const appMarkup = ReactDOM.renderToString(
    <Provider store={store}>
        <MuiThemeProvider>
            <UsEnergy />
        </MuiThemeProvider>
    </Provider>);
    res.status(200).send(renderFullPage(appMarkup, {}, 'us-energy'));
}

const footprintMiddleware = (req, res) => {
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
    const store = createStore(reducers, storeData);
    let currentState = store.getState();
    currentState = addMobileToStore(req, store);

    const appMarkup = ReactDOM.renderToString(
    <Provider store={store}>
        <MuiThemeProvider>
            <FootprintCalculator />
        </MuiThemeProvider>
    </Provider>);
    res.status(200).send(renderFullPage(appMarkup, currentState, 'footprint'));
}

const footprintByIdMiddleware = (req, res) => {
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
}

module.exports = {
    footprintMiddleware,
    footprintByIdMiddleware,
    solarMiddleware,
    stateEnergyMiddleware,
    usEnergyMapMiddleware,
    renderFullPage
}
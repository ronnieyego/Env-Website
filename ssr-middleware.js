import React from 'react';
import ReactDOM from "react-dom/server";
import {ServerRouter as Router, Route} from 'react-router-dom';

import Q from 'q';
import _ from 'lodash';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Redux
import reducers from './src/js/redux/reducers/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { baseState } from './src/js/redux/reducers/footprint-form-answers-reducer';

// Pages
import SolarWidget from './src/js/pages/SolarWidget'
import StateEnergyProfile from './src/js/pages/StateEnergyProfile';
import UsEnergy from './src/js/pages/UsEnergy';
import FootprintCalculator from './src/js/pages/FootprintCalculator';
import StaticPages from './src/js/pages/Static';

// Database
import { mongoose } from './db/mongoose';
import { States } from './db/models/states';
import { FormAnswers } from './db/models/form-answers';

// Utils
import getCo2EmissionsByKwh from './src/js/utils/get-co2-emissions-by-kwh';
import validStateId from './src/js/utils/check-if-valid-state-id';
import getStateData from './src/js/utils/apis/get-state-data';

// Data
import footprintQuestions from './public/data/temp-footprint-questions.json';

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
        default:
            jsLocation = '/public/solar.min.js';
    };
    //widget.css
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
                <title>Footprint Finder</title>
                <link rel="shortcut icon" type="image/png" href="/public/footprint.png">
                 <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
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

    const appMarkup = ReactDOM.renderToString(
    <Provider store={store}>
        <MuiThemeProvider>
            <FootprintCalculator />
        </MuiThemeProvider>
    </Provider>);
    res.status(200).send(renderFullPage(appMarkup, storeData, 'footprint'));
}

const footprintByIdMiddleware = (req, res) => {
    const id = req.params.id;
    FormAnswers.find({_id: id}).then(answers => {
        const answer = answers[0];
        console.log('answer', answer);
        if(!answer) {
            res.send(404);
        }
        const storeData = {
            footprintFormAnswers: {
                ...baseState,
                formResults: answer.results,
                questions: answer.formAnswers
            }
        };

        console.log('storeData is', storeData);
        const store = createStore(reducers, storeData);
    
        console.log('store is', store);
        const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <div />
            </MuiThemeProvider>
        </Provider>);
        res.status(200).send(renderFullPage(appMarkup, storeData, 'static-pages'));

    })
    .catch(e => {
        console.log('error loading footprint by id ', e);
        res.send(500);
    });
}

const staticPagesMiddleware = (req, res) => {
    const store = createStore(reducers);
    const appMarkup = ReactDOM.renderToString(
        <Provider store={store}>
            <MuiThemeProvider>
                <div />
            </MuiThemeProvider>
        </Provider>
    );
    res.status(200).send(renderFullPage(appMarkup, null, 'static-pages')); 
}

module.exports = {
    footprintMiddleware,
    footprintByIdMiddleware,
    solarMiddleware,
    stateEnergyMiddleware,
    staticPagesMiddleware,
    usEnergyMapMiddleware
}
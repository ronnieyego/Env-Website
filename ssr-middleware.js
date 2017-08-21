import React from 'react';
import ReactDOM from "react-dom/server";
import Q from 'q';
import _ from 'lodash';

// Pages
import Layout from './src/js/components/Layout';
import StateEnergyProfile from './src/js/pages/StateEnergyProfile';
import UsEnergy from './src/js/pages/UsEnergy';
import FootprintCalculator from './src/js/pages/FootprintCalculator';

// Database
import { mongoose } from './db/mongoose';
import { States } from './db/models/states';

// Utils
import getCo2EmissionsByKwh from './src/js/utils/get-co2-emissions-by-kwh';
import validStateId from './src/js/utils/check-if-valid-state-id';

const renderFullPage = (markup, data, page) => {
    let jsLocation;
    switch (page) {
        case 'solar-widget':
            jsLocation = '/public/scripts.min.js';
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
        default:
            jsLocation = '/public/scripts.min.js';
    };

    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
                <title>Footprint Finder</title>
                <link rel="shortcut icon" type="image/png" href="/public/footprint.png">
                 <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
                 <link type="text/css" href="/public/widget.css" rel="stylesheet"/>
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

const getStateData = stateId => {
    const getStateDataDeferred = Q.defer();
    States.find({ stateId: stateId}).then((stateInfo) => {
        if(!stateInfo) {
            getStateDataDeferred.reject('Couldn\'t find state data');
        } else {
            let res = JSON.parse(JSON.stringify(stateInfo[0]));
            let production = res.energyProduction;
            let averageCO2PerKwh = getCo2EmissionsByKwh(production.total, production.naturalGas, production.coal, production.petroleum);
            res.energyProduction.averageCO2PerKwh = averageCO2PerKwh;
            getStateDataDeferred.resolve(res);
        }              
    });
    return getStateDataDeferred.promise;
}

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
            const appMarkup = ReactDOM.renderToString(<Layout {...stateData}/>);
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
            const appMarkup = ReactDOM.renderToString(<StateEnergyProfile {...allData}/>);
            res.status(200).send(renderFullPage(appMarkup, allData, 'state-energy-profile'));
        })
        .catch(e => {
            console.log('Error appending US data');
            res.status(500).send("There was a problem appending US data");
        });
    } else {
        console.log('inproper query param');
        res.status(400).send("inproper query param");
    }
};

const usEnergyMapMiddleware = (req, res) => {
    const appMarkup = ReactDOM.renderToString(<UsEnergy />);
    res.status(200).send(renderFullPage(appMarkup, {}, 'us-energy'));
}

const footprintMiddleware = (req, res) => {
    const appMarkup = ReactDOM.renderToString(<FootprintCalculator />);
    res.status(200).send(renderFullPage(appMarkup, {}, 'footprint'));
}


module.exports = {
    footprintMiddleware,
    solarMiddleware,
    stateEnergyMiddleware,
    usEnergyMapMiddleware
}
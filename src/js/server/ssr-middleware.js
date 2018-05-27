import React from 'react';
import ReactDOM from 'react-dom/server';

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


module.exports = {
    renderFullPage
}
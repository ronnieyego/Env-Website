import React from 'react';
import ReactDOM from "react-dom/server";

import Layout from './src/js/components/Layout';
import { mongoose } from './db/mongoose';
import { States } from './db/models/states';
import getCo2EmissionsByKwh from './src/js/utils/get-co2-emissions-by-kwh';
import validStateId from './src/js/utils/check-if-valid-state-id';

const renderFullPage = (markup, defaultState) => {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
                <title>Footprint Finder</title>
                 <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
                 <link type="text/css" href="/public/widget.css" rel="stylesheet"/>
            </head>

            <body>
                <div id="app">${markup}</div>
                <script type="text/javascript">
                window.__STATE__ = ${JSON.stringify(defaultState)}
                </script>
                <script type="text/javascript" src="/public/scripts.min.js"></script>

            </body>
        </html>
    `
};

export default (req, res) => {
    console.log('params are',req.params);
    let state = (req.params.state).toUpperCase();
    if(validStateId(state)) {
        let myPromise = new Promise((resolve, reject) => {
            States.find({ stateId: state}).then((stateInfo) => {
                if(!stateInfo) {
                    reject('Couldn\'t find state data');
                } else {
                    let res = JSON.parse(JSON.stringify(stateInfo[0]));
                    let production = res.energyProduction;
                    let averageCO2PerKwh = getCo2EmissionsByKwh(production.total, production.naturalGas, production.coal, production.petroleum);
                    res.energyProduction.averageCO2PerKwh = averageCO2PerKwh;
                    resolve(res);
                }
                            
            });
        })
        myPromise.then((stateData) => {
            const appMarkup = ReactDOM.renderToString(<Layout {...stateData}/>);
            res.send(renderFullPage(appMarkup, stateData));

        });
    } else {
        console.log('inproper query param');
        res.send("inproper query param");
    }
};
   

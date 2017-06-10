import React from 'react';
import ReactDOM from "react-dom/server";

//Pages
import Layout from './src/js/components/Layout';
import StateEnergyProfile from './src/js/pages/state-energy-profile';

import { mongoose } from './db/mongoose';
import { States } from './db/models/states';
import getCo2EmissionsByKwh from './src/js/utils/get-co2-emissions-by-kwh';
import validStateId from './src/js/utils/check-if-valid-state-id';

const renderFullPage = (markup, data, page) => {
    let jsLocation;
    switch (page) {
        case 'solar-widget':
            jsLocation = '/public/scripts.min.js';
            break;
        case 'energy-profile':
            jsLocation = '/public/energy.min.js';
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
                 <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
                 <link type="text/css" href="/public/widget.css" rel="stylesheet"/>
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

const getUSAverages = (stateData) => {
    let uSAverages = new Promise((resolve, reject) => {
        if(true) {
            States.find({ stateId: 'US'})
            .then((stateInfo) => {
                if(!stateInfo) {
                    reject('Couldn\'t find state data');
                } else {
                    let res = JSON.parse(JSON.stringify(stateInfo[0]));
                    console.log(stateData);
                    stateData['US'] = res;
                    resolve(stateData);
                }
            });
        } else {
            console.log('already have state data');
            resolve(stateData);
        }
    });

};

const solarMiddleware =  (req, res) => {
    let state = (req.params.state).toUpperCase();
    if(validStateId(state)) {
// Getting state data        
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
// Check to see if I have install price data for states.  If not, add it!
// TODO: I'm nesting a promise chain here.  I can probably do better
            let uSAverages = new Promise((resolve, reject) => {
                if(!stateData.misc.installPrice6kw || !stateData.misc.installPrice10kw) { 
                        States.find({ stateId: 'US'})
                        .then((stateInfo) => {
                            if(!stateInfo) {
                                reject('Couldn\'t find state data');
                            } else {
                                let res = JSON.parse(JSON.stringify(stateInfo[0]));
                                let averages = {
                                    'installPrice6kw': res.misc.installPrice6kw,
                                    'installPrice10kw': res.misc.installPrice10kw
                                }
                                stateData['usAverages'] = averages;
                                resolve(stateData);
                            }

                    }) 
                }else {
// State already has install price                    
                    resolve(stateData);
                }
            })
            uSAverages.then(stateData => {
                const appMarkup = ReactDOM.renderToString(<Layout {...stateData}/>);
                res.status(200).send(renderFullPage(appMarkup, stateData, 'solar-widget'));
            });
        });
    } else {
        console.log('inproper query param');
        res.status(400).send("inproper query param");
    }
};



const stateEnergyMiddleware =  (req, res) => {
    let state = (req.params.state).toUpperCase();
    if(validStateId(state)) {
// Getting state data        
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
            const appMarkup = ReactDOM.renderToString(<StateEnergyProfile {...stateData}/>);
            res.status(200).send(renderFullPage(appMarkup, stateData, 'energy-profile'));
        });
    } else {
        console.log('inproper query param');
        res.status(400).send("inproper query param");
    }
};


module.exports = {
    solarMiddleware,
    stateEnergyMiddleware
}
import React from 'react';
import ReactDOM from "react-dom/server";

import Layout from './src/js/components/Layout';
import { mongoose } from './db/mongoose';
import { States } from './db/models/states';

const renderFullPage = (markup, defaultState) => {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
                <title>React Tutorial</title>
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
    let state = req.params.state;
    

    // I need to make this a promise case im jsut skipping it

    if(States) {
        let myPromise = new Promise((resolve, reject) => {
            console.log('started promise');
            States.find({ stateId: state}).then((stateInfo) => {
                if(!stateInfo) {
                    reject('Couldn\'t find state data');
                } else {
                    let res = JSON.parse(JSON.stringify(stateInfo[0]));
                    res.sunHours = 12;//Math.round(res.totalSunHours/365);
                    console.log('promised about to resolve!');
                    resolve(res);
                    
                }
                            
            });
        })
        myPromise.then((stateData) => {
            console.log('promised resolved yay!');
            console.log(stateData);

            const appMarkup = ReactDOM.renderToString(<Layout {...stateData}/>);
            res.send(renderFullPage(appMarkup, stateData));

        });
    } else {
        console.log('inproper query param');
    }
};
   

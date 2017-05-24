import React from 'react';
import ReactDOM from "react-dom/server";

import Layout from './src/js/components/Layout';
//import { mongoose } from './db/mongoose';
//import { Zips } from './db/models/zips';

'../'

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
    //console.log('params are',req.params);
    //let state = req.params.state;
    /*
    let zip = 95130;
    if(state) {
        Zips.find({ zip: zip}).then((hoursOfSunPerDay) => {
            if(!hoursOfSunPerDay) {
                return res.status(404).send('');
            } else {
                console.log(hoursOfSunPerDay);
                let hoursOfSun = hoursOfSunPerDay[0].hoursOfSunPerDay;
                console.log(hoursOfSun);
            }
        });
    }
   */
    const defaultState = {
        sunHours: 1000
    };

    const appMarkup = ReactDOM.renderToString(<Layout {...defaultState}/>);

    res.send(renderFullPage(appMarkup, defaultState));
    //res.sendFile(path.join(__dirname+'/public/index.html'));
}

import React from 'react';
import ReactDOM from "react-dom/server";

import Layout from './src/js/components/Layout';

const renderFullPage = (markup, defaultState) => {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
                <title>React Tutorial</title>
                 <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
                 <link href="widget.css" rel="stylesheet"/>
            </head>

            <body>
                <div id="app">${markup}</div>
                <script type="text/javascript">
                window.__STATE__ = ${JSON.stringify(defaultState)}
                </script>
                <script src="scripts.min.js"></script>

            </body>
        </html>
    `
};

export default  function(req, res) {

    const defaultState = {
        sunHours: 1000
    };

    const appMarkup = ReactDOM.renderToString(<Layout {...defaultState}/>);

    res.send(renderFullPage(appMarkup, defaultState));

    //res.sendFile(path.join(__dirname+'/public/index.html'));
}

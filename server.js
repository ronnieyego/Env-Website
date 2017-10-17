// To start testing:
//  1.  Start MongoDb.  Find mongo at ~/mongo/bin.  Command:  ./mongod -dbpath ~/mongo-data
//  2.  Start Node server.  run this file!

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from "path";
import moment from 'moment-timezone';
import _ from 'lodash';

import { footprintMiddleware, solarMiddleware, stateEnergyMiddleware, usEnergyMapMiddleware }  from './ssr-middleware';
import validStateId from './src/js/utils/check-if-valid-state-id';
import getStateData from './src/js/utils/apis/get-state-data';

import { mongoose } from './db/mongoose';
import { FormAnswers } from './db/models/form-answers';

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/data', express.static(__dirname + '/public/data'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log(err);
        }
    });

    next(); //Next is needed in order to get past the middleware
});

app.get('/', footprintMiddleware); 

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/homepage.html'));
});
app.get('/home/:test', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/homepage.html'));
});

app.get('/solar', solarMiddleware);  //Broken since there's no state param
app.get('/solar/:state', solarMiddleware);

app.get('/energy/:state', stateEnergyMiddleware);

app.get('/energy', usEnergyMapMiddleware);

app.get('/footprint', footprintMiddleware);

app.get('/test', (req, res) => {
    res.send('Reach the test page');
});

// APIs

app.post('/api/footprint-form/answer', (req, res) => {
    console.log('request is', req.body);

    // This get current time should be a util
    const d = new Date();
    const myTimezone = "America/Los_Angeles";
    const myDatetimeFormat= "YYYY-MM-DD hh:mm:ss";
    const myDatetimeString = moment(d).tz(myTimezone).format(myDatetimeFormat);

    const Answer = new FormAnswers({
        formName: req.body.formName,
        formAnswers: req.body.formAnswers,
        results: req.body.results,
        dateSubmitted: myDatetimeString
    });

    Answer.save().then(doc => {
        res.send(doc)
    }, error => {
        res.status(400).send(error);
    });
});

app.get('/api/footprint-form/answers', (req,res) => {
    FormAnswers.find().then(answers => {
        res.send({answers});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/get-energy-intensity-by-state/:state', (req, res) => {
    console.log('started to fetch data');
    let state = (req.params.state).toUpperCase();
    if(validStateId(state)) {
        return getStateData(state)
        .then(stateData => {
            if (!stateData) {
                throw Error `Could not find state data for ${state}.`;
            }
            res.status(200).send(stateData);
        })
        .catch(e => {
            console.log(`Could not find averageCo2/Kwh for ${state}. -- ${e}`);
            res.status(500).send(100000);
        })
    } else {
        console.log('inproper query param');
        res.status(400).send(100000);
    }
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

module.exports = {app}

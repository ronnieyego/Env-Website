// To start testing (Mac)
//  1.  Start MongoDb.  Find mongo at ~/mongo/bin.  Command:  ./mongod -dbpath ~/mongo-data
//  2.  Start Node server.  run this file!

// To start testing (Windows 10)
// 1. Start MongoDB. Command: "\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
// 2. Start Node server, run this file!

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from "path";
import moment from 'moment-timezone';
import _ from 'lodash';

import { costPagesMiddleware, co2eMiddleware, footprintMiddleware, footprintByIdMiddleware, solarMiddleware, stateEnergyMiddleware, staticPagesMiddleware, usEnergyMapMiddleware }  from './ssr-middleware';
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


app.get('/costs/books', costPagesMiddleware);
app.get('/costs/bbq', costPagesMiddleware);
app.get('/costs/car', costPagesMiddleware);
app.get('/costs/clothes', costPagesMiddleware);
app.get('/costs/cup', costPagesMiddleware);

app.get('/solar/:state', solarMiddleware);
app.get('/solar', solarMiddleware);

app.get('/energy/:state', stateEnergyMiddleware);
app.get('/energy', usEnergyMapMiddleware);

app.get('/footprint', footprintMiddleware);
app.get('/footprint/:id', footprintByIdMiddleware);
app.get('/footprint/form/:id', footprintByIdMiddleware);

app.get('/co2e', staticPagesMiddleware)
app.get('/data', staticPagesMiddleware)
app.get('/how-your-footprint-was-calculated', staticPagesMiddleware);
app.get('/about', staticPagesMiddleware);

app.get('/test', (req, res) => {
    res.send('Reach the test page');
});

// APIs

app.post('/api/footprint-form/answer', (req, res) => {
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
    FormAnswers.find()
        .sort({dateSubmitted: -1})
        .limit(10)
        .then(answers => {
        res.send({answers});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/footprint-form/get-answer-by-id/:id', (req,res) => {
    const id = req.params.id
    FormAnswers.find({_id: id}).then(answer => {
        res.send({answer});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/footprint-form/summary', (req,res) => {
    const getAverage = (answers, path) => {
        let count = 0;
        let total = answers.reduce((total, answer) => {
            let value =  _.get(answer, path, 0);
            if(value > 0) {
                count++;
            }
            return total + value;
        }, 0);
        return { count, total};
    }

    const results = {};
    FormAnswers.find().then(answers => {
        const totalAnswers = answers.length;
        results.totalSubmissions = totalAnswers;

        let co2Res = getAverage(answers, 'results.co2.totalCo2');
        results.totalCo2Answers = co2Res.count;
        results.averageCo2 = Math.round(co2Res.total/co2Res.count);

        let energyRes = getAverage(answers, 'results.energy.totalEnergy');
        results.totalEnergyAnswers = energyRes.count;
        results.averageEnergy = Math.round(energyRes.total/energyRes.count);

        let waterRes = getAverage(answers, 'results.water.totalWater');
        results.totalWaterAnswers = waterRes.count;
        results.averageWater = Math.round(waterRes.total/waterRes.count);


        res.send({results});
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

app.get('/api/delete-form-result-by-id/:id', (req, res) => {
    const id = req.params.id;
    FormAnswers.findByIdAndRemove(id)
    .then((delResponse) => {
        if(!delResponse) {
            return res.status(404).send('Couldn\'t find answer');
        } else {
            return res.status(200).send(delResponse);
        }
    })
    .catch(e => res.status(500).send('Failed to delete answer', e));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

module.exports = {app}

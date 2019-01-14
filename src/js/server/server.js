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
import get from 'lodash/get';
import Q from 'q';
import { mongoose } from '../../../db/mongoose'; // Needed to set the connection.

import loadSolarPage from '../actions/load-actions/load-solar-page';
import loadUsEnergyPage from '../actions/load-actions/load-us-energy-page';
import loadLocalEnergyPage from '../actions/load-actions/load-local-energy-page';
import loadStateEnergyPage from '../actions/load-actions/load-state-energy-page';
import loadFootprintFormPage from '../actions/load-actions/load-footprint-form-page';
import loadFootprintResultsPage from '../actions/load-actions/load-footprint-results-page';
import loadCostsPage from '../actions/load-actions/load-costs-page';
import loadStaticPage from '../actions/load-actions/load-static-page';
import loadTestPage from '../actions/load-actions/load-test-page';

import { FormAnswers } from '../../../db/models/form-answers';

import getNearestZipCodeData from './endpoints/get-nearest-postal-code-data';
import getEnergySources from './endpoints/get-nearest-energy-sources-by-zip';
import calculateFootprint from './endpoints/calculate-footprint';

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

// Have to use path.join since __dirname is weird
app.use('/public', express.static(path.join(__dirname, '../../..', 'public')));
app.use('/data', express.static(path.join(__dirname, '../../..', 'public/data')));

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


app.get('/', loadFootprintFormPage);

app.get('/solar/:state', loadSolarPage);
app.get('/solar', loadSolarPage);

app.get('/energy/:state', loadStateEnergyPage);
app.get('/energy', loadUsEnergyPage);
app.get('/local-energy', loadLocalEnergyPage);

app.get('/footprint', loadFootprintFormPage);
app.get('/footprint/:id', loadFootprintResultsPage);
app.get('/footprint/form/:id', loadFootprintResultsPage);

app.get('/static/:page', loadStaticPage);

app.get(`/costs`, loadStaticPage); 
app.get(`/costs/:page`, loadCostsPage); 

app.get(`/test`, loadTestPage); 
app.get(`/brownbag`, loadTestPage); 


// APIs
app.post('/api/calculate-footprint', (req, res) => {
    const payload = req.body;
    return Q.fcall( async() => {
        const results = await calculateFootprint(payload);
        if(results.error) {
            return res.status(400).send(results)
        }
        return res.status(400).send(results.body);
    })
    .catch(e => res.status(500).send(e))
});

app.post('/api/footprint-form/submit-form', async (req, res) => {

    console.log('I HAVE RECEIVED THE REQUEST!!');
    console.log('I HAVE RECEIVED THE REQUEST!!');
    console.log('I HAVE RECEIVED THE REQUEST!!');
    console.log('I HAVE RECEIVED THE REQUEST!!');
    const { questions, answers } = req.body;
    const results = await calculateFootprint(answers);
    console.log('I HAVE RESULTS!!');
    console.log('I HAVE RESULTS!!');
    console.log('I HAVE RESULTS!!');
    console.log('I HAVE RESULTS!!');
    // return res.status(400).send({error: true, message: 'lolololol'})
    if(results.error) {
        return res.status(400).send(results)
    }
    // This get current time should be a util
    const d = new Date();
    const myTimezone = "America/Los_Angeles";
    const myDatetimeFormat= "YYYY-MM-DD hh:mm:ss";
    const myDatetimeString = moment(d).tz(myTimezone).format(myDatetimeFormat);

    const Answer = new FormAnswers({
        formName: 'footprint-finder-v3',
        formAnswers: answers,
        questions,
        results: results.body,
        userState: answers.state,
        dateSubmitted: myDatetimeString
    });

    console.log('ABOUT TO RETURN!!');
    console.log('ABOUT TO RETURN!!');
    console.log('ABOUT TO RETURN!!');
    console.log('ABOUT TO RETURN!!');
    return Answer.save()
    .then(doc => {
        res.send(doc)
    }, error => {
        res.status(400).send(error);
    });
});

app.get('/api/footprint-form/answers', (req, res) => {
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
            let value =  get(answer, path, 0);
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

app.get('/api/get-nearest-zip-code-temperature-data/:zip', (req,res) => {
    console.log('Getting ZIP CODE');
    const zip = req.params.zip;
    return Q.fcall(() => {
        if((parseInt(zip) < 10000 || parseInt(zip) > 100000) && zip != '00000') {  // 00000 is fake for average US
            res.status(200).send({
                error: true,
                message: 'Bad zip code format.  Please only use the 5 digit zip code format'}
            );
        }
        const zipData = getNearestZipCodeData(zip);
        if(zipData === -1) { // Nearest zip data will return -1 if it fails.
            res.status(200).send({
                error: true,
                message: `Could not find zip code: ${zip}.  Please try a different zip code.`
            });
        }
        res.status(200).send(zipData);
    })
    .catch(e => {
        res.status(500).send(e);
    })
});

app.post('/api/get-energy-sources-by-zip', (req,res) => {
    const { inputZip, allStations, maxDistance } = req.body;
    return Q.fcall(() => {
        if(parseInt(inputZip) < 10000 || parseInt(inputZip) > 100000) {
            res.status(200).send({
                error: true,
                message: 'Bad zip code format.  Please only use the 5 digit zip code format'}
            );
        }
        const energySources = getEnergySources({ inputZip, allStations, maxDistance });
        if(energySources === -1) { // Nearest zip data will return -1 if it fails.
            res.status(200).send({
                error: true,
                message: `Could not find zip code: ${inputZip}.  Please try a different zip code.`
            });
        }
        res.status(200).send(energySources);
    })
    .catch(e => {
        res.status(500).send(e);
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

module.exports = {app}

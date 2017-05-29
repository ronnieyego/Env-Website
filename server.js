// To start testing:
//  1.  Start MongoDb.  Find mongo at ~/mongo/bin.  Command:  ./mongod -dbpath ~/mongo-data
//  2.  Start Node server.  run this file!

import express from 'express';
import bodyParser  from 'body-parser';
import fs  from 'fs';
import path  from "path";

import ssrMiddleware  from './ssr-middleware';

const {ObjectID} = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Zips } = require('./db/models/zips');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

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

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/homepage.html'));
});
app.get('/home/:test', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/homepage.html'));
});

// TODO.  THis is broken.  Passing through params is weird.
app.get('/solar/:state', ssrMiddleware);

app.get('/solar', ssrMiddleware);



app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

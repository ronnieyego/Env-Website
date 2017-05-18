// To start testing:
//  1.  Start MongoDb.  Find mongo at ~/mongo/bin.  Command:  ./mongod -dbpath ~/mongo-data
//  2.  Start Node server.  run this file!

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require("path");
/*
Turned off for now.  All set up to turn back on when needed.
const {ObjectID} = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Zips } = require('./db/models/zips');
*/

var app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));

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

app.get('/solar', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
    /*
    res.render('./test.html', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page!'
    })
    */
});
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
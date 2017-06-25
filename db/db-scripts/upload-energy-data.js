const {MongoClient, ObjectId} = require('mongodb');
const energyData = require('./data/formatted/energy/all-power-entities.js');

const heroku = 'mongodb://heroku_0fqtdb7x:sgvsobiubth5nmf1oujn6lr5jg@ds157571.mlab.com:57571/heroku_0fqtdb7x';
const local = 'mongodb://localhost:27017/EnvWebsite'
const env = local;

let data = {allPowerStations: energyData};

MongoClient.connect(env, (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongodb server');
    }
    console.log('Connected to Mongodb server');
    db.collection('energy').remove( { } )
    db.collection('energy').insertOne(data, (err, result) => {
        if (err)
            return console.log('Failed to record to states', err);
        console.log(result.ops[0]);
    });
	db.close();
});

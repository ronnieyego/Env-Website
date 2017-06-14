const {MongoClient, ObjectId} = require('mongodb');
const stateData = require('./data/formatted/all-states-all-data.js');

const heroku = 'mongodb://heroku_0fqtdb7x:sgvsobiubth5nmf1oujn6lr5jg@ds157571.mlab.com:57571/heroku_0fqtdb7x';
const local = 'mongodb://localhost:27017/EnvWebsite'
const env = local;

MongoClient.connect(env, (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongodb server');
    }
    console.log('Connected to Mongodb server');
    db.collection('states').remove( { } )
    for(let i = 0; i< stateData.length; i++) {
    	db.collection('states').insertOne(stateData[i], (err, result) => {
		  if (err)
		      return console.log('Failed to record to states', err);
		   console.log(result.ops[0]);
		});
    }
	db.close();
});


const {MongoClient, ObjectId} = require('mongodb');
const stateData = require('./data/state-data.js');

const env = 'mongodb://localhost:27017/EnvWebsite';


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


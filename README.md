# Env-Website
The goal of Footprint-finder is to empower people to understand their footprint and give them the tools to reduce it.

Right now I'm trying to catalogue the CO2 footprint of things and from there figure out the best ways to reduce one's footprint.

# How to contribute
You will need the following:
 1.  Node (I'm using version 6.9)
 2.  Npm
 3.  Webpack (install with npm install -g webpack)
 4.  MongoDb
 5.  RoboMongo (GUI for MongoDb)

Follow the MongoDb documentaion to get MongoDb running locally.
  -Start MongoDb.  Find mongo at ~/mongo/bin.  Command:  ./mongod -dbpath ~/mongo-data
Use RoboMongo to access mongo on your localhose.  Create a database called EnvWebsite.

Once you have that and MonogDb is running, run 'npm install' to get all of my dependencies.
Then run 'npm run compile' to build the js.  Also run export page='costs'.  I have webpack configured to look at enviornment variables.  Then do 'npm run webstart' to run the server.  After this point you will be able to go to the route at localhost:3000/. . . 


PM note:
Google analytics url:  https://analytics.google.com/analytics/web/#report/visitors-overview/a104075818w155429254p157100584/%3F_u.date00%3D20170820%26_u.date01%3D20170826/


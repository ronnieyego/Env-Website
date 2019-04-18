const Pool = require('pg').Pool;
const env = process.env.NODE_ENV !== "production" ? 'production' : 'dev';
let host;
let database;
switch(env) {
  case 'production':
    console.log("[LOG] - Configured to production environment.");
    database = 'footprint_finder';
    host = '35.233.175.245';
    break;
  case 'dev':
    console.log("[LOG] - Configured to dev environment.");
    database = 'footprint_finder';
    host = '35.233.175.245';
    break
  case 'local':
    console.log("[LOG] - Configured for localhost environment.");
    host = 'localhost';
    database = 'footprint_finder';
    break;
  default:
    console.log('[LOG] - Environment not specified. Configuring to dev environment.');
    host = '35.233.175.245';
    database = 'footprint_finder';
}

console.log(`[LOG] - Connecting to ${database}@${host}.`);

module.exports = new Pool({
  user: 'postgres',
  host,
  database,
  password: 'hLP0lLg5odfckf0h',
  port: 5432,
});

const mongoose = require('mongoose');

const local = 'mongodb://localhost:27017/EnvWebsite';
const prod = 'mongodb://heroku_0fqtdb7x:sgvsobiubth5nmf1oujn6lr5jg@ds157571.mlab.com:57571/heroku_0fqtdb7x'

mongoose.Promise = global.Promise;
mongoose.connect(local);

module.export = {
    mongoose
};
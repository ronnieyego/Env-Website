const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_0fqtdb7x:sgvsobiubth5nmf1oujn6lr5jg@ds157571.mlab.com:57571/heroku_0fqtdb7x');


module.export = {
    mongoose
};
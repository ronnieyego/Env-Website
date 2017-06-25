const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Energy = mongoose.model('energy', new Schema());

module.exports = { Energy };
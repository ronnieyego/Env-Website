const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var States = mongoose.model('states', new Schema({ 
	state: String, hoursOfSunPerYear: Number})
);

module.exports = {States};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FormAnswers = mongoose.model('form-answers', 
    new Schema({ 
        formName: String,
        formAnswers: Object,
        results: Object,
        userState: String,
        dateSubmitted: Date
    })
);

module.exports = { FormAnswers };
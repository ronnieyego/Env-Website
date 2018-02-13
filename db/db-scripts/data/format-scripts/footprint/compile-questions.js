const fs = require('fs');
const food = require('../../raw/personal-energy/food-energy');
const homeAppliances = require('../../raw/personal-energy/home-appliances');
const { transportationQuestions} = require('../../raw/personal-energy/transportation-questions');

const questions = [];
questions.push(...food);
questions.push(...homeAppliances);
questions.push(...transportationQuestions);

let stringQuestions = 'module.exports =' + JSON.stringify(questions, null, 2);
    fs.writeFile(__dirname + "/../../formatted/footprint/questions.js", stringQuestions, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("Footprint questions data written to formatted");
    });

let publicQuestions = '{"questions": ' + JSON.stringify(questions, null, 2) + '}';
fs.writeFile(__dirname + "/../../../../../public/data/temp-footprint-questions.json", publicQuestions, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("Footprint questions data written to /public");
    });
fs.writeFile(__dirname + "/../../../../../public/data/footprint-questions.js", 'module.exports = ' + JSON.stringify(questions, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    
    console.log("Footprint questions data written to as js json /public");
});
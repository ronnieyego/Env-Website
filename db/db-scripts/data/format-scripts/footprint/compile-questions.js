const fs = require('fs');
const food = require('../../raw/personal-energy/food-energy');
const homeAppliances = require('../../raw/personal-energy/home-appliances');
const { transportationQuestions} = require('../../raw/personal-energy/transportation-questions');

const questions = [];
questions.push(...food);
questions.push(...homeAppliances);
questions.push(...transportationQuestions);

let stringQuestions = 'module.exports =' + JSON.stringify(questions);
    fs.writeFile(__dirname + "/../../formatted/footprint/questions.js", stringQuestions, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("Footprint questions data written");
    });

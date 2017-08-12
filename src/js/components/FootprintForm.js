import React from "react";
import _ from 'lodash';

import calculateFootprintSubmit from '../utils/footprint/calculate-footprint-submit';

const appliance =[
  {
    "name": "portable-heater",
    "kwh": 1.5,
    "use-type": "hour"
  },
  {
    "name": "house-heat-pump",
    "kwh": 10,
    "use-type": "hour"
  },
  {
    "name": "electric-furnace",
    "kwh": 10.5,
    "use-type": "hour"
  },
  {
    "name": "wall-ac",
    "kwh": 0.73,
    "use-type": "hour"
  },
  {
    "name": "central-ac",
    "kwh": 3,
    "use-type": "hour"
  },
  {
    "name": "portable-fan",
    "kwh": 0.03,
    "use-type": "hour"
  },
  {
    "name": "cieling-fan",
    "kwh": 0.075,
    "use-type": "hour"
  },
  {
    "name": "water-heater",
    "kwh": 12.7,
    "use-type": "day"
  },
  {
    "name": "oven",
    "kwh": 2.3,
    "use-type": "hour"
  },
  {
    "name": "stove-top",
    "kwh": 1.25,
    "use-type": "hour"
  },
  {
    "name": "coffee-maker",
    "kwh": 0.12,
    "use-type": "hour"
  },
  {
    "name": "dishwasher",
    "kwh": 1,
    "use-type": "hour"
  },
  {
    "name": "toaster-oven",
    "kwh": 0.75,
    "use-type": "hour"
  },
  {
    "name": "energy-efficient-refridgerator",
    "kwh": 37.5,
    "use-type": "month"
  },
  {
    "name": "refridgerator",
    "kwh": 125,
    "use-type": "month"
  },
  {
    "name": "freezer",
    "kwh": 90,
    "use-type": "month"
  },
  {
    "name": "tv-plasma",
    "kwh": 0.48,
    "use-type": "hour"
  },
  {
    "name": "tv-lcd",
    "kwh": 0.016,
    "use-type": "hour"
  },
  {
    "name": "tivo",
    "kwh": 28.8,
    "use-type": "month"
  },
  {
    "name": "game-console",
    "kwh": 0.15,
    "use-type": "hour"
  },
  {
    "name": "computer-desktop",
    "kwh": 0.15,
    "use-type": "hour"
  },
  {
    "name": "computer-sleep-mode",
    "kwh": 0.003,
    "use-type": "hour"
  },
  {
    "name": "computer-laptop",
    "kwh": 0.04,
    "use-type": "hour"
  },
  {
    "name": "computer-monitor",
    "kwh": 0.08,
    "use-type": "hour"
  },
  {
    "name": "speakers",
    "kwh": 0.05,
    "use-type": "hour"
  },
  {
    "name": "lightbulb",
    "kwh": 0.1,
    "use-type": "hour"
  },
  {
    "name": "lightbulb-cfl",
    "kwh": 0.01,
    "use-type": "hour"
  },
  {
    "name": "clothes-dryer",
    "kwh": 3,
    "use-type": "hour"
  },
  {
    "name": "clothes-washer-cold",
    "kwh": 2.3,
    "use-type": "hour"
  },
  {
    "name": "clothes-washer-hot",
    "kwh": 6.3,
    "use-type": "hour"
  },
  {
    "name": "hair-dryer",
    "kwh": 1.5,
    "use-type": "hour"
  },
  {
    "name": "pool-water-pump",
    "kwh": 1.12,
    "use-type": "hour"
  },
  {
    "name": "pool-heater",
    "kwh": 5.5,
    "use-type": "hour"
  }
];

const formatQuestionName = name => {
    name = name.replace(/-/g,' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
}

export default class FootprintForm extends React.Component {
	constructor() {
		super();
        let applianceHour = _.filter(appliance, function(o) { return o['use-type'] === 'hour'; });
        applianceHour = applianceHour.map(question => {
            return (<li>{formatQuestionName(question.name)}<input id={question.name} type="text" style={{marginLeft: '50px', width: '50px'}} onChange={this.questionOnSubmit.bind(this)} /></li>);
        });
        let applianceMonth = _.filter(appliance, function(o) { return o['use-type'] === 'month'; });
        applianceMonth = applianceMonth.map(question => {
            return (<li>{formatQuestionName(question.name)}<input type="checkbox" id={question.name} name={question.name} onChange={this.boolQuestionOnSubmit.bind(this)} /></li>);
        });


        let data = {
            appliance: {
                hour: [],
                month: [],
                own: []
            }
        }
        this.state = {
            applianceHour,
            applianceMonth,
            data

        }
	}

    appendQuestionData(currentData, questionName, value) {
        let question = _.filter(appliance, function(o){ return o.name === questionName});
        question = question[0];
        question.value = value;
        let data = currentData.appliance[question['use-type']];
        // check to see if the question has already been added
        let questionIndex = -1;
        data.forEach((answeredQuestion, index) => {
            if( answeredQuestion.name === question.name) {
                questionIndex = index
            }
        })
        if(questionIndex === -1) {
            data.push(question);
        } else {
            data[questionIndex] = question;
        }
        this.setState({data: currentData});
    }

    questionOnSubmit(e) {
        let id = e.target.id;
		let value = document.getElementById(id).value;
        value = parseInt(value) >= 0 ? value : 0; // Only counts numbers
        let data = this.state.data;
        this.appendQuestionData(data, id, value);
    }

    boolQuestionOnSubmit(e) {
        let id = e.target.id;
	    let value = document.getElementById(id).checked;
        let data = this.state.data; 
        this.appendQuestionData(data, id, value);
    }

    submitCalculator() {
        let data = this.state.data;
        console.log('betcha wish I did something');
        let hourlySum = calculateFootprintSubmit(data);
        console.log('the hourlySum is', hourlySum);
    }

	render() {
        console.log('state data: ', this.state.data);
        const containerStyle = {
            border: '3px solid gray',
            margin: 'auto',
            backgroundColor: 'lightgrey',
            width: '500px'
        };
        const headerStyle = {
            fontWeight: 'bold',
            border: '3px solid gray',
            textAlign: 'center',
            backgroundColor: 'white'
        };
        const subCategory = {
            fontWeight: 'bold',
            textAlign: 'center'
        };
        const questionsStyle = {
            textAlign: 'left',
            marginLeft: '15px',
            marginTop: '5px',
            marginBottom: '5px'
        };
		return (
			<div style={containerStyle}>
				<h2 style={headerStyle}> Calculate your environmental footprint</h2>
                <h3 style={subCategory}>Daily use Appliances</h3>
                <div style={questionsStyle}>
                    <ul>How many hours a day do you use the following?
                        {this.state.applianceHour}
                    </ul>
                    <ul>Do you own the following?
                        {this.state.applianceMonth}
                    </ul>
                </div>
                <h3 style={subCategory}>Monthly use Appliances</h3>
                <div style={questionsStyle}>
                    <ul>How many times a month do you use the following?
                        
                    </ul>
                </div>
                <button type="button" className="btn" onClick={this.submitCalculator.bind(this)}>Calculate My Footprint</button>
			</div>
		);
	}
}
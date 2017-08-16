import React from "react";
import _ from 'lodash';


import ApplianceForm from './ApplianceForm';
import BooleanForm from './BooleanForm';
import calculateFootprintSubmit from '../../utils/footprint/calculate-footprint-submit';

const appliance = [
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

export default class FootprintForm extends React.Component {
	constructor() {
		super();
    this.getQuestionValue = this.getQuestionValue.bind(this)
    this.updateData = this.updateData.bind(this)
    
    let data = {
        applianceHour: {},
        boolean: {}
    };
    this.state = {
        data
    };
    let applianceHour = _.filter(appliance, function(o) { return o['use-type'] === 'hour'; });
    let booleanQuestions = _.filter(appliance, function(o) { return o['use-type'] === 'month'; });
    let step = 1;
    
    this.state = {
        applianceHour,
        booleanQuestions,
        data,
        step
    }
    console.log('Footprint Form rendered.  State is: ', this.state);

	}

    getQuestionFromName(name) {
      let question = _.filter(appliance, function(o) { return o.name === name; });
      return question[0];
    }

    getQuestionValue(question, questionGroup) {
		  let group = this.state.data[questionGroup]
      if(group && group[question.name]) {
            return question.value;
      }
      return '';
    }

    updateData(questionGroup, questionName, value) {
      let data = this.state.data;
      let dataGroup = data[questionGroup];
      let question = dataGroup[questionName];
      if (question) {
        question.value = value;
      } else {
        question = this.getQuestionFromName(questionName)
        dataGroup[questionName] = question;
        dataGroup[questionName].value = value;
      }
      this.setState({data});
    }

    submitCalculator() {
        let footprintResults = calculateFootprintSubmit(this.state.data);
        console.log('Footprint results are back.  Values in kwh/period', footprintResults);
    }

    increaseStep() {
      let newStep = this.state.step + 1;
      this.setState({step: newStep});
    }

    decreaseStep() {
      let newStep = this.state.step - 1;
      this.setState({step: newStep});
    }

	render() {
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

        const buttonStyle = {
          display: 'flex',
          justifyContent: 'space-between'
        };
        let form;
        let leftButton = this.state.step === 1 ? <div /> : (<button type="button" className="left-btn" onClick={this.decreaseStep.bind(this)}>Back</button>);
        let rightButton = this.state.step === 2 ? (<button type="button" className="right-btn" onClick={this.submitCalculator.bind(this)}>Calculate My Footprint</button>) : (<button type="button" className="right-btn" onClick={this.increaseStep.bind(this)}>Next</button>);
        switch(this.state.step) {
          case 1: 
            form = (<ApplianceForm questions={this.state.applianceHour} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
            break;
          case 2:
            form = (<BooleanForm questions={this.state.booleanQuestions} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
            break;
          default:
            form = (<ApplianceForm questions={this.state.applianceHour} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
        };

		return (
			<div style={containerStyle}>
				<h2 style={headerStyle}> Calculate your environmental footprint</h2>
          {form}
          <div style={buttonStyle}>
            {leftButton}
            {rightButton}
          </div>
			</div>
		);
	}
}
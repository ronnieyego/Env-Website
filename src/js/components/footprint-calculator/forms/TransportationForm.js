import React from "react";
import Question from './Question';
import BooleanQuestion from './BooleanQuestion';
import DropDownQuestion from './DropDownQuestion';

export default class TransportationForm extends React.Component {

    constructor(props) {
	    super();
	}

	render() {
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
        const textWidth = '350px';
        let electricVehicle = false;
        const questions = this.props.questions.map(question => {
            let value = question.value;
            if(question.name === 'What\'s the fuel for your car?' && value === 'Electric'){
                electricVehicle = true;
            } else if (question.name === 'What\'s the fuel for your car?' && value !== 'Electric') {
                electricVehicle = false;
            }
            if(question.name === 'What\'s the MPG of your car?' && electricVehicle) {
                return; // Don't show question.
            }
            if(question.useBool) {
                const checked = value === 'on' ? true : false;
                return (<BooleanQuestion key={question.name} id={question.name} question={question} checked={checked} textWidth={textWidth} dispatch={this.props.dispatch}  />)
            } else if (question.selectOptions) {
                return (<DropDownQuestion name={question.name} key={question.name} id={question.name} selectOptions={question.selectOptions} question={question} value={value} dispatch={this.props.dispatch} />)
            }
            return (<Question errorText={question.errorText || ''} key={question.name} id={question.name} question={question} value={value} textWidth={textWidth} subText={question.subtext} dispatch={this.props.dispatch} />);
        });
		return (
            <div>
            <h3 style={subCategory}>Transportation</h3>
                <div style={questionsStyle}>
                    What are your travel habits
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};


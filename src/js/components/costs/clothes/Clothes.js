import React from "react";
import PropTypes from 'prop-types';

import { Divider, MenuItem, RaisedButton, SelectField } from 'material-ui';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../HowMuchCo2';
import CompareBarChart from '../../CompareBarChart';

export default class Clothes extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        co2: PropTypes.object, //{ total, shirts, jackets, pants, shorts, socksUndies, accessories, shoes }
        averageAmerican: PropTypes.object,
        graphData: PropTypes.array,
        updateHabitDropdown: PropTypes.func,
        updateSizeDropdown: PropTypes.func,
        updateGenderDropdown: PropTypes.func,
        habit: PropTypes.number,
        size: PropTypes.number,
        gender: PropTypes.number
    }
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

	render() {

        const questions = this.props.questions.map(question => {
            if(question.type === 'int') {
                return (
                    <Question
                        errorText={question.errorText || ''}
                        key={question.name}
                        id={question.name}
                        question={question}
                        value={question.value}
                        aboveText={question.subtext}
                        dispatch={this.props.dispatch}
                        validator={question.validator}
                        floatingLabelText={question.floatingLabelText}
                        formType={question.formType}
                />
                )
            } else if(question.type === 'dropdown') {
                return (
                    <DropDownQuestion 
                        name={question.name}
                        key={question.name}
                        id={question.name}
                        selectOptions={question.selectOptions}
                        question={question}
                        subtext={question.subtext}
                        value={question.value}
                        dispatch={this.props.dispatch}
                        formType={question.formType}
                        marginLeft="0px"
                    />
                );
            }
            
        });

        const genderSelects = ['male', 'female'].map(gender => <MenuItem key={gender} primaryText={this.capitalize(gender)} value={gender} />);
        const sizeSelects = ['X Small', 'Small', 'Medium', 'Large', 'X Large'].map(size => <MenuItem key={size} primaryText={size} value={size} />);
        const habitSelects = ['normal', 'shopper'].map(habit => <MenuItem key={habit} primaryText={this.capitalize(habit)} value={habit} />);
        const selectsStyle = {
            width: '150px'
        }

        const yourResText = this.props.co2.totalCo2 ? 
            `You use have ${this.props.co2.totalCo2} articles of clothing which cost ${this.props.co2.totalCo2} pounds of CO2.` 
            :
            'Please fill out the questionaire below to see if your wardrobe is more environmentally friendly!'
        
        return (
            <div className="costs">
                <h3 id="costs-form-header" className="costs-form-header">What's the CO<sub>2</sub> of my clothes?</h3>
                <div>
                    <div className="costs-form-sub-text">
                        <span>
                            The average american {this.props.averageAmerican.gender} owns {this.props.averageAmerican.totalArticles} articles of clothing and this wardrobe emitted <HowMuchCo2 co2={this.props.averageAmerican.totalCo2} /> pounds of CO2.
                        </span>         
                        <p> 
                            {yourResText}
                        </p>
                    </div>

                    <CompareBarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"You vs and Average American"} defaultMax={75} />
                    <div className="average-american-buttons" id="compare-button-container">
                        <div>
                            <b className="average-american-buttons-text">Change gender</b>
                            <br />
                            <SelectField 
                                autoWidth={false}
                                id="average-american-clothes-gender"
                                menuItemStyle={{fontWeight: 'bold'}}
                                menuStyle={{textAlign: 'center'}}
                                onChange={this.props.updateGenderDropdown.bind(this)}
                                value={this.props.gender}
                                style={selectsStyle}
                            >
                                {genderSelects}
                            </SelectField>
                        </div>
                        <div>
                            <b className="average-american-buttons-text">Change size</b>
                            <br />
                            <SelectField 
                                autoWidth={false}
                                id="average-american-clothes-size"
                                menuItemStyle={{fontWeight: 'bold'}}
                                menuStyle={{textAlign: 'center'}}
                                onChange={this.props.updateSizeDropdown.bind(this)}
                                value={this.props.size}
                                style={selectsStyle}
                            >
                                {sizeSelects}
                            </SelectField>
                        </div>
                        <div>
                            <b className="average-american-buttons-text">Change shopping habit</b>
                            <br />
                            <SelectField 
                                autoWidth={false}
                                id="average-american-clothes-habit"
                                menuItemStyle={{fontWeight: 'bold'}}
                                menuStyle={{textAlign: 'center'}}
                                onChange={this.props.updateHabitDropdown.bind(this)}
                                value={this.props.habit}
                                style={selectsStyle}
                            >
                                {habitSelects}
                            </SelectField>
                        </div>
                    </div>
                    <Divider />
                    <br />
                    <b className="costs-form-large-bold-left">Discover the CO2 cost of your wardrobe.</b>
                    <br />
                    <ul>
                        {questions}
                    </ul>
                </div>
                <RaisedButton 
                    className="cost-form-button"
                    href="#costs-form-header"
                    label="Compare you footprint"
                    primary={true}
                />
                
                <div>
                    <br />
                    <p className="costs-form-sub-header">Methodology</p>
                    <br />
                </div> 
            </div>
		);
	}
}



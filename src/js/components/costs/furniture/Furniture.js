import React from "react";
import PropTypes from 'prop-types';
import { Divider, MenuItem, RaisedButton, SelectField } from 'material-ui';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../HowMuchCo2';

import BarChart from '../../CompareBarChart';


export default class Furniture extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number,
        aaHouseType: PropTypes.string,
        aaTotalCo2: PropTypes.number,
        aaTotalFurniture: PropTypes.number
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

        const houseTypeSelects = ['Small Apartment', '3 Bedroom House'].map(houseType => <MenuItem key={houseType} primaryText={houseType} value={houseType} />);

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of furniture?</h3>
                <div>
                    <div className="costs-form-sub-text">
                        <span>
                            The average american who lives in a {this.props.aaHouseType} has {this.props.aaTotalFurniture} pieces of furniture which released <HowMuchCo2 co2={this.props.aaTotalCo2} /> pounds of CO<sub>2</sub>.
                        </span>  
                    </div>
                    <div className="costs-form-sub-text">
                        {this.props.totalCo2 && <span>
                            Your furniture released <HowMuchCo2 co2={this.props.totalCo2} /> pounds of CO<sub>2</sub>.
                        </span> 
                        || <span>Please fill out the questionaire below to see if your more environmentally friendly! </span>}
                         
                    </div>
                    
                </div>
                <div>
                    <BarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"You vs an Average American"} defaultMax={300} compare={true} dataKey={'You'} />
                </div>
                <div className="average-american-buttons" id="compare-button-container">
                    <div style={{textAlign: 'center'}}>
                        <b className="average-american-buttons-text">Change House Type</b>
                        <br />
                        <SelectField 
                            autoWidth={false}
                            id="average-american-house-type"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
                            onChange={this.props.updateHouseTypeDropdown.bind(this)}
                            value={this.props.aaHouseType}
                        >
                            {houseTypeSelects}
                        </SelectField>
                    </div>
                </div>
                <br />
                <Divider />
                <br />
                <ul>
                    {questions}
                </ul>
                <br />
                <Divider />
                <br />
                <div>
                    <p className="costs-form-sub-header">Sources and Assumptions</p>
                    <p className="costs-form-bottom-paragraph">The average book here is about 1/2 inches thick and paperback.  This is a touch smaller than a paperback version of the first Harry Potter novel.  I most used <a href="https://gowageningen.files.wordpress.com/2014/04/co2-footprints-of-kindle-vs-ipad-vs-books.pdf" target="_blank">this study</a> to get the CO<sub>2</sub> per book.  Information about electronic readers came from environmental reports procuded by Dell, Apple, and Amazon.</p>
                    <p className="costs-form-bottom-paragraph">I am estimating that it takes about 6 hours to read a book all the way though. This is based on reading 300 words/minute.  This estimate is likely off, but since the energy cost of electronic readers is so small, I don't think it matters too much.</p>

                </div>
            </div>
		);
	}
}



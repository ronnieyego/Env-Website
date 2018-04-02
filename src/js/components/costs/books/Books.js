import React from "react";
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../HowMuchCo2';

import BarChart from '../../CompareBarChart';


export default class Books extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number
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

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of a book?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            These will emit <HowMuchCo2 co2={this.props.totalCo2} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    <ul>
                        {questions}
                    </ul>
                </div>
                <div>
                    <BarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"CO2 of reading methods"} defaultMax={1000} compare={false} dataKey={'Device'} />
                    <p className="costs-form-bottom-paragraph">The average book releases almost <b>6 pounds of CO<sub>2</sub></b>!  Surprising?  Its pretty energy intensive to create paper.  First you have to cut down the tree and transport it to the paper mill.  From there you have to mechanically turn that wood into pulp.  It takes a <i>lot</i> of energy to create the pulpy soup from which we can make paper.</p> 
                    <p className="costs-form-bottom-paragraph">After about 65 books, the E-reader and tablet become a more environmentally friendly option than buying paper books.  E-readers and other electronic mediums take a significant amount of energy and CO<sub>2</sub> to create, but have very very low ongoing energy costs (the energy from reading 300 hours on an E-reader equates to about 1 pound of CO<sub>2</sub>).  So if you love to read, consider getting a tablet or E-reader.</p>
                </div>
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



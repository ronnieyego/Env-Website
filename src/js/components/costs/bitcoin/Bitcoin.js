import React from "react";
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';

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
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of a bitcoin?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            A bitcoin releases <HowMuchCo2 co2={this.props.totalCo2} /> pounds of CO<sub>2</sub>.  This comes from energy generation to power a processor.  Bitcoin uses a technology called Blockchain which takes a very long time processing transactions.  There is a wide range of estimates for how much energy bitcoin processing takes.
                        </span>         
                    </div>
                    <ul>
                        {questions}
                    </ul>
                </div>
                <br />
                <Divider />
                <br />
                <div>
                    <p className="costs-form-sub-header">Why is there such a large range of estimates?</p>
                    <p className="costs-form-bottom-paragraph">This is a very hard thing to estimate for a few reasons.</p>  
                    <ul className="no-bullet-list">
                        <li>We don't know how many people are mining bitcoin and what type of processor they're using.</li>
                        <li>The algorithm to create a bitcoin takes more processing power as the number of bitcoins increase.</li>
                        <li>The number of bitcoin miners vary with the price of bitcoin and electricity.</li>
                    </ul>
                    <p className="costs-form-bottom-paragraph">Each study makes different assumptions about these 3 variables which lead to very different results.</p>
                </div>
                <Divider />
                <br />
                <div>
                    <p className="costs-form-sub-header">Sources</p>
                    <ul className="no-bullet-list">
                        <li><a href="https://digiconomist.net/bitcoin-energy-consumption" target="_blank">Digiconomist</a> which has the highest estimate.  This is the most environmentally conscious and includes higher environmental costs as well as computational costs.</li>
                        <li><a href="https://bitcoinmagazine.com/articles/op-ed-bitcoin-miners-consume-reasonable-amount-energy-and-its-all-worth-it/" target="_blank">Marc Bevand</a>, a well known figure in the community who provides the low estimate.  He is a bitcoin promoter and uses lower computational estimates.</li>
                        <li><a href="http://karlodwyer.com/publications/pdf/bitcoin_KJOD_2014.pdf" target="_blank">David Malone</a>, a researcher who also provides a lower estimate.  Originally he released a paper that ranged from the lowested estimate to 3x the highest and settled for a number close to the Digiconomist number.  He has since revised his estimate to be closer to Marc Bevand's estimate.</li>
                        <li>I simply averaged the highest and lowest estimate to get the middle.</li>
                    </ul>
                </div>
            </div>
		);
	}
}

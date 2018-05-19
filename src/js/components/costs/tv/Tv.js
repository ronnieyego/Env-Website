import React from "react";
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCO2 from '../../how-much-co2/HowMuchCo2';
import ids from '../../../utils/ids/index';
import UserStateDropdown from '../../UserStateDropdown';

export default class TV extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number.isRequired,
        yearlyUseCo2: PropTypes.number.isRequired,
        lifeUseCo2: PropTypes.number.isRequired,
        embodiedCo2: PropTypes.number.isRequired,
        transportCo2: PropTypes.number.isRequired,
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
            } else if(question.type === 'user-state') {
                return <UserStateDropdown />;
            }
            
        });

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of a TV?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            This TV will emit <HowMuchCO2 co2={this.props.totalCo2} exclude={[ids.bigScreenTV]} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    <p className="costs-form-explainer">Your TV will emit <b>{this.props.yearlyUseCo2.toLocaleString()}</b> pounds of CO<sub>2</sub> each year from useage (creating the electricity to power the TV).  <b>{this.props.embodiedCo2.toLocaleString()}</b> pounds of CO<sub>2</sub> come from manufacturing.  <b>{this.props.transportCo2.toLocaleString()}</b> pounds of CO<sub>2</sub> come from transporting the TV.</p>
                    {questions}
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Sources and Methodolgy</p>
                        <p className="costs-form-bottom-paragraph">I broke down the total CO<sub>2</sub> into 3 main pieces, how much CO<sub>2</sub> does it take to create the tv, to transport the tv, and to use the TV.  Obviously the size and type of TV matters.</p>
                        <p className="costs-form-bottom-paragraph">There's surprisingly little research on embodied CO<sub>2</sub> (the CO<sub>2</sub> emitted to create the tv) and transportation CO<sub>2</sub> for a TV.  I ended up extrapolating from monitors (tech manufacturers tend to have good documentation).  I took the average embodied CO<sub>2</sub> and transportation CO<sub>2</sub> per inch (diagonal) and extrapolated based on TV size.  This is roughly 9 pounds of CO<sub>2</sub> per inch to create the TV and 3 pounds of CO<sub>2</sub> to transport it.  These are reasonable estimates.  There are likely difference between tvs and monitors.  Additionally, each manufacturer will have variations.  That said, since most of the CO<sub>2</sub> cost of a TV comes from useage, I think these estimates are reasonable when considering the lifetime CO<sub>2</sub> of a TV.</p>
                        <p className="costs-form-bottom-paragraph">Use CO<sub>2</sub> is not too difficult to calculate.  First you need the wattage of the TV.  I compiled averages from <a href="http://www.energy.ca.gov/appliances/2009_tvregs/documents/2009-09-25_TV_Model_List.pdf" target="_blank">this list</a> and broke it down by TV type.  This data combined with how many hours the TV is on per day can yield how much energy the TV takes.  The <a href="https://www.eia.gov/electricity/data/eia860m/" target="_blank">EIA</a> has data on all power sources.  Through extensive work, I derived how much CO<sub>2</sub> each kWh produces by state.  With all of that data, its a simple calculation to multiply how much energy the TV uses by how much CO<sub>2</sub> utilities emit to produce that energy.</p>
                    </div>
                </div>
            </div>
		);
	}
}



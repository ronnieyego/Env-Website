import React from "react";
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';

import Question from '../../questions/QuestionHoc';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';

import BarChart from '../../bar-chart/BarChartHoc';
import FurnitureTable from './FurnitureTable';


export default class Furniture extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number,
        aaHouseType: PropTypes.string,
        aaTotalCo2: PropTypes.number,
        aaTotalFurniture: PropTypes.number
    }

	render() {

        const questions = this.props.questions.map(question => (
            <Question
                questionType={question.type}
                key={question.name}
                question={question}
                value={question.value}
            />
        ));

        const houseTypeSelects = ['Small Apartment', '3 Bedroom House'].map(houseType => <MenuItem key={houseType} primaryText={houseType} value={houseType} />);

		return (
            <div>
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of furniture?</h3>
                <div>
                    <div className="costs-form-sub-text">
                        <span>
                            The average american who lives in a {this.props.aaHouseType.toLowerCase()} has {this.props.aaTotalFurniture} pieces of furniture which released {this.props.aaTotalCo2.toLocaleString()} pounds of CO<sub>2</sub>.
                        </span>  
                    </div>
                    <div className="costs-form-sub-text">
                        {
                            this.props.totalCo2 && 
                            <span>
                                Your furniture released <HowMuchCo2 co2={this.props.totalCo2} /> pounds of CO<sub>2</sub>.
                            </span> 
                            || 
                            <span>Please fill out the questionaire below to see if you're more environmentally friendly!</span>
                        }
                    </div>
                    
                </div>
                <br />
                <div className="centered">
                    <BarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"You vs an Average American"} defaultMax={300} compare={true} dataKey={'You'} mobileHeaders={['Item', 'You (LB of CO2)', 'Average American (LB ofCO2)']} />
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
                {questions}
                <br />
                <Divider />
                <br />
                <FurnitureTable isMobile={this.props.isMobile} />
                <br />
                <Divider />
                <br />
                <div>
                    <p className="costs-form-sub-header">Sources and Assumptions</p>
                    <p className="costs-form-bottom-paragraph">Most of this data came from a British industry group called FIRA.  They did an internal study accross their manufacturers and give very detailed insight into the CO2 breakdown of each item.  I augmented this data with internal audits of other companies.  However, I found no American manufacturers that did a self audit.  I am assuming that furniture manufactured in the States will have a similar footprint to those made in Europe.</p>
                    <p className="costs-form-bottom-paragraph">There is a lot of variablity when it comes to furniture since each piece can come in all different shapes and sizes.  On this page, I made assumptions based on what I think you'd have in your house.  I.e. your table will be made of wood and not steel/particle board.</p>
                    <p className="costs-form-bottom-paragraph">While it differs per each piece of furniture, roughly 70% of the emissions comes from extracting and processing the raw material.  Around 20% comes from energy to power to the manufacturing process and about 10% comes from transportation.</p>
                </div>
            </div>
		);
	}
}



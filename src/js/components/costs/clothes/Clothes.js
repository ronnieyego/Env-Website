import React from "react";
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';

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
        const selectsStyle = { width: '150px' };

        const yourResText = this.props.co2.totalCo2 ? 
            `You have ${this.props.co2.totalArticles} articles of clothing which cost ${this.props.co2.totalCo2} pounds of CO2.` 
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

                    <div className="display-flex-around">
                        <CompareBarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"You vs and Average American"} defaultMax={75} compare={true} />
                    </div>
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
                    <p className="costs-form-sub-header">Conclusion</p>
                    <p className="costs-form-bottom-paragraph">Your wardrobe is not a huge contributor to global warming.  Rather than worrying about the impact of another shirt, worry about how far you're driving to get it.</p>
                    <br />
                    <p className="costs-form-sub-header">Methodology</p>
                    <p className="costs-form-bottom-paragraph">There's far less literature than I expected on the costs of clothes.  Most studies dive into the CO<sub>2</sub> cost of a shirt, and surprisingly have pretty consistent results. Unfortunately, almost every study ignores all other types of clothing.</p>
                    <p className="costs-form-bottom-paragraph">To get the CO<sub>2</sub> for everything else, I researched the CO<sub>2</sub> cost of cultivating each material (e.g. how much CO<sub>2</sub> does a pound of polyester emit?).  Results varied by a factor of 3 for some materials.  I adjusted values based on how they tied in with other studies (my main source <a href="http://msl.mit.edu/publications/SustainableApparelMaterials.pdf" target="_blank">here</a> has leather, rubber, and cotton.  I could tie cotton back to other cotton sources to get a sense if this study has higher or lower averages.  Some studies had different methodologies.  Levis did a great internal study on the CO<sub>2</sub> of their pants, but included washing in their estimate.  Ultimately I resolved the numbers based on what I could and feel that each material is with ~20 percent of the true value.</p>
                    <p className="costs-form-bottom-paragraph">Given how much CO<sub>2</sub> per pound of material, I needed to get how much each item weighs.  This was relatively simple though there are plenty of inaccuracies.  A ski jacket can weigh over 5x a sweater after all.  That said, I believe that they will average out to a reasonable estimate.</p>
                    <p className="costs-form-bottom-paragraph">I did not include transportation, disposal, and washing in this estimate.  Transportation emissions are usually pretty negligible for clothes.  Most textiles are made in southeast Asia and have to be shipped, however, you can fit a <i>LOT</i> of clothes in a shipping container.  Utlimately transport CO2 is around <a href="http://www.tshared.eu/blog-of-tsharedeu/carbon-footprint.html" target="_blank">100 grams</a>.  I did not include disposal because A) it is really tricky to quantify each possibility and B) I suspect every possibility to be pretty insignificant.  If you're curious about how much CO<sub>2</sub> you emit from washing your clothes, you can find that and more in the <a href="/">personalized footprint tool</a>.</p>
                    <br />

                </div> 
            </div>
		);
	}
}



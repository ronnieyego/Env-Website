import React from "react";
import PropTypes from 'prop-types';

import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';
import BarChart from '../../CompareBarChart';
import Divider from 'material-ui/Divider';
import { resolveArticle } from '../../../utils/article-fixer';

export default class Computer extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        computerType: PropTypes.string,
        brand: PropTypes.string,
        totalCo2: PropTypes.number,
        use: PropTypes.number,
        production: PropTypes.number,
        transportation: PropTypes.number,
        recycling: PropTypes.number,
        graphData: PropTypes.array,
        graphDefaultMax: PropTypes.number
    }

	render() {
        const questions = this.props.questions.map(question => (
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
            )
        );

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the lifetime CO<sub>2</sub> of a {this.props.computerType}?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            This computer will emit <HowMuchCo2 co2={this.props.totalCo2} /> pounds of CO<sub>2</sub> in its lifetime
                        </span>         
                    </div>
                    <ul>
                        {questions}
                    </ul>
                </div>
                <div className="centered">
                    <BarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={`Material Breakdown of ${resolveArticle(this.props.brand)} ${this.props.computerType.toLowerCase()}`} defaultMax={this.props.graphDefaultMax} dataKey={'Phase'} />
                </div>
                <div>
                    <br />
                    <p className="costs-form-sub-header">Key Findings</p>
                    <ul>
                        <li>Desktops emit about 3 times as much CO<sub>2</sub> as laptops and about 6 times as much CO<sub>2</sub> as tablets.</li>
                        <li>Each inch increase in screen size is about 100-200 extra pounds of CO<sub>2</sub>.  HD displays cost about 200 pounds of CO<sub>2</sub>.</li>
                        <li>Recycling a laptop can usually recover 75% of material and save ~8% of its total lifetime CO<sub>2</sub></li>
                    </ul>
                    <br />
                </div>
                <Divider />
                <div>
                    <br />
                    <p className="costs-form-sub-header">Rare Earth Metals</p>
                    <p className="costs-form-bottom-paragraph">As you probably know, electronic equipment uses certain elements called rare earth metals like neodymium, terbium and dysprosium.  These metals are considered to be very toxic to the environment and humans.  While not a problem inside of electronics, a lot of these elements end up in the trash and seep into the environment.</p>
                    <p className="costs-form-bottom-paragraph">Please dispose of your electronics at an E-waste site to help minimize seepage.</p>
                </div>
                <Divider />
                <div>
                    <br />
                    <p className="costs-form-sub-header">Methodology and Assumptions</p>
                    <p className="costs-form-bottom-paragraph">All of this data was self reported by each company.  I am assuming that the self reported data is accurate.  Even though each company has an interest in reporting the lowest CO<sub>2</sub>, most companies adhere to a set of accounting standards.  That said, they each had their own methods and differences to determine lifetime CO<sub>2</sub>.  I did a bit of work to try to resolve some of those differences.  For example, there is a pretty dramatic difference in use CO<sub>2</sub> between Apple and Microsoft.  This stems from 2 different assumptions.  Apple assumes a 4 year lifespan of its products while Microsoft assumes 3 years.  Secondly, each brand assumes a different amount of energy use CO<sub>2</sub>.  I resolved all use CO<sub>2</sub> by estimating based on the wattage of each device with some estimates about usage hours.  Ultimately, my estimation landed towards the middle of the data I collected and decided to use it instead of the self reported "use" CO<sub>2</sub></p>
                    <p className="costs-form-bottom-paragraph">Some companies have many different products (e.g. Macbook Pro and Macbook Air).  In this case, I simply took the average.  Different products were generally within 20% of eachother's total footprint.  Some companies (like Lenovo) documented over 100 reports for the same product (with minor tweaks).  I took a small sample of these reports and averaged them.  Again, they were very close in total CO<sub>2</sub>.</p>
                    <p className="costs-form-bottom-paragraph">In the case of Samsung, I could not find the data I was looking for (ISO 14040 and ISO 14044 environmental reports).  I did find data documenting the material weight of each part in their phones.  From there I derived "Production" CO<sub>2</sub>.  Its an estimate but landed close to where I expected so I think its reasonable for comparison purposes.</p>
                </div> 
                <Divider />
                <div>
                    <p className="costs-form-sub-header">Sources</p>
                        <ul className="costs-form-list">
                            <li><a href="https://www.apple.com/environment/reports/" target="_blank">Apple</a>: Apple does a fantastic job at catalogging the footprint of their products.</li>
                            <li><a href="https://www.microsoft.com/en-us/environment/product/design" target="_blank">Microsoft</a>:  Click on the link to download a PDF of a lot of Microsoft products.</li>
                            <li><a href="http://www.dell.com/learn/us/en/vn/corp-comm/environment_carbon_footprint_products" target="_blank">Dell</a>:  Dell likes to measure sustainability in terms of orange juice and VW Golfs!</li>
                            <li><a href="https://www3.lenovo.com/us/en/social_responsibility/datasheets_notebooks/" target="_blank">Lenovo</a>:  Lenovo has an environmental report for every version of the Thinkpad.  Click the PCF link rather than the ECO link.</li>
                            <li><a href="https://storage.googleapis.com/mannequin/sustainability/pdf%234/Pixel%202%20XL%20Product%20Environmental%20Report.pdf" target="_blank">Google</a>: Standard environmental report.</li>
                            <li><a href="http://images.samsung.com/is/content/samsung/p5/sg/aboutsamsung/2017/aboutsamsung-sg-life-cycle-assessment-en.pdf" target="_blank">Samsung</a>: Most relevant thing I could find.  Samsung has a lot more articles saying they're green than data to back it up.</li>
                            <li>Sony:  Sony: I could not find any information on Sony products.</li>
                            <li><a href="http://www.hp.com/hpinfo/globalcitizenship/media/files/hp_fy11_gcr_products_and_solutions.pdf" target="_blank">HP</a>:  I couldn't find individual product data from HP, but they do have good data on their environmental footprint.</li>
                        </ul>
                </div> 
            </div>
		);
	}
}



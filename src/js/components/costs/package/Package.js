import React from "react";
import {array, number, string } from 'prop-types';
import Divider from 'material-ui/Divider';

import Question from '../../questions/QuestionHoc';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';
import ids from '../../../utils/ids/index';
import { resolveArticle } from '../../../utils/article-fixer';
import BarChart from '../../bar-chart/BarChartHoc';

export default class House extends React.Component {

    static propTypes = {
        questions: array.isRequired,
        totalCo2: number.isRequired,
        userState: string.isRequired
    }

	render() {
        const questions = this.props.questions.map(question => (
                <Question
                    questionType={question.type}
                    key={question.name}
                    question={question}
                    value={question.value}
                />
            )
        );
        const exludeHowMuchIds = [];

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of ordering a package?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            Your package will emit <HowMuchCo2 co2={this.props.totalCo2} exclude={exludeHowMuchIds} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    {questions}
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Methodoloy</p>
                        <p className="costs-form-bottom-paragraph">Since most pets only generate CO<sub>2</sub> indirectly from the food they eat, most of the research went into what goes into pet food.  This turned into quite the adventure.  Pet food varies widley.  Some vegetarian animals like hamsters and iguanas eat a lot of vegetables and are easy.  Things get more complicated as animals become more carnivorous.  Meat has a significantly higher footprint than veggies.  This gets doubley complicated when the same pet can have different diets.</p>
                        <p className="costs-form-bottom-paragraph">Dogs are the most complicated pet because dog food ranges from ~20% meat to ~95% meat.  <a href="https://www.dogfoodadvisor.com/dog-food-reviews/dry/" target="_blank">This site</a> does a pretty good job breaking down meat content by brand.  I used this to get estimates of meat content by how "premium" the food is.  The next big question is "how much CO<sub>2</sub> is in meat?".  Many providers of pet food simply grind the unused parts of animals and take in any animal they can get.  Cows have ~5x the impact as pigs and chickens and its difficult to know the breakdown for each brand of dog food.  Ultimately I found data on how much poultry, swine, and beef the US produces and assumed all dog food has the same proportion.  This comes out to about 7.16 pounds of CO<sub>2</sub> per pound of meat mix.  Its about 1.23 pounds of CO<sub>2</sub> per pound of grain.  The CO<sub>2</sub> per any pound of dog food multiplies the ratio of meat/grain and the CO<sub>2</sub> per ound of each. Cats went through a very similar methodology as the above, with the caveat that their diet is almost 100% meat based.</p>  
                        <p className="costs-form-bottom-paragraph">There are a few buckets of CO<sub>2</sub> that I am ignoring either because I think its insignificant or I'm not sure how to get data.  The first is excrement.  I don't think this will have a significant impact on total CO<sub>2</sub>.  The second is surgeries.  Generally surgeries are very CO<sub>2</sub> intensive (there's a lot of infrastructure and operational costs that get distributed over very few surgeries).  Unfortunately, I'm not at a point where I can accurately estimate how much surgeries cost (my best innacurate guess is between 500-5,000 pounds of CO<sub>2</sub> for a pet surgery).</p>
                    </div>
                </div>
            </div>
		);
	}
}



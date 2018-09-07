import React from "react";
import { array, func, number, shape, string } from 'prop-types';
import Divider from 'material-ui/Divider';

import Question from '../../questions/QuestionHoc';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';
import ids from '../../../utils/ids/index';
import { resolveArticle } from '../../../utils/article-fixer';
import UserStateDropdown from '../../UserStateDropdown';

export default class House extends React.Component {

    static propTypes = {
        questions: array.isRequired,
        co2Breakdown: shape({
            total: number.isRequired,
            poop: number.isRequired,
            food: number.isRequired,
            electricty: number
        }).isRequired,
        petType: string.isRequired,
        userState: string.isRequired,
        updateUserState: func.isRequired,
    }

	render() {

        console.log(this.props);
        const questions = this.props.questions.map(question => {
            if(question.type === 'user-state') {
                return <UserStateDropdown />;
            } 
            return (
                <Question
                    questionType={question.type}
                    key={question.name}
                    question={question}
                    value={question.value}
                />
            );
        });
        const percentFood = Math.round(this.props.co2Breakdown.food / this.props.co2Breakdown.total * 100);
        const percentPoop = Math.round(this.props.co2Breakdown.poop / this.props.co2Breakdown.total * 100);
        const percentElectricity = this.props.co2Breakdown.electricity ? Math.round(this.props.co2Breakdown.electricity / this.props.co2Breakdown.total * 100) : 0;
        const poopText = (<p className="costs-form-explainer">Poop decomposes into gaseous methane and CO<sub>2</sub>.  One pound of execrement roughly turns into 0.2 pounds of methane and 0.4 pounds of CO<sub>2</sub>.  Methane is 20 times more effective as a warming agent than CO<sub>2</sub>.</p>);

        const exludeHowMuchIds = [ids.petDog, ids.petCat, ids.petTurtle, ids.petHamster, ids.petGecko, ids.petBigDog, ids.petSmallDog];
		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of {resolveArticle(this.props.petType.toLowerCase())}?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            Your {this.props.petType.toLowerCase()} will emit <HowMuchCo2 co2={this.props.co2Breakdown.total} exclude={exludeHowMuchIds} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    {this.props.petType === 'Turtle' && (
                        <div>
                            <p className="costs-form-explainer">Turtles can take a lot of CO<sub>2</sub> to raise.  There are 2 main factors: they have long lives and use a lot of electricity.  While the CO<sub>2</sub> for your turtle's food is pretty low ({percentFood}%), it adds up since they tend live to live for 40 years.  Additionally, your turtle's tank requires 24/7 water filtering and some level of heating ({percentElectricity}%).  The rest of its footprint comes from her excrement ({percentPoop}%).  This adds up over its lifespan.</p>
                            {poopText}
                        </div>
                    )}
                    {this.props.petType === 'Dog' && (
                        <div>
                            <p className="costs-form-explainer">Your dog's footprint comes from two major sources, its food ({percentFood}%) and poop ({percentPoop}%). Dog foods can widely vary.  High end dog foods tend to have a higher percentage of meat vs grain/filler up to 90%; lower end dog foods, around 25%.  The more protien, the higher CO<sub>2</sub> cost.  Pet food protein tends to be significantly lower quality than what people eat.  Many grinders take in the leftover parts of animals (bones, hide, sinew) to make protein.  Usually its a mix of all animals though some pet food brands will only use chickens or cows (this calculator assumes a mix).  This calculator extrapolates a dog's CO<sub>2</sub> by multiplying the carbon intensity of its food and how long dogs live on average (determined by its weight).</p>
                            {poopText}
                        </div>
                    )}
                    {this.props.petType === 'Cat' && (
                        <div>
                            <p className="costs-form-explainer">A cat's footprint comes from two major sources, its food ({percentFood}%) and poop ({percentPoop}%). Cats are carnivores.  A cat's diet should be at least 90% animal protein.  Most cats will eat 6 oz of food a day and live for about 15 years.</p>}
                            {poopText}
                        </div>
                    )} 
                    {this.props.petType === 'Hamster' && (
                        <div>
                            <p className="costs-form-explainer">Hamsters eat very little and have a plant based diet.  Combined with their relative short lifespan (3 years), hamsters are one of the most environmentally friendly pets out there.</p>
                        </div>
                    )}
                    {this.props.petType === 'Gecko' && (
                        <div>
                            <p className="costs-form-explainer">Geckos eat insects which are very environmentally friendly and since they're cold blooded, require less calories to sustain themselves.  Pretty much all of a gecko's footprint comes from its heating lamp.  On average a gecko will live about 8 years.</p>
                            {poopText}
                        </div>
                    )}
                    {questions}
                    
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Methodoloy</p>
                        <p className="costs-form-bottom-paragraph">Researching pet food turned into quite the adventure.  Pet food varies widley.  Some vegetarian animals like hamsters and iguanas eat a lot of vegetables and are easy.  Things get more complicated as animals become more carnivorous.  Meat has a significantly higher footprint than veggies.  This gets doubley complicated when the same pet can have different diets.</p>
                        <p className="costs-form-bottom-paragraph">Dogs are the most complicated pet because dog food ranges from ~20% meat to ~95% meat.  <a href="https://www.dogfoodadvisor.com/dog-food-reviews/dry/" target="_blank">This site</a> does a pretty good job breaking down meat content by brand.  I used this to get estimates of meat content by how "premium" the food is.  The next big question is "how much CO<sub>2</sub> is in meat?".  Many providers of pet food simply grind the unused parts of animals and take in any animal they can get.  Cows have ~5x the impact as pigs and chickens and its difficult to know the breakdown for each brand of dog food.  Ultimately I found data on how much poultry, swine, and beef the US produces and assumed all dog food has the same proportion.  This comes out to about 7.16 pounds of CO<sub>2</sub> per pound of meat mix.  Its about 1.23 pounds of CO<sub>2</sub> per pound of grain.  The CO<sub>2</sub> per any pound of dog food multiplies the ratio of meat/grain and the CO<sub>2</sub> per ound of each. Cats went through a very similar methodology as the above, with the caveat that their diet is almost 100% meat based.</p>  
                        <p className="costs-form-bottom-paragraph">Excrement also turned out to be interesting.  Many papers study how organic matter breaks down, but few do it for excrement.  I could only find papers that caluclated it for livestock.  However there was not too much of a spread so I felt safe using an average number and applying it to pets.  Secondly disposal makes a large impact.  Most of the warming comes from methane.  Yet, most landfills in America capture methane and convert it to energy.  I did not include these savings, but its another reason to clean up after your pet!</p>
                        <p className="costs-form-bottom-paragraph">There are a few buckets of CO<sub>2</sub> that I am ignoring either because I think its insignificant or I'm not sure how to get data.  Surgueries are the main one. Generally surgeries are very CO<sub>2</sub> intensive (there's a lot of infrastructure and operational costs that get distributed over very few surgeries).  Unfortunately, I'm not at a point where I can accurately estimate how much surgeries cost (my best innacurate guess is between 500-5,000 pounds of CO<sub>2</sub> for a pet surgery).</p>
                    </div>
                </div>
            </div>
		);
	}
}



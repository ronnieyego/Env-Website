import React from 'react';
import { object} from 'prop-types';
import BarChart from '../bar-chart/BarChartHoc';

import { DAYS_IN_MONTH } from '../../utils/utils-data/constants';

export default class PersonalBreakdown extends React.Component {

    static propTypes = {
        results: object.isRequired
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    makeMonthly(breakdown, key) {
        return breakdown.map(daily => {
            return { name: daily.name, [key]: (daily[key] * DAYS_IN_MONTH) };
        });
    }

    // TODO ADD STUFF
    getStuffBreakdown(res) {
        const { transportation, stuff } = res;
        return [
            {name: 'Clothes', Stuff: parseInt(stuff.clothes.monthlyCo2)},
            {name: 'Furniture', Stuff: parseInt(stuff.furniture.monthlyCo2)},
            {name: 'Stuff', Stuff: parseInt(stuff.stuff.monthlyCo2)},
            {name: 'Car', Stuff: parseInt(transportation.carMonthlyBuild)}
        ].sort((a,b) => b.Stuff > a.Stuff);
    }

    getHomeBreakdown(res) {
        const { homeActivities, cooling, heating, home } = res;
        const daily = [
            {name: 'Lighting', Activity: parseInt(homeActivities.background)},
            {name: 'Cleanliness', Activity: parseInt(homeActivities.cleanliness)},
            {name: 'Cooking', Activity: parseInt(homeActivities.cooking)},
            {name: 'Entertainment', Activity: parseInt(homeActivities.entertainment)}
        ];
        const monthly = this.makeMonthly(daily, 'Activity');

        // Heating, cooling, creaton come in monthly while home activities are daily
        monthly.push(
            {name: 'Creation', Activity: parseInt(home.monthlyCo2)},
            {name: 'Heating', Activity: parseInt(heating.monthlyCo2)},
            {name: 'Cooling', Activity: parseInt(cooling.monthlyCo2)}
        );
        return monthly.sort((a,b) => b.Activity > a.Activity);
    }

    getTransportBreakdown(res) {
        const { transportation } = res;
        return [
            {name: 'Bus', Method: parseInt(transportation.bus)},
            {name: 'Train', Method: parseInt(transportation.train)},
            {name: 'Plane', Method: parseInt(transportation.plane)},
            {name: 'Car', Method: parseInt(transportation.car)}
        ].sort((a,b) => b.Method > a.Method);
    }

    getFoodBreakdown(res) {
        const { co2 } = res.food;
        const daily = [
            {name: 'Cheese', Food: co2.cheese},
            {name: 'Chicken', Food: co2.chicken},
            {name: 'Dairy', Food: co2.dairy},
            {name: 'Fruit', Food: co2.fruit},
            {name: 'Grain', Food: co2.grain},
            {name: 'Junk Food', Food: co2.junkFood},
            {name: 'Pork', Food: co2.pork},
            {name: 'Seafood', Food: co2.seafood},
            {name: 'Vegetables', Food: co2.vegetables},
            {name: 'Beef', Food: co2.beef},
        ].sort((a,b) => b.Food > a.Food);
        return this.makeMonthly(daily, 'Food');
    }

    sumBreakdown(breakdown, sumKey) {
        const keys = Object.keys(breakdown);
        return keys.reduce((acc, key) => {
            return acc + breakdown[key][sumKey];
        }, 0);
    }

	render() {
        const res = this.props.results;

        const homeTotal = res.homeActivities.monthlyCo2 + res.heating.monthlyCo2 + res.cooling.monthlyCo2;
        const stuffTotal = res.stuff.monthlyCo2 + res.home.monthlyCo2;
        const foodTotal = parseInt(res.food.monthlyCo2);
        const transportationTotal = parseInt(res.transportation.totalCo2);
        
        // Top level summary
        const categoryBreakDownData = [
            {name: 'Home', Category: homeTotal},
            {name: 'Food', Category: foodTotal},
            {name: 'Transportation', Category: transportationTotal},
            {name: 'Stuff', Category: stuffTotal },
        ].sort((a,b) => b.Category > a.Category);

        // Transportation Summary
        const transportationBreakdown = this.getTransportBreakdown(res);
        const transportationSum = this.sumBreakdown(transportationBreakdown, 'Method');

        // Appliance Summary
        const homeBreakdown = this.getHomeBreakdown(res);
        const homeSum = this.sumBreakdown(homeBreakdown, 'Activity');

        // Food Summary
        const foodBreakdown = this.getFoodBreakdown(res);
        const foodSum = this.sumBreakdown(foodBreakdown, 'Food');

        // Stuff Summary
        const stuffBreakdown = this.getStuffBreakdown(res);
        const stuffSum = this.sumBreakdown(stuffBreakdown, 'Stuff');
        
		return (
            <div className="personal-breakdown">
                <div id="top-level-sumamry">
                    <p className="personal-breakdown-section-title">Overview</p>
                    <p className="personal-breakdown-section-text">Here's how your footprint breaks down at a high level.</p>
                    <BarChart
                        graphData={categoryBreakDownData}
                        units={'Pounds of CO2'}
                        key="categoryBreakDownData"
                        dataKey={'Category'}
                        mobileHeaders={['Category', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="home-summary">
                    <p className="personal-breakdown-section-title">Home Breakdown</p>
                    <p className="personal-breakdown-section-text">Your home's breakdown includes the CO<sub>2</sub> to build your home (converted to monthly emissions), heating/cooling, appliances, and other electricity use.</p>
                    <BarChart
                        graphData={homeBreakdown}
                        units={'Pounds of CO2'}
                        key="homeBreakdown"
                        dataKey={'Activity'}
                        mobileHeaders={['Home', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="stuff-summary">
                    <p className="personal-breakdown-section-title">Stuff Breakdown</p>
                    <p className="personal-breakdown-section-text">Your stuff is converted into monthly emissions by taking its lifetime CO<sub>2</sub> value and dividing it by the number of months it'll exist for.  E.g. A chair might take 120 pounds of CO<sub>2</sub> to make and be thrown away after 2 years.  It's monthly CO<sub>2</sub> emissions would be 5 pounds of CO<sub>2</sub> per month.</p>
                    <BarChart
                        graphData={stuffBreakdown}
                        units={'Pounds of CO2'}
                        key="stuffBreakdown"
                        dataKey={'Stuff'}
                        mobileHeaders={['Stuff', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="food-summary">
                    <p className="personal-breakdown-section-title">Food Breakdown</p>
                    <p className="personal-breakdown-section-text">Food can be carbon intensive and not all foods are created equal.</p>
                    <BarChart
                        graphData={foodBreakdown}
                        key="foodBreakdown"
                        units={'Pounds of CO2'}
                        dataKey={'Food'}
                        mobileHeaders={['Food', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="transportation-summary">
                    <p className="personal-breakdown-section-title">Transportation Breakdown</p>
                    <BarChart
                        graphData={transportationBreakdown}
                        key="transportationBreakdownBarChart"
                        units={'Pounds of CO2'}
                        dataKey={'Method'}
                        mobileHeaders={['Method', 'Pounds of CO2',]} 
                    />
                    <br />
                </div>
            </div>
		);
	}
};


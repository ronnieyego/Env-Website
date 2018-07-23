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

    makeMonthly(breakdown) {
        return breakdown.map(daily => {
            return { name: daily.name, Method: (daily.Method * DAYS_IN_MONTH) };
        });
    }

    // TODO ADD STUFF
    getStuffBreakdown(res) {
        const { home, transportation, stuff } = res;
        return [
            {name: 'Home', Method: parseInt(home.monthlyCo2)},
            {name: 'Clothes', Method: parseInt(stuff.clothes.monthlyCo2)},
            {name: 'Furniture', Method: parseInt(stuff.furniture.monthlyCo2)},
            {name: 'Stuff', Method: parseInt(stuff.stuff.monthlyCo2)},
            {name: 'Car', Method: parseInt(transportation.carMonthlyBuild)}
        ].sort((a,b) => b.Method > a.Method);
    }

    getHomeBreakdown(res) {
        const { homeActivities, cooling, heating } = res;
        const daily = [
            {name: 'Lighting', Method: parseInt(homeActivities.background)},
            {name: 'Cleanliness', Method: parseInt(homeActivities.cleanliness)},
            {name: 'Cooking', Method: parseInt(homeActivities.cooking)},
            {name: 'Entertainment', Method: parseInt(homeActivities.entertainment)}
        ].sort((a,b) => b.Method > a.Method);
        const monthly = this.makeMonthly(daily);

        // Heating and cooling come in monthly while home activities are daily
        monthly.push(
            {name: 'Heating', Method: parseInt(heating.monthlyCo2)},
            {name: 'Cooling', Method: parseInt(cooling.monthlyCo2)}
        );
        return monthly;
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
            {name: 'Cheese', Method: co2.cheese},
            {name: 'Chicken', Method: co2.chicken},
            {name: 'Dairy', Method: co2.dairy},
            {name: 'Fruit', Method: co2.fruit},
            {name: 'Grain', Method: co2.grain},
            {name: 'Junk Food', Method: co2.junkFood},
            {name: 'Pork', Method: co2.pork},
            {name: 'Seafood', Method: co2.seafood},
            {name: 'Vegetables', Method: co2.vegetables},
            {name: 'Beef', Method: co2.beef},
        ].sort((a,b) => b.Method > a.Method);
        return this.makeMonthly(daily);
    }

    sumBreakdown(breakdown) {
        const keys = Object.keys(breakdown);
        return keys.reduce((acc, key) => {
            return acc + breakdown[key].Method;
        }, 0);
    }

	render() {
        const containerStyle = {
            margin: 'auto',
            textAlign: 'center'
        };
        const res = this.props.results;
        const { monthlyCo2 } = res;

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
        const transportationSum = this.sumBreakdown(transportationBreakdown);

        // Appliance Summary
        const homeBreakdown = this.getHomeBreakdown(res);
        const homeSum = this.sumBreakdown(homeBreakdown);

        // Food Summary
        const foodBreakdown = this.getFoodBreakdown(res);
        const foodSum = this.sumBreakdown(foodBreakdown);

        // Stuff Summary
        const stuffBreakdown = this.getStuffBreakdown(res);
        const stuffSum = this.sumBreakdown(stuffBreakdown);
        
		return (
            <div style={containerStyle}>
                <div id="top-level-sumamry">
                    <BarChart
                        graphData={categoryBreakDownData}
                        units={'Pounds of CO2'}
                        title={`Monthly CO2 Breakdown`}
                        key="categoryBreakDownData"
                        subtitle={`${monthlyCo2.toLocaleString()} pounds used each Month`}
                        dataKey={'Category'}
                        mobileHeaders={['Category', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="home-summary">
                    <BarChart
                        graphData={homeBreakdown}
                        units={'Pounds of CO2'}
                        key="homeBreakdown"
                        title="Home Breakdown"
                        subtitle={`${homeSum.toLocaleString()} pounds used each Month`}
                        dataKey={'Method'}
                        mobileHeaders={['Home', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="stuff-summary">
                    <BarChart
                        graphData={stuffBreakdown}
                        units={'Pounds of CO2'}
                        key="stuffBreakdown"
                        title="Stuff Breakdown"
                        subtitle={`${stuffSum.toLocaleString()} pounds used each Month.  Values are lifetime CO2 over number of months each thing will last.`}
                        dataKey={'Method'}
                        mobileHeaders={['Stuff', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="food-summary">
                    <BarChart
                        graphData={foodBreakdown}
                        key="foodBreakdown"
                        units={'Pounds of CO2'}
                        title="Food Breakdown"
                        subtitle={`${foodSum.toLocaleString()} pounds used each Month`}
                        dataKey={'Method'}
                        mobileHeaders={['Food', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="transportation-summary">
                    <BarChart
                        graphData={transportationBreakdown}
                        key="transportationBreakdownBarChart"
                        units={'Pounds of CO2'}
                        title="Transportation Breakdown"
                        subtitle={`${transportationSum.toLocaleString()} pounds used each Month`}
                        dataKey={'Method'}
                        mobileHeaders={['Method', 'Pounds of CO2',]} 
                    />
                    <br />
                </div>
            </div>
		);
	}
};


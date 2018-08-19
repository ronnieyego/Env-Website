import React from "react";

import HowMuchCo2 from '../how-much-co2/HowMuchCo2';
import getCompanyCo2, { porch } from '../../data/porch-audit/porch-data';

import BarChart from '../bar-chart/BarChartHoc';

export default class CompanyAudit extends React.Component {

    formatData(data) {
        return Object.keys(data)
            .filter(key => key !== 'total' && key !== 'monthly')
            .map(key => {
                const val = data[key];
                return { name: key, Amount: val };
            });
    }

	render() {
        console.log('ABOUT TO RENDER PAGE');
        console.log('PORCH IS', porch);

        const res = getCompanyCo2(porch);
        console.log(res);
        const formattedFood = this.formatData(res.food);
        const formattedStuff = this.formatData(res.stuff);

        const monthlyHighLevel = [
            { name: 'Food', Amount: res.food.total },
            { name: 'Electricity', Amount: res.electricity },
            { name: 'Transportation', Amount: res.transport.total },
            { name: 'Building', Amount: res.building.monthly },
            { name: 'Stuff', Amount: res.stuff.monthly }
        ];

        const transportation = [
            { name: 'Drive', Amount: res.transport.driverCo2 },
            { name: 'Transit', Amount: res.transport.publicTransitCo2 },
        ]

        return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> of Porch??</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            Porch emits <HowMuchCo2 co2={res.monthlyTotal} /> pounds of CO<sub>2</sub> each month and {res.stuffTotal} in equiptment.
                        </span>         
                    </div>
                    <BarChart
                        graphData={monthlyHighLevel}
                        units={'Pounds of CO2'}
                        title={"CO2 breakdown of a Porch's Ongoing CO2"}
                        defaultMax={20}
                        compare={false}
                        dataKey={'Amount'}
                        mobileHeaders={['Category', 'Pounds of CO2']}
                    />

                    <BarChart
                        graphData={formattedStuff}
                        units={'Pounds of CO2'}
                        title={"CO2 breakdown of a Porch's Stuff"}
                        defaultMax={20}
                        compare={false}
                        dataKey={'Amount'}
                        mobileHeaders={['Item', 'Pounds of CO2']}
                    />

                    <BarChart
                        graphData={formattedFood}
                        units={'Pounds of CO2'}
                        title={"CO2 breakdown of a Porch's Food"}
                        defaultMax={20}
                        compare={false}
                        dataKey={'Amount'}
                        mobileHeaders={['Food', 'Pounds of CO2']}
                    />

                    <BarChart
                        graphData={transportation}
                        units={'Pounds of CO2'}
                        title={"CO2 breakdown of a Porch's Commuters"}
                        defaultMax={20}
                        compare={false}
                        dataKey={'Amount'}
                        mobileHeaders={['Commute Method', 'Pounds of CO2']}
                    />

                    
                </div>
            </div>
		);
	}
}



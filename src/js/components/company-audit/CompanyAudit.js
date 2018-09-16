import React from "react";
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import HowMuchCo2 from '../how-much-co2/HowMuchCo2';
import{ PORCH, moveToAtlanta, carpoolProgram, bothellOffice, westSeattle } from '../../data/company-audit/porch-data';
import{ SPECTRALUX } from '../../data/company-audit/spectralux';
import{ OMNIDIAN } from '../../data/company-audit/omnidian';

import BarChart from '../bar-chart/BarChartHoc';

// TODO:  If this ever becomes a thing, make a HOC and reducer for this.
export default class CompanyAudit extends React.Component {
    constructor() {
        super();
        this.state = {
            data: PORCH,
            dataKey: 'Current Porch'
        }
    }

    updateWhatIfDropdown(event, index, value) {
        let data;
        let selected;
        if( value === 'Moved to Canton') {
            data = moveToAtlanta;
            selected = 'Moved to Canton';
        } else if (value === 'Carpool Program') {
            data = carpoolProgram;
            selected = 'Carpool Program';
        } else if (value === 'West Seattle') {
            data = westSeattle;
            selected = 'West Seattle';
        } else if (value === 'Bothell Office') {
            data = bothellOffice;
            selected = 'Bothell Office';
        }  else if (value === 'Spectralux') {
            data = SPECTRALUX;
            selected = 'Spectralux';
        }  else if (value === 'Omnidian') {
            data = OMNIDIAN;
            selected = 'Omnidian';
        } else {
            data = PORCH;
            selected = 'Current Porch';
        }

        this.setState({ data, dataKey: selected });
    }

    formatData(data) {
        return Object.keys(data)
            .filter(key => key !== 'total' && key !== 'monthly')
            .map(key => {
                const val = data[key];
                return { name: key, Amount: val };
            });
    }

	render() {
        const res = this.state.data;
        const formattedFood = this.formatData(res.food);
        const formattedStuff = this.formatData(res.stuff);

        const monthlyHighLevel = [
            { name: 'Food', Amount: res.food.total },
            { name: 'Electricity', Amount: res.electricity },
            { name: 'Transportation', Amount: res.transport.total },
            { name: 'Building', Amount: res.building.monthly },
            { name: 'Stuff', Amount: res.stuff.monthly },
            { name: 'Trash', Amount: res.garbage.monthly },
        ];

        const transportation = [
            { name: 'Drive', Amount: res.transport.driverCo2 },
            { name: 'Transit', Amount: res.transport.publicTransitCo2 },
        ];

        const whatIfSelects = ['Current Porch', 'Moved to Canton', 'Carpool Program', 'West Seattle', 'Bothell Office', 'Spectralux', 'Omnidian'].map(whatIf => <MenuItem key={whatIf} primaryText={whatIf} value={whatIf} />);;

        return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> of {res.name}?</h3>
                <br />
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>
                        <b className="average-american-buttons-text">What if we ...</b>
                        <br />
                        <SelectField 
                            id="company-audit-what-if"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
                            labelStyle={{ paddingRight: '0px', fontWeight: 'bold' }}
                            onChange={this.updateWhatIfDropdown.bind(this)}
                            value={this.state.dataKey}
                        >
                            {whatIfSelects}
                        </SelectField>
                    </div>
                </div>

                <br />

                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            {res.name} emits <HowMuchCo2 co2={res.monthlyTotal} /> pounds of CO<sub>2</sub> each month and {res.stuffTotal.toLocaleString()} pounds in equiptment.
                        </span>         
                    </div>
                    
                    <BarChart
                        graphData={monthlyHighLevel}
                        units={'Pounds of CO2'}
                        title={`CO2 breakdown of a ${res.name}'s Ongoing CO2`}
                        defaultMax={20}
                        compare={false}
                        dataKey={'Amount'}
                        mobileHeaders={['Category', 'Pounds of CO2']}
                    />

                    <BarChart
                        graphData={formattedStuff}
                        units={'Pounds of CO2'}
                        title={`CO2 breakdown of a ${res.name}'s Stuff`}
                        defaultMax={20}
                        compare={false}
                        dataKey={'Amount'}
                        mobileHeaders={['Item', 'Pounds of CO2']}
                    />

                    <BarChart
                        graphData={formattedFood}
                        units={'Pounds of CO2'}
                        title={`CO2 breakdown of a ${res.name}'s Food`}
                        defaultMax={20}
                        compare={false}
                        dataKey={'Amount'}
                        mobileHeaders={['Food', 'Pounds of CO2']}
                    />

                    <BarChart
                        graphData={transportation}
                        units={'Pounds of CO2'}
                        title={`CO2 breakdown of a ${res.name}'s Commuters`}
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



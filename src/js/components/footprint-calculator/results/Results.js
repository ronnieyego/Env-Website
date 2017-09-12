import React from "react";
import ResultsPieChart from './ResultsPieChart';

import PersonalBreakdown from './PersonalBreakdown';
import Compare from './Compare';
import Savings from './Savings';
import Facts from './Facts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff598f', '#01dddd', '#00bfaf','#01dddd', '#e0e300'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = outerRadius * 1.25;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Results extends React.Component {

    constructor(props) {
	    super();
        this.state = {
            resultsShown: 'none'
        }
	}

    switchResult(e) {
        const id = e.target.id
        this.setState({ resultsShown: id});
    }

	render() {
        console.log('results state', this.state);
        const containerStyle = {
            margin: 'auto',
            marginLeft: '25px',
            textAlign: 'center'
        };

        const res = this.props.results;
        const monthlyUse = parseInt(res.totalEnergy);
        let shownResults;
        switch(this.state.resultsShown) {
            case 'personalBreakdown':
                shownResults = <PersonalBreakdown results={this.props.results} />;
                break;
            case 'compare':
                shownResults = <Compare averageAmerican={this.props.averageAmerican} monthlyUse={monthlyUse} />;
                break;
            case 'savings':
                shownResults = <Savings results={this.props.results} />
                break;
            default:
        }

         

		return (
            <div style={containerStyle}>
                <h1>You use <b>{monthlyUse.toLocaleString()} kwhs</b> each month.</h1>
                
                <div>
                    <h2>Lets dive a little deeper</h2>
                    <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '15px', marginBottom: '15px'}}>
                        <button type="submit" id="personalBreakdown" onClick={this.switchResult.bind(this)}>My Personal Energy Breakdown</button>
                        <button type="submit" id="compare" onClick={this.switchResult.bind(this)}>How I compare to others</button>
                        <button type="submit" id="savings" onClick={this.switchResult.bind(this)}>Ways to reduce my energy</button>
                    </div>
                </div>
                
                {shownResults}

                <br />
                <br />
                
                <Facts />
                
                {/* 
                Removed cause it looked bad.  To maybe be added again
                
                <button onClick={this.props.backToForm} >Change your answers</button>
                <div style={{textAlign: 'left'}}>This footprint is incomplete. Future updadates will include
                    <ul>
                        <li>Embodied energy (the energy cost of making your house, car and stuff)</li>
                        <li>Energy use from work</li>
                        <li>Energy use from the public sector and other shared expenditures</li>
                        <li>Water and carbon footprint</li>
                        <li>Things that can affect your footprint (i.e what happens if you go vegan)</li>
                        <li>What you can do to reduce your footprint</li>
                    </ul>
                </div>
                */}
                
            </div>
		);
	}
};


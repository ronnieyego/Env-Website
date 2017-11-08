import React, { PropTypes } from "react";


const tdStyle = {border: '1px solid black', paddingLeft: '5px'};

export default class FormQuestionRow extends React.Component {
    static proptypes = {
        question: PropTypes.object,
        co2PerKwh: PropTypes.number
    };

    formatName(name) {
        if(!name) {
            return '';
        }
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    render() {
        const question = this.props.question;
        let co2 = question.co2 ? question.co2 : Math.round(question.kwh * this.props.co2PerKwh * 100)/100;
        // Just for energy efficient light bulbs, go one more decimal place
        co2 = co2 > 0 ? co2 : Math.round(question.kwh * this.props.co2PerKwh * 1000)/1000;
        const kwh = question.kwh;
        const water = question.water ? question.water : 'N/A';
        let useType;
        switch(question['use-type']) {
            case 'hour':
                useType = <td style={tdStyle} key={`use-type-${question.name}`}>Per hour used</td>;
                break;
            case 'monthly-use':
                useType = useType = <td style={tdStyle} key={`use-type-${question.name}`}>Per use</td>;
                break;
            case 'monthly-own':
                useType = useType = <td style={tdStyle} key={`use-type-${question.name}`}>Used each month</td>;;
                break;
            case 'serving':
                useType = useType = <td style={tdStyle} key={`use-type-${question.name}`}>Per serving</td>;;
                break;
        }
        const key = Math.random();
        return (
            <tr key={question.name}>
                <td style={tdStyle} key={`${question.name}-name-${key}`}>{this.formatName(question.name)}</td>
                <td style={tdStyle} key={`${question.name}-co2-${key}`}>{co2.toLocaleString()}</td>
                <td style={tdStyle} key={`${question.name}-kwh-${key}`}>{kwh.toLocaleString()}</td>
                <td style={tdStyle} key={`${question.name}-water-${key}`}>{water.toLocaleString()}</td>
                {useType}
            </tr>
        )
    }
}
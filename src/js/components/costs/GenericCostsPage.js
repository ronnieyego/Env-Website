import React from "react";
import { arrayOf, shape, number, string } from 'prop-types';
import Divider from 'material-ui/Divider';

import HowMuchCo2 from '../how-much-co2/HowMuchCo2';

export default class GenericCostsPage extends React.Component {

    static propTypes = {
        name: string.isRequired,
        amount: shape({
            co2: number.isRequired,
            units: string.isRequired,
            excludeIds: arrayOf(number)
        }),
        sections: arrayOf(
            shape({
                title: string.isRequired,
                paragraphs: arrayOf(string).isRequired
            })
        ),
        sources: arrayOf(
            shape({
                url: string.isRequired,
                linkedWord: string.isRequired, // Starting word
                description: string,

            })
        )
    }

    renderSection(section) {
        return (
            <div key={Math.random()}>
                <Divider />
                <br />
                <p className="costs-form-sub-header">{section.title}</p>
                {section.paragraphs.map((paragrah, index) => (<p className="costs-form-bottom-paragraph" key={index}>{paragrah}</p>))}
            </div>
        )
    }

    renderSources(sources) {
        return (
            <div key={Math.random()}>
                <Divider />
                <br />
                <p className="costs-form-sub-header">Sources</p>
                <ul className="no-bullet-list">
                    {sources.map(source => <li><a href={source.url} target="_blank">{source.linkedWord}</a>{source.description}</li>)}
                </ul>
            </div>
        )
    }

	render() {
		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of {this.props.name}?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            It takes <HowMuchCo2 co2={this.props.amount.co2} exclude={this.props.amount.excludeIds || []} /> pounds of CO<sub>2</sub> to make {this.props.amount.units}.
                        </span>         
                    </div>
                    <br />
                    {this.props.sections.map(section => this.renderSection(section))}
                    {this.props.sources && this.renderSources(this.props.sources)}
                </div>
            </div>
		);
	}
}



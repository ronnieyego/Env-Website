import React from "react";
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import HoverText from '../../questions/HoverText';

@connect((store, props) => {
	return {
		isMobile: store.userInfo.isMobile,
	};
})
export default class IntroStep extends React.Component {

    static propTypes = {
        isMobile: bool.isRequired
    }

	render() {
		return (
            <div>
            <h3 className="footprint-form-header">How this works</h3>
                <div>
                    <p className="footprint-form-subtext">This form takes about 5 minutes to fill out and asks about 50 questions.  Most of these are pretty quick and easy to answer, however there are a few difficult questions to answer (e.g how many miles do you fly).  In cases where you don't know, give your best estimate.  The form generally defaults to the American average.</p>
                    <div className="footprint-form-subtext">
                        {!this.props.isMobile && (
                            <span>
                                You can click on the
                                <HoverText id="intro-step-hover-text" text="There will also be cool facts!" />
                                for an explanation on why the form is asking this question.
                            </span>
                        )}
                    </div>
                    <p className="footprint-form-subtext">The results page will tell you how you rank vs others, a personalized breakdown of your CO<sub>2</sub> emissions, and ways to reduce your footprint!</p>
                </div>
            </div>
		);
	}
};




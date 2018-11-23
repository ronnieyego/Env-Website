import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/header/HeaderHoc';
import FormV2 from '../components/footprint-form/forms/FormContainer';
import RaisedButton from 'material-ui/RaisedButton';

@connect(store => {
	return {
		displayForm: store.footprintForm.displayForm,
		isMobile: store.userInfo.isMobile,
	};
})
export default class FootprintCalcPage extends React.Component {
	static proptypes = {
		displayForm: bool,
		isMobile: bool
	}

	renderHomepage() {
		return (
			<div>
				<div className={this.props.isMobile ? "footprint-hero-mobile" : "footprint-hero"}>
					<p className="footprint-hero-text">What's my footprint?</p>
					<RaisedButton className="footprint-hero-button"
						buttonStyle={{ borderRadius: '10px', backgroundImage: 'linear-gradient(#72DCDB 30%, #2E5A58 90%)' }}
						labelColor="#ffffff"
						label="Calculate now"
						// href="#footprint-how-it-works-box-title"
						onClick={() => this.props.dispatch({ type: 'DISPLAY_FORM', payload: true })}  // Currently opesn form, but could make you go to the bottom.
						style={{ borderRadius: '10px', backgroundImage: 'linear-gradient(#72DCDB 30%, #2E5A58 90%)' }}
					/>
				</div>
				
				<div className={this.props.isMobile ? "footprint-value-prop-container-mobile row" : "footprint-value-prop-container row"}>
					<div className="footprint-value-prop col-md-6">
						<hr />
						<p className="footprint-value-prop-text">Discover your personalized carbon footprint across transportation, utilities, food, and possesions.</p>
						<p className="footprint-value-prop-text">Compare against other people of similar location and income.</p>
						<p className="footprint-value-prop-text">Learn personalized and quanitative ways to save that make sense for you.</p>
						<hr />
					</div>
					<img className="footprint-value-prop-image col-md-6" src="/public/images/homepage-compare.png" />
				</div>

				<div className={this.props.isMobile ? "footprint-value-prop-container-mobile row" : "footprint-value-prop-container row"}>
					{!this.props.isMobile && <img className="footprint-value-prop-image col-md-6" src="/public/images/savings-card.png" /> }
					<div className="footprint-value-prop col-md-6">
						<hr />
						<p className="footprint-value-prop-text">The calculator below will give you detailed insights into your carbon footprint.</p>
						<p className="footprint-value-prop-text">The goal is to give you the information to make your own informed choices.</p>
						<hr />
					</div>
					{this.props.isMobile && <img className="footprint-value-prop-image col-md-6" src="/public/images/savings-card.png" /> }
				</div>

				<div className="footprint-how-it-works row" >
					{!this.props.isMobile && <p className="footprint-how-it-works-cta-text col-md-5">Calculate your environmental footprint</p> }
					<div className="col-md-7">
						<div className={this.props.isMobile ? "footprint-how-it-works-box-mobile" : "footprint-how-it-works-box"}>
							<br />
							<p className="footprint-how-it-works-box-title" id="footprint-how-it-works-box-title">How this works</p>
							<p className="footprint-how-it-works-box-text">This form takes about 5 minutes to fill out and asks about 50 questions. Most of these are pretty quick and easy to answer, however there are a few difficult questions to answer (e.g how many miles do you fly).</p>
							<p className="footprint-how-it-works-box-text">In cases where you don't know, give your best estimate. The form generally defaults to the American average.</p>
							<p className="footprint-how-it-works-box-text">The results page will tell you how you rank vs others, a personalized breakdown of your CO2 emissions, and ways to reduce your footprint!</p>
							<br />
							<RaisedButton className="footprint-how-it-works-button"
								buttonStyle={{ borderRadius: '10px', background: 'linear-gradient(#E7EAE0 30%, #85A774 90%)' }}
								style={{ borderRadius: '10px', background: 'linear-gradient(#E7EAE0 30%, #85A774 90%)' }}
								label="Let's start!"
								labelColor="#ffffff"
								onClick={() => this.props.dispatch({ type: 'DISPLAY_FORM', payload: true })}
							/>
						</div>
					</div>
				
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="text-center">
				<Header />
				{this.props.displayForm ? <FormV2 /> : this.renderHomepage()}
				<br />
				<br />
				<br />
			</div>
		);
	}
}

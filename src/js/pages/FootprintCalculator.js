import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/header/HeaderHoc';
import FormV2 from '../components/footprint-form/forms/FormContainer';
import FlatButton from 'material-ui/FlatButton';
import { DARK_GREEN, DARK_TEAL } from '../utils/shared-styles/colors';

@connect(store => {
	return {
		displayForm: store.footprintForm.displayForm,
		isMobile: store.userInfo.isMobile,
		formError: store.footprintForm.formError,
		showLoadingAction: store.session.showLoadingAction
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
				<Header />
				<div className={this.props.isMobile ? "footprint-hero-mobile" : "footprint-hero"}>
					<p className="footprint-hero-text">What's my footprint?</p>
					<FlatButton 
						className="footprint-hero-button"
						label="Calculate now"
						labelStyle={{color: 'white'}}
						href="#form-background-container"
						onClick={() => this.props.dispatch({ type: 'DISPLAY_FORM', payload: true })}  // Currently opesn form, but could make you go to the bottom.
						style={{ border: 'null', borderRadius: '10px', borderColor: '#000000', backgroundColor: DARK_TEAL }}
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
							<FlatButton className="footprint-how-it-works-button"
								style={{ borderRadius: '10px', backgroundColor: DARK_GREEN }}
								label="Let's start!"
								href="#form-background-container"
								// labelColor="#ffffff"
								labelStyle={{color: 'white'}}
								onClick={() => this.props.dispatch({ type: 'DISPLAY_FORM', payload: true })}
							/>
						</div>
					</div>
				
				</div>
			</div>
		)
	}

	renderError() {
		return (
			<div className="form-background">
				<Header />
				<p className="footprint-error-text">Looks like something went wrong.</p>
				<p className="footprint-error-text">Sorry for the inconvenience.  Hopefully we'll fix it soon.  You can email footprintfinder@gmail.com as well to report it.</p>
				<p className="footprint-error-text">Error message: {this.props.formError}</p>
				<div className="footprint-error-container" />
			</div>
		);
	}

	render() {
		if(this.props.formError) {
			return this.renderError();
		}
		return (
			<div className="text-center">
				{this.props.displayForm ? <FormV2 /> : this.renderHomepage()}
				<br />
				<br />
				<br />
			</div>
		);
	}
}

import React from 'react';

import Header from '../components/header/HeaderHoc';
import FootprintForm from '../components/footprint-form/forms/FormContainer';
import RaisedButton from 'material-ui/RaisedButton';

export default class FootprintCalcPage extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center">
				<Header />
				<div className="footprint-hero">
					<p className="footprint-hero-text">What's my footprint?</p>
					<RaisedButton className="footprint-hero-button"
						label="Calculate now"
						href="#footprint-form-title"
					/>
				</div>

				<div className="footprint-value-prop-container row">
					<div className="footprint-value-prop col-md-6">
						<hr />
						<p className="footprint-value-prop-text">Discover your personalized carbon footprint across transportation, utilities, food, and possesions.</p>
						<p className="footprint-value-prop-text">Compare against other people of similar location and income.</p>
						<p className="footprint-value-prop-text">Learn personalized and quanitative ways to save that make sense for you.</p>
						<hr />
					</div>
					<img className="footprint-value-prop-image col-md-6" src="/public/images/homepage-compare.png" />
				</div>

				<div className="footprint-value-prop-container row">
					<img className="footprint-value-prop-image col-md-6" src="/public/images/savings-card.png" />
					<div className="footprint-value-prop col-md-6">
						<hr />
						<p className="footprint-value-prop-text">The calculator below will give you detailed insights into your carbon footprint.</p>
						<p className="footprint-value-prop-text">The goal is to give you the information to make your own informed choices.</p>
						<hr />
					</div>
				</div>

				<div className="footprint-how-it-works row" >
					<p className="footprint-how-it-works-cta-text col-md-5">Calculate your environmental footprint</p>
					<div className="col-md-7">
						<div className="footprint-how-it-works-box">
						<br />
						<p className="footprint-how-it-works-box-title">How this works</p>
						<p className="footprint-how-it-works-box-text">This form takes about 5 minutes to fill out and asks about 50 questions. Most of these are pretty quick and easy to answer, however there are a few difficult questions to answer (e.g how many miles do you fly).</p>
						<p className="footprint-how-it-works-box-text">In cases where you don't know, give your best estimate. The form generally defaults to the American average.</p>
						<p className="footprint-how-it-works-box-text">The results page will tell you how you rank vs others, a personalized breakdown of your CO2 emissions, and ways to reduce your footprint!</p>
						<br />
						<RaisedButton className="footprint-how-it-works-button"
							label="Let's start!"
							onClick={() => console.log('STARTED!!')}
						/>
						<br /><br />
					</div>
					</div>
				
				</div>

				<div className="footprint">
					<h1 id="footprint-finder-page-title"><b>What's my footprint?</b></h1>
					<div style={{textAlign: 'left'}}>
						<FootprintForm />
					</div>
				</div>
			</div>
		);
	}
}

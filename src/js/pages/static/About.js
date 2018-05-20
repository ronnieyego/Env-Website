import React from "react";
import Header from '../../components/header/HeaderHoc';

const email = 'footprintfinder@gmail.com';
export default class About extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center" >
				<Header />
                <div className="static-page">
                    <h1 className="static-page-header">About</h1>
                    <div className="static-page-section">
                        <h2>The Story</h2>
                        <p>Footprint-finder was born out of one simple question: what's the best thing I can do for the environment?</p>
                        <p>Some people say that you shouldn't eat meat, other's have a vendetta against plastic bags.  I've heard that we should all bike to work and I've also heard that we should all buy Priuses.  My friends have claimed cap and trade as the answer yet flaunt stories of people who live off the grid.  Utlimately, as person who studied this question in college and read every article on the subject, I realized that I had absolutely no idea.</p>
                        <p>While thinking about the answer, I realized that in order to reduce my footprint, I should learn how big my footprint is.  I felt that all of the online calculators lacked any personal touch.  Some just tried to sell me carbon credits, while others just told me I needed 4.6 Earth's to support my lifestyle.  There was no good breakdown on what caused my emissions. So I decided to research the answer myself.</p>
                        <p>This journey would take me to the isides of a cow's 4 stomachs to the depths of the government bureaucracy.  I've sifted through thousands of pages of research papers and learned to thoroughly appreciate organizations that systematically collect mundane data.  Every day I try to push this knowledge a little bit further to bring us all closer to this one simple question.</p>
                    </div>
                    <div className="static-page-section">
                        <h2>Mission</h2>
                        <p>The goal of Footprint-finder is to empower people to understand their footprint and give them the tools to reduce it.</p>
                        <p>The environmental movement has provided an abundance of ways to reduce your footprint.  This is great! I want people to do the most impactful thing first.  Given the choice between changing out your bulbs for CFLs or adding air to your deflated tires, most people would think the CFLs would have a larger effect.  Yet inflating your tires will have a 10x impact 9/10 times. A lot of impacts that these choice provider have an order of magnitude difference. Footprint-finder is here to help quantify and organize the best ways to save.</p>
                    </div>
                    <div className="static-page-section">
                        <h2>Contact</h2>
                        <p>This project is a work in progress and is constantly growing.  I'd love to hear feedback and make this tool more useful to you. Please email me at {email}.</p>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
		);
	}
}

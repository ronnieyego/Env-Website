import React from "react";

import Header from '../../components/Header.js';

export default class HowTheFormWorks extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center" >
				<Header />
                <div className="static-page">
                    <h1 className="static-page-header">How I Calculated Your Footprint</h1>
                    <div className="static-page-section">
                        <p>Thanks for calculating your footprint!  I'm glad you're curious about how your results were calculated.  It was a lot of work to build this form.  There is a ton of choices to make from getting the best data, to choosing the correct questions, and trying to figure out what is important or not.  This page will dive deeper into all of the decisions that led to your footprint.</p>
                        This page is broken into the following sections:
                        <ul>
                            <li>Overview of how the footprint is generated</li>
                            <li>Energy</li>
                            <li>Food</li>
                            <li>CO<sub>2</sub></li>
                            <li>Form weakness and things that don't add up</li>
                        </ul>
                        {/*<p>This is the hardest part of calculating a footprint.  There are 3 main questions: Can I find data, is the data relevant, and is this data accurate?</p>*/}
                    </div>
                    <div id="how-the-form-works-overview" className="static-page-section">
                        <h2>How I generate your footprint</h2>
                        <p>This part is pretty simple at a high level.  For each major component, I calculate monthly useage and add them together.</p>
                        <p>For food and energy use, I researched data for the CO<sub>2</sub>, power, and water cost for each unit used.  Ex. A serving of chicken costs 1.01 pounds of CO<sub>2</sub>, 0.83 kwhs of energy, and 85.6 gallons of water.  I simply convert everything to monthly use and add it all up.  For appliance use, I did not research CO<sub>2</sub> emitted per use, but rather multipled the energy use times how much CO<sub>2</sub> your state emits per kwh.</p>
                        <p>Calculating transportation is a bit more complicated.   Utlimately, I figure out how many miles you drive (carpooling reduces your total mileage count) and from there get how many gallons of gas you use.  Each gallon of gas releases about 20 pounds of CO<sub>2</sub> and stores about 35kwhs of energy.  Diesel has similar values.  Electric cars use about 30 kwhs to travel 100 miles (different for each make.  I chose a reasonable average).  Air travel is a bit simpler.  Commercial planes tend to get around 90 mpg per passenger.  Jet fuel also has similar CO<sub>2</sub> and energy stats as gasoline.  There is some research that claims CO<sub>2</sub> released at a high elevation has ~2x the impact than CO<sub>2</sub> emitted near sea level.  I did not factor this in.  All transportation figures are then converted to monthly use.</p>
                    </div>
                    
                    <div id="how-the-form-works-energy" className="static-page-section">
                        <h3>Energy</h3>
                        <p>As a prefernce, I've tried to get as much data as I can from the US government, specifically the EIA.  The EIA pretty much has everything you could ever want in terms of energy production and it is largely consistent within itself (I'll touch on data consistency later).  The main data source I've used has been a report with every state's total energy generation and emissions broken down by energy source.  I filtered sources based on whether they were commercial or utility to comprise each state's energy profile.</p>
                        <p>Appliance use came mostly from 3rd party sites.  Since my goal was just energy use, I felt that these were reasonably accurate.  That said, many different sites large differences in values.  I.e. A TV could have a 10x difference depending on brand and size.  Most discrepencies are caused by different dimensions or brands.  I condensed based on what I felt was average.  Ultimately, I chose a site called SiliconValleyPower as a base for appliances and used averages for values that I felt were off.</p>
                    </div>
                    <div id="how-the-form-works-food" className="static-page-section">
                        <h3>Food</h3>
                        <p>Getting food emissions and water data was incredibly hard.  Starting with cattle emissions, there are a ton of articles about cow emissions.  A lot of them reference a study that has some major caveats.  The most important factor for cattle emissions comes from how long the cow lives.  In North America where we have large CAFOs (concentrated feedlots), cows are raised for maximum yield.  They fatten quicker and live shorter lives.  This greatly reduces their CO<sub>2</sub> emissions.  In Asia and Africa where cattle tends to roam more and serve a dual purpose of milk and meat, they live longer and produce over twice the emissions of their North American counterparts.  I decided to use the FAO since they have a plethora of studies on the subject.  Unfortunately, there are still major data discrepencies between the studies.  Generally, studies use either a 28kg of CO<sub>2</sub>/kg of beef or a 12kg figure for North American beef production.  I went with the larger figure since it matched consistency with CO<sub>2</sub> emissions for other food products.  Other meat use was relatively straightforward.  Most sites (mainly the FAO) is consistent with pork, chicken, and dairy figures.</p>
                        <p>Produce also posed many problems.  An apple in a supermarket could come from your state or South America depending on the season.  It could also be produced locally, but in a greenhouse (highest emissions).  Different sites will once again site different studies.  The good part is that these studies tend to be very accurate for what they're measuring, they're just measuring different things.  I took an average between studies (so in reality, none of my numbers are accurate for any given month since im averaging the apple grown locally and the apple that traveled 3,000 miles).  The good part is that compared to meat, produce counts for ~one tenth of the emissions and being wrong in any given month for produce won't throw off the results too much.</p>
                        <p>A lot of though went into choosing the question categories.  I wanted to make the section quick and without too much thought.  From a useability perspective, this meant having simple categories and keeping it on a level of daily servings.  Vegetables, fruits, and grains are not uniform.  Tomatoes can have ten times the emissions of a potato.  I decided to keep them together beucase although there can be significant variation within each category, the total impact of a potato based diet vs a tomato diet is not significant vs a vegetabe based diet vs a meat based diet.</p>
                    </div>
                    <div id="how-the-form-works-transportation" className="static-page-section">
                        <h3>Transportation</h3>
                        <p>Getting data for transit data was really simple.  Most data came from the EPA or Wikipedia (yes Wikipedia.  It has good data on vehicle efficiencies).  The EPA had figures such as CO<sub>2</sub> per gallon of gas or jet fuel.  Wikipedia has great data on electric car energy use per 100 mi (I did a skewed average towards more popular models.  Telsa has the best ratio btw.) and average mpg per person for different plane models.  Overall, I found no data inconsistencies.</p>
                        <p>Choosing the questions also proved pretty simple.  I did make some assumptions to simplify train and bus calculations by removing fuel source (~45% of buses are natural gas or electric).</p>
                    </div>
                    <div id="how-the-form-works-problems" className="static-page-section">
                        <h3>Innacuracies</h3>
                        <p>Please treat this form as a guide vs the absolute truth.  There is no 100% accurate way to calculate your footprint.  As you've read above, I've introduced a lot of innacuracies to prevent excess questions.  In addition to these, there are parts of your footprint that I haven't even touched on.</p>
                        Missing from the form:
                        <li>Your stuff</li>
                        <li>Infrastructure and communcal goods</li>
                        <li>Businesses</li>
                        <br />
                        <div id="how-the-form-works-stuff" className="static-page-subsection">
                            <h4>Stuff</h4>
                            <p>You have a lot of stuff that takes an enormous amount of CO<sub>2</sub>.  Your house/apartment, car, clothes, furniture, appliances, etc.  Raw material harvesting is one of the most energy, carbon, and water intensive industries.  Additionally, everything you own needs to be created at a factory, packaged, and then transported to your house.  Finally, things need to be disposed of.  All of this significantly adds to your footprint and in some cases may be the dominating factor.</p>
                            <p>I will add a section on this in the near future</p>
                        </div>
                        <div id="how-the-form-works-infrastructure" className="static-page-subsection">
                            <h4>Infrastructure</h4>
                            <p>A lot of stuff is built for you: roads, power plants, landfills, etc.  Each person contributes some amount to the creation and maintenance of these pieces of infrastructure.  There is one other "common goods" which leaves a large impact but is not accounted for: war.</p>
                        </div>
                        <div id="how-the-form-works-business" className="static-page-subsection">
                            <h4>Businesses</h4>
                            <p>Unfortunately, most Americans spend waking hours with coworker than with loved ones.  From agriculture to manufacturing to service businesses, each one has a footprint.</p>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

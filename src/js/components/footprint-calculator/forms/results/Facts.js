import React from "react";

const facts = [
    'A full airplane gets about 90 mpg per person. Yet this has a large impact because Americans fly over 600 Billion miles per year!',
    'The average electric car is about 4 times more efficient than a gasoline car in terms of energy spent to travel.',
    'Beef is energy intensive.  It takes over 50 times more energy to get a pound of beef than a pound of grain.  Pork is 21 times more expensive while chicken is only 7.5 times more expensive.',
    'While energy efficient bulbs use 10 times less energy than a standard halogen, you could get the same energy savings by driving 1 mile less each month.',
].map(fact => {
    return (<li key={fact} id={fact}>{fact}</li>);
})

export default class Facts extends React.Component {

    constructor(props) {
	    super();
	}


	render() {
        const containerStyle = {
            margin: 'auto',
            marginLeft: '25px',
            textAlign: 'left'
        };
        
		return (
            <div style={containerStyle}><b>Energy facts</b>
                <ul>
                    {facts}
                </ul>
            </div>
		);
	}
};


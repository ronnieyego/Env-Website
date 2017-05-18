export default function calculateElectricitySavings(roofSize, kwhPrice, sunHours, wattsPerHour) {
	  	console.log('calculationg energy savings');

	  	console.log('wattsPerHour: ', wattsPerHour);
	  	let dataValid = false;
	  	let resultsMessageLine1 = 'There was a problem with one or more inputs';
	  	let resultsMessageLine2 = 'Please make sure you\'re entering valid numbers';

	    if(parseInt(roofSize) >= 0 && parseInt(kwhPrice) >= 0 && parseInt(sunHours) >= 0) {
	    	dataValid = true;
	    }
	    if(dataValid) {
	    	let electrictyGenerated = Math.round(roofSize * wattsPerHour * sunHours * 365/1000);
	        let savings = Math.round(electrictyGenerated * kwhPrice);
	        //COnverts to 1,234,588 format which is NAN
	        electrictyGenerated = electrictyGenerated.toLocaleString();
	        savings = savings.toLocaleString();

	        resultsMessageLine1 = `You will generate ${electrictyGenerated}kwHs of electricity.`;
	        resultsMessageLine2 = `This will save you $${savings} per year.`;
	    }
	    return {
	    	resultsMessageLine1,
	    	resultsMessageLine2
	    }; 

	  }
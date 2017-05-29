"use strict";
module.exports = function calculateElectricitySavings(roofSize, kwhPrice, sunHours, wattsPerHour) {
	  	console.log('calculating energy savings');
	  	let dataValid = false;
	    if(parseInt(roofSize) >= 0 && parseInt(kwhPrice) >= 0 && parseInt(sunHours) >= 0) {
	    	dataValid = true;
	    }
	    if(dataValid) {
	    	let electrictyGenerated = Math.round(roofSize * wattsPerHour * sunHours * 365/1000);
	        let savings = Math.round(electrictyGenerated * kwhPrice);
	        //COnverts to 1,234,588 format which is NAN
	        return { electrictyGenerated, savings };
	    }
	    throw new Error('Invalid data for calculating electricity savings');
	  };

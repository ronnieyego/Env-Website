// Spectralux
// 12335 134th CT NE
// Redmond, WA 98052
// 110 employees
// 95% Employees drive solo
// 5% Carpool
// 1% work from home

// They build aviation equiptment.  I do not estimate any of their production.

import { getCompanyCo2 } from './calculations';

export const spectraluxData = {
    name: 'Spectralux',
    employees: 105,
    stuff: {
        monitors: 110,
        laptops: 110,
        chairs: 110,
        desks: 110,
        tables: 10,
        whiteboards: 5,
        sofas: 5,
        cabinets: 15,
        printers: 2
    },
    transport: {
        driveSolo: 99,
        carpool: 5,
        publicTransit: 0,
        commuteDistance: 30, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
        commuteTime: 54.2 // Minutes  from https://www.geekwire.com/2017/bad-time-stress-seattles-daily-commute-growing-city-ranks-among-worst-u-s/
    },
    electricity: {
        // Estimate.  Does not include manufacturing.  Just office 
        cost: '1k/month',  // 0.0946 Dollars per kwh from seattle WA
        kwh: 11712.5,
        state: 'WA'
    },
    building: {
        // Really big building
        sqft: 30466, // http://www.mapdevelopers.com/area_finder.php
        monthsInBuilding: 480 // In business for 40+ years
    },
    food: {
        // Monthly values unknown
        beef: 0,
        dairy: 0, 
        cheese: 0,
        junkFood: 0,
        fruit: 0
    },
    garbage: {
        trash: 10 // Pounds per day
    }
};

export const SPECTRALUX = getCompanyCo2(spectraluxData);
// Company Name - Omnidian
// Office Address - 107 Spring Street
// Number of Employees in Office - 27
// Percentage of employees that drive and that take transit - 78% transit, 19% drive, 3% walk

import { getCompanyCo2 } from './calculations';

export const omnidianData = {
    name: 'Omnidian',
    employees: 27,
    stuff: {
        monitors: 27,
        laptops: 27,
        chairs: 27,
        desks: 27,
        tables: 3,
        whiteboards: 3,
        sofas: 1,
        cabinets: 3,
        printers: 1
    },
    transport: {
        driveSolo: 5,
        carpool: 0,
        publicTransit: 21,
        commuteDistance: 30, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
        commuteTime: 54.2 // Minutes  from https://www.geekwire.com/2017/bad-time-stress-seattles-daily-commute-growing-city-ranks-among-worst-u-s/
    },
    electricity: {
        // Estimate based on Porch.  They're an office company as well.
        cost: '.3k/month',  // 0.0946 Dollars per kwh from seattle WA
        kwh: 3171.5,
        state: 'WA'
    },
    building: {
        // Really big building
        sqft: 7173, // http://www.mapdevelopers.com/area_finder.php
        monthsInBuilding: 36 // In business for 3 years
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

export const OMNIDIAN = getCompanyCo2(omnidianData);
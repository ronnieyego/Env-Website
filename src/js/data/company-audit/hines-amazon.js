// Company Name – Hines at Amazon
// Office Address – 224 Westlake Avenue N Seattle, WA
// Number of Employees in Office – 330 total employees, 185 in Seattle
// Percentage of employees that drive and that take transit no firm data, but likely about 70%

// Seattle office only
// THis is real estate


import { getCompanyCo2 } from './calculations';

export const hinesAmazonData = {
    name: 'Hines',
    employees: 185,
    stuff: {
        monitors: 185,
        laptops: 185,
        chairs: 185,
        desks: 185,
        tables: 20,
        whiteboards: 10,
        sofas: 2,
        cabinets: 5,
        printers: 2
    },
    transport: {
        driveSolo: 130,
        carpool: 0,
        publicTransit: 55,
        commuteDistance: 30, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
        commuteTime: 54.2 // Minutes  from https://www.geekwire.com/2017/bad-time-stress-seattles-daily-commute-growing-city-ranks-among-worst-u-s/
    },
    electricity: {
        // Estimate based on Porch.  They're an office company as well.
        cost: '.3k/month',  // 0.0946 Dollars per kwh from seattle WA
        kwh: 30000,
        state: 'WA'
    },
    building: {
        // Really big building
        sqft: 6559, // http://www.mapdevelopers.com/area_finder.php
        monthsInBuilding: 36 // Complete guess
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
        trash: 20 // Pounds per day
    }
};

export const HINES_AMAZON = getCompanyCo2(hinesAmazonData);
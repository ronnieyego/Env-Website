// From PORCH 2018.

import { getCompanyCo2 } from './calculations';

// Item	Pounds of food
// crackers	16
// Peanuts	6
// Hi chew	4
// Granola Bar	9.5
// Apple sauce	12
// Fruit sugar	9
// Pretzels	6.75
// Pirate Booty	2.25
// Lollipop	5
// Corn nuts	5.1
// Animal Crackers	4
// Nutella sticks	1.8
// Aussie Bite	4
// Chips	3
// Olives	4
// Fruit sugar	5
// Fig bars	4
// Beef Jerky	2.85
// Cheer its	4.2
// Jerky Sticks	1.15
// Fruit by food	2
// Pastry Crisps	1.9
// PopCips	3
// Popcorn	1.1
// Popcorn	1.1e

export const porchData = {
    name: 'Porch',
    employees: 207,
    stuff: {
        monitors: 407,
        laptops: 392,
        chairs: 350,
        desks: 225,
        tables: 20,
        whiteboards: 30,
        sofas: 5,
        // my guess realm
        cabinets: 15,
        printers: 2
    },
    transport: {
        driveSolo: 137,
        carpool: 0,
        publicTransit: 68,
        planeMiles: 4000 * 20, // 4000 miles to dallas.  20 flights a month
        commuteDistance: 30, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
        commuteTime: 54.2 // Minutes  from https://www.geekwire.com/2017/bad-time-stress-seattles-daily-commute-growing-city-ranks-among-worst-u-s/
    },
    electricity: {
        cost: '3k/month',  // 0.0946 Dollars per kwh from seattle WA
        kwh: 31712.5,
        state: 'WA'
    },
    building: {
        sqft: 23839, // http://www.mapdevelopers.com/area_finder.php
        monthsInBuilding: 30
    },
    food: {
        // Monthly values.  GOt a receit which I assume is every 2 weeks
        beef: 8,
        dairy: 50, // Guess
        cheese: 50, // guess
        junkFood: 200,
        fruit: 32
    },
    garbage: {
        trash: 20 // Pounds per day
    }
};

const atlantaCommute = { 
    driveSolo: 195,
    carpool: 0,
    publicTransit: 10,
    commuteDistance: 30, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 30  
};
const atlantaElectricity = { ...porchData.electricity, state: 'AL' }


// 25% of people carpool to work.
const carpoolCommute = {
    driveSolo: 100,
    carpool: 50,
    publicTransit: 43,
    commuteDistance: 35, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 54.2 
};

const bothellOfficeCommute = {
    driveSolo: 152,
    carpool: 0,
    publicTransit: 53,
    commuteDistance: 10, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 20 
};

// Lot of carpooling
const westSeattleCommute = {
    driveSolo: 107,
    carpool: 0,
    publicTransit: 68,
    commuteDistance: 10, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 10 
};

export const PORCH = getCompanyCo2(porchData);
export const carpoolProgram = getCompanyCo2({ ...porchData, transport: carpoolCommute });
export const moveToAtlanta = getCompanyCo2({ ...porchData, transport: atlantaCommute, electricity: atlantaElectricity });
export const bothellOffice = getCompanyCo2({ ...porchData, transport: bothellOfficeCommute });
export const westSeattle = getCompanyCo2({ ...porchData, transport: westSeattleCommute });


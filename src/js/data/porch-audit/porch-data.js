// From PORCH 2018.

import { 
    busMpgPerPerson,
    co2PerGallonOfGas,
    trainMpgPerPerson 
} from '../../components/footprint-form/data/transportation';
import { convertKwhToCo2 } from '../../components/footprint-form/calculations/utils';
import { servingFacts } from '../../components/footprint-form/data/food';
import { averageCo2PerPoundGarbage } from '../../components/costs/garbage/garbage-data';

const DAYS_IN_MONTH = 30;
const MONTHS_OF_LIFE_FOR_STUFF = 48;



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
// Popcorn	1.1


const getStuffCo2 = stuff => {
    const res = {};
    res.laptops = stuff.laptops * 811; // From 15in Mac only production costs.  Not use
    res.monitors = stuff.monitors * 237.6; // From Dell.  Production costs only
    res.chairs = stuff.chairs * 158; // From furniture section.  Assume standard office chair
    res.desks = stuff.desks * 77; // From furniture section.  Assume standard office desk ~1.6 meters
    res.tables = stuff.tables * 90; // From furniture.  Took sturdy table over dining table since ours are generally big.
    res.cabinets = stuff.cabinets * 40; // From furniture
    res.sofas = stuff.sofas * 198; // From furniture
    res.printers = stuff.printers * 376; // From Printer. Ignores paper costs.
    res.whiteboards = stuff.whiteboards * 30; // Complete guess

    const total = Object.keys(res).reduce((total, key) => {
        return res[key] + total;
    }, 0);
    res.total = total;
    res.monthly = Math.round(total / MONTHS_OF_LIFE_FOR_STUFF);
    return res;
};

const getTransportCo2 = transport => {
    const idleGph = .16;  // Gallons used per hour idling.  https://www.energy.gov/eere/vehicles/fact-861-february-23-2015-idle-fuel-consumption-selected-gasoline-and-diesel-vehicles
    const percentIdle = .5; // Half of your commute
    const mpg = 25;
    const divers = transport.parkingSpots + transport.flexSubsidies;
    const publicTransit = transport.orcaSubsidies;
    const driverGallonsPerDay = (transport.commuteDistance / mpg ) + (transport.commuteTime * percentIdle / 60 * idleGph);
    const driverCo2 = Math.round(divers * driverGallonsPerDay * co2PerGallonOfGas);
    const publicTransitGallonsPerDay = transport.commuteDistance / ((busMpgPerPerson + trainMpgPerPerson) / 2);
    const publicTransitCo2 = Math.round(publicTransit * publicTransitGallonsPerDay * co2PerGallonOfGas);
    const monthlyDriveCo2 = driverCo2 * DAYS_IN_MONTH;
    const monthlyPublicTransitCo2 = publicTransitCo2 * DAYS_IN_MONTH;
    return {
        driverGallonsPerDay,
        driverCo2: monthlyDriveCo2,
        publicTransitGallonsPerDay,
        publicTransitCo2: monthlyPublicTransitCo2,
        total: monthlyDriveCo2 + monthlyPublicTransitCo2
    }
};

const getElectricityCo2 = electricity => {
    return convertKwhToCo2(electricity.state, electricity.kwh);
};

const getGarbageCo2 = garbage => {
    const monthly = Math.round(garbage.trash * averageCo2PerPoundGarbage * DAYS_IN_MONTH);
    return { monthly };
};

const getBuildingCo2 = building => {
    const total = building.sqft * 100 * .33; // CO2 per sqft for brick.  .33 is a GUESS adjuster based on floors and emptyness of building
    const monthly = total / 100 / 12; // Brick buildings live for 100 years
    
    return {
        total,
        monthly,
        ourShare: monthly * building.monthsInBuilding  
    };
};

const getFoodCo2 = food => {
    const res = {};
    res.beef = Math.round(food.beef * servingFacts.beef.co2);
    // res.grain = Math.round(food.grain * servingFacts.grain.co2);
    res.fruit = Math.round(food.fruit * servingFacts.fruit.co2);
    res.cheese = Math.round(food.cheese * servingFacts.cheese.co2);
    res.dairy = Math.round(food.dairy * servingFacts.dairy.co2);
    res['Junk Food'] = Math.round(food.junkFood * servingFacts.junkFood.co2);
    const total = Object.keys(res).reduce((total, key) => {
        return res[key] + total;
    }, 0);
    res.total = total;
    return res;
};

const getCompanyCo2 = data => {
    const res = {};
    res.stuff = getStuffCo2(data.stuff);
    res.transport = getTransportCo2(data.transport);
    res.electricity = getElectricityCo2(data.electricity);
    res.building = getBuildingCo2(data.building);
    res.food = getFoodCo2(data.food);
    res.garbage = getGarbageCo2(data.garbage);
    res.monthlyTotal = Math.round(res.transport.total + res.food.total + res.electricity + res.garbage.monthly);
    res.stuffTotal = Math.round(res.stuff.total + res.building.ourShare);
    
    return res;
}

export const porchData = {
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
        parkingSpots: 60,
        orcaSubsidies: 68,
        flexSubsidies: 77,
        total: 207,
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
    parkingSpots: 128,
    orcaSubsidies: 10,
    flexSubsidies: 67,
    total: 207,
    commuteDistance: 30, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 30  
};
const atlantaElectricity = { ...porchData.electricity, state: 'AL' }


// 25% of people carpool to work.
const carpoolCommute = {
    parkingSpots: 60,
    orcaSubsidies: 43,
    flexSubsidies: 50,
    total: 207,
    commuteDistance: 35, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 54.2 
};

const bothellOfficeCommute = {
    parkingSpots: 90,
    orcaSubsidies: 53,
    flexSubsidies: 62,
    total: 207,
    commuteDistance: 10, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 20 
};

// Lot of carpooling
const westSeattleCommute = {
    parkingSpots: 30,
    orcaSubsidies: 68,
    flexSubsidies: 77,
    total: 207,
    commuteDistance: 10, // Miles.  Estimated from google maps and https://www.thestranger.com/slog/archives/2013/03/11/seattle-ranked-10th-in-nation-for-horrible-commute-times
    commuteTime: 10 
};

export const PORCH = getCompanyCo2(porchData);
export const carpoolProgram = getCompanyCo2({ ...porchData, transport: carpoolCommute });
export const moveToAtlanta = getCompanyCo2({ ...porchData, transport: atlantaCommute, electricity: atlantaElectricity });
export const bothellOffice = getCompanyCo2({ ...porchData, transport: bothellOfficeCommute });
export const westSeattle = getCompanyCo2({ ...porchData, transport: westSeattleCommute });
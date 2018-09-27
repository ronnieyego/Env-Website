// http://www.mapdevelopers.com/area_finder.php

import { 
    busMpgPerPerson,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    trainMpgPerPerson,
    planeMpgPerPerson 
} from '../../components/footprint-form/data/transportation';
import { convertKwhToCo2 } from '../../components/footprint-form/calculations/utils';
import { servingFacts } from '../../components/footprint-form/data/food';
import { averageCo2PerPoundGarbage } from '../../components/costs/garbage/garbage-data';


const DAYS_IN_MONTH = 30;
const MONTHS_OF_LIFE_FOR_STUFF = 48;

export const getStuffCo2 = stuff => {
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

export const getTransportCo2 = transport => {
    const idleGph = .16;  // Gallons used per hour idling.  https://www.energy.gov/eere/vehicles/fact-861-february-23-2015-idle-fuel-consumption-selected-gasoline-and-diesel-vehicles
    const percentIdle = .5; // Half of your commute
    const mpg = 25;
    const divers = transport.driveSolo;
    const publicTransit = transport.publicTransit;
    const planeMiles = transport.planeMiles || 0;
    const planeGallonsPerMonth = planeMiles / planeMpgPerPerson;
    const monthlyPlaneCo2 = Math.round(planeGallonsPerMonth * co2PerGallonOfJetFuel);

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
        planeCo2: monthlyPlaneCo2,
        total: monthlyDriveCo2 + monthlyPublicTransitCo2 + monthlyPlaneCo2
    }
};

export const getElectricityCo2 = electricity => {
    return convertKwhToCo2(electricity.state, electricity.kwh);
};

export const getGarbageCo2 = garbage => {
    const monthly = Math.round(garbage.trash * averageCo2PerPoundGarbage * DAYS_IN_MONTH);
    return { monthly };
};

export const getBuildingCo2 = building => {
    const total = building.sqft * 100 * .33; // CO2 per sqft for brick.  .33 is a GUESS adjuster based on floors and emptyness of building
    const monthly = total / 100 / 12; // Brick buildings live for 100 years
    
    return {
        total,
        monthly,
        ourShare: monthly * building.monthsInBuilding  
    };
};

export const getFoodCo2 = food => {
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

export const getCompanyCo2 = data => {
    const res = {};
    res.name = data.name;
    res.stuff = getStuffCo2(data.stuff);
    res.transport = getTransportCo2(data.transport);
    res.electricity = getElectricityCo2(data.electricity);
    res.building = getBuildingCo2(data.building);
    res.food = getFoodCo2(data.food);
    res.garbage = getGarbageCo2(data.garbage);
    res.monthlyTotal = Math.round(res.transport.total + res.food.total + res.electricity + res.garbage.monthly);
    res.stuffTotal = Math.round(res.stuff.total + res.building.ourShare);
    res.employee = Math.round(res.monthlyTotal / data.employees);
    
    return res;
}
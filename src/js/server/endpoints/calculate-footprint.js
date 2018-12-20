import getFoodResults from '../../components/footprint-form/calculations/food';
import getHomeResults from '../../components/footprint-form/calculations/home';
import getHomeActivitiesResults from '../../components/footprint-form/calculations/home-activities';
import getHomeHeatingResults from '../../components/footprint-form/calculations/heating';
import getHomeCoolingResults from '../../components/footprint-form/calculations/cooling';
import getTransportationResults from '../../components/footprint-form/calculations/transportation';
import getPetsResults from '../../components/footprint-form/calculations/pets';
import getStuffResults from '../../components/footprint-form/calculations/stuff';
import getClothesResults from '../../components/footprint-form/calculations/clothes';
import getFurnitureResults from '../../components/footprint-form/calculations/furniture';


const getStuff = answers => {
    const furniture = getFurnitureResults(answers);
    const stuff = getStuffResults(answers);
    const clothes = getClothesResults(answers);

    const totalCo2 = furniture.totalCo2 + stuff.totalCo2 + clothes.totalCo2;
    const monthlyCo2 = furniture.monthlyCo2 + stuff.monthlyCo2 + clothes.monthlyCo2;
    return { 
        monthlyCo2,
        totalCo2,
        clothes,
        furniture,
        stuff
     };
};

const sumMonthlyCo2 = res => {
    let monthlyCo2 = 0;
    monthlyCo2 += res.food.monthlyCo2;
    monthlyCo2 += res.home.monthlyCo2;
    monthlyCo2 += res.homeActivities.monthlyCo2;
    monthlyCo2 += res.heating.monthlyCo2;
    monthlyCo2 += res.cooling.monthlyCo2;
    monthlyCo2 += res.transportation.totalCo2;
    monthlyCo2 += res.transportation.carMonthlyBuild;
    monthlyCo2 += res.pets.monthlyCo2;
    monthlyCo2 += res.stuff.monthlyCo2;

    return monthlyCo2;
};

const getMissingFields = answers => {
    const missingFields = [];
    if(typeof answers.userZip === 'undefined' ) { missingFields.push('userZip')}
    if(typeof answers.calories === 'undefined' ) { missingFields.push('calories')}
    if(typeof answers.beef === 'undefined' ) { missingFields.push('beef')}
    if(typeof answers.chicken === 'undefined' ) { missingFields.push('chicken')}
    if(typeof answers.pork === 'undefined' ) { missingFields.push('pork')}
    if(typeof answers.seafood === 'undefined' ) { missingFields.push('seafood')}
    if(typeof answers.dairy === 'undefined' ) { missingFields.push('dairy')}
    if(typeof answers.cheese === 'undefined' ) { missingFields.push('cheese')}
    if(typeof answers.vegetables === 'undefined' ) { missingFields.push('vegetables')}
    if(typeof answers.fruit === 'undefined' ) { missingFields.push('fruit')}
    if(typeof answers.grain === 'undefined' ) { missingFields.push('grain')}
    if(typeof answers.junkFood === 'undefined' ) { missingFields.push('junkFood')}
    if(typeof answers.homeType === 'undefined' ) { missingFields.push('homeType')}
    if(typeof answers.homeSqft === 'undefined' ) { missingFields.push('homeSqft')}
    if(typeof answers.homeMaterial === 'undefined' ) { missingFields.push('homeMaterial')}
    if(typeof answers.numHousemates === 'undefined' ) { missingFields.push('numHousemates')}
    if(typeof answers.hoursHome === 'undefined' ) { missingFields.push('hoursHome')}
    if(typeof answers.hoursTv === 'undefined' ) { missingFields.push('hoursTv')}
    if(typeof answers.hoursComputer === 'undefined' ) { missingFields.push('hoursComputer')}
    if(typeof answers.cookAtHomeFrequency === 'undefined' ) { missingFields.push('cookAtHomeFrequency')}
    if(typeof answers.doesShowerDaily === 'undefined' ) { missingFields.push('doesShowerDaily')}
    if(typeof answers.doesMusicAtHome === 'undefined' ) { missingFields.push('doesMusicAtHome')}
    if(typeof answers.laundryLoads === 'undefined' ) { missingFields.push('laundryLoads')}
    if(typeof answers.insulationType === 'undefined' ) { missingFields.push('insulationType')}
    if(typeof answers.summerTemp === 'undefined' ) { missingFields.push('summerTemp')}
    if(typeof answers.coolingType === 'undefined' ) { missingFields.push('coolingType')}
    if(typeof answers.coolWholeHouse === 'undefined' ) { missingFields.push('coolWholeHouse')}
    if(typeof answers.usesPersonalFan === 'undefined' ) { missingFields.push('usesPersonalFan')}
    if(typeof answers.winterTemp === 'undefined' ) { missingFields.push('winterTemp')}
    if(typeof answers.heatType === 'undefined' ) { missingFields.push('heatType')}
    if(typeof answers.heatWholeHome === 'undefined' ) { missingFields.push('heatWholeHome')}
    if(typeof answers.usesPersonalHeater === 'undefined' ) { missingFields.push('usesPersonalHeater')}
    if(typeof answers.houseSqft === 'undefined' ) { missingFields.push('houseSqft')}
    if(typeof answers.doesDrive === 'undefined' ) { missingFields.push('doesDrive')}
    if(typeof answers.carClass === 'undefined' ) { missingFields.push('carClass')}
    if(typeof answers.carBuildType === 'undefined' ) { missingFields.push('carBuildType')}
    if(typeof answers.carMpg === 'undefined' ) { missingFields.push('carMpg')}
    if(typeof answers.carMilesMonth === 'undefined' ) { missingFields.push('carMilesMonth')}
    if(typeof answers.carFuelType === 'undefined' ) { missingFields.push('carFuelType')}
    if(typeof answers.carpoolFrequency === 'undefined' ) { missingFields.push('carpoolFrequency')}
    if(typeof answers.doesPublicTransit === 'undefined' ) { missingFields.push('doesPublicTransit')}
    if(typeof answers.busMiles === 'undefined' ) { missingFields.push('busMiles')}
    if(typeof answers.trainMiles === 'undefined' ) { missingFields.push('trainMiles')}
    if(typeof answers.flyMiles === 'undefined' ) { missingFields.push('flyMiles')}
    if(typeof answers.pets === 'undefined' ) { missingFields.push('pets')}
    if(typeof answers.stuffAmount === 'undefined' ) { missingFields.push('stuffAmount')}
    if(typeof answers.furnitureAmount === 'undefined' ) { missingFields.push('furnitureAmount')}
    if(typeof answers.clothingProfile === 'undefined' ) { missingFields.push('clothingProfile')}
    if(typeof answers.state === 'undefined' ) { missingFields.push('state')}
    return missingFields;
}

export default answers => {
    const results = {};
    const missingFields = getMissingFields(answers);
    if(missingFields.length > 0) {
        return {
            error: true,
            message: `Missing the following fields: [${missingFields}]`
        }
    }
    
    results.food = getFoodResults(answers);
    results.home = getHomeResults(answers);
    results.homeActivities = getHomeActivitiesResults(answers);
    results.heating = getHomeHeatingResults(answers);
    results.cooling = getHomeCoolingResults(answers);
    results.transportation = getTransportationResults(answers);
    results.pets = getPetsResults(answers);
    results.stuff = getStuff(answers);
    results.monthlyCo2 = sumMonthlyCo2(results);
    return {
        error: false,
        body: results
    }
}


// Example payload
/*
{
  "userZip": 95130,
  "calories": 2000,
  "beef": "Once a week",
  "chicken": "Once a week",
  "pork": "Once a week",
  "seafood": "Once a week",
  "dairy": "Once a day",
  "cheese": "Once a day",
  "vegetables": "Once a day",
  "fruit": "Once a day",
  "grain": "Few times per day",
  "junkFood": "Once a day",
  "homeType": "House",
  "homeSqft": 2500,
  "homeMaterial": "Wood",
  "numHousemates": "0",
  "hoursHome": 6,
  "hoursTv": 4,
  "hoursComputer": "0",
  "cookAtHomeFrequency": "2-3 times per week",
  "doesShowerDaily": false,
  "doesMusicAtHome": false,
  "laundryLoads": "0",
  "insulationType": "Reasonably Insulated",
  "summerTemp": "80",
  "coolingType": "Window Mount AC",
  "coolWholeHouse": "Entire home",
  "usesPersonalFan": false,
  "winterTemp": "70",
  "heatType": "Gas Vents",
  "heatWholeHome": "Entire home",
  "usesPersonalHeater": false,
  "houseSqft": 2500,
  "doesDrive": true,
  "carClass": "Midsize car",
  "carBuildType": "Standard",
  "carMpg": 25,
  "carMilesMonth": 1000,
  "carFuelType": "Gasoline",
  "carpoolFrequency": "Never",
  "doesPublicTransit": false,
  "busMiles": 0,
  "trainMiles": 0,
  "flyMiles": 0,
  "pets": ['Cat'],
  "stuffAmount": "Reasonably full",
  "furnitureAmount": "I have all of the essentials",
  "clothingProfile": "A good amount",
  "state": "CA"
}
  */
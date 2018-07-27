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

const getFood = answers => getFoodResults(answers);

const getHome = answers => getHomeResults(answers);

const getHomeActivities = answers => getHomeActivitiesResults(answers);

const getHeating = answers => getHomeHeatingResults(answers);

const getCooling = answers => getHomeCoolingResults(answers);

const getTransportation = answers => getTransportationResults(answers);


// TODO update so this takes in a deconstructed object like everywhere else
const getPet = answers => getPetsResults(answers);

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

export default answers => {
    const results = {};
    results.food = getFood(answers);
    results.home = getHome(answers);
    results.homeActivities = getHomeActivities(answers);
    results.heating = getHeating(answers);
    results.cooling = getCooling(answers);
    results.transportation = getTransportation(answers);
    results.pets = getPet(answers);
    results.stuff = getStuff(answers);
    results.monthlyCo2 = sumMonthlyCo2(results);
    console.log(results);
    return results;
}
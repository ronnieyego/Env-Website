import ids from '../../utils/ids/index';
import amounts from '../../data/how-much-co2/index';

// If its a simple value then its listed here.
// I am trying to move things that take calculations to the data folder.  The id is the mapping
// This way if I update any of the costs, I get it for free here.
// This is a WIP.  Most things are hardcoded here.

export default [
    {
        id: ids.watchTvOneHour,
        name: 'Watching TV for an hour',
        description: 'Most TVs use about 0.2 kWs.  The US emits 1.456 pounds of CO2 per kWh on average.',
        amount: 0.029
    },
    {
        id: ids.chargeIpad,
        name: 'Charging your iPad once',
        description: 'It takes 0.06 kWhs to charge an iPad.  The US emits 1.456 pounds of CO2 per kWh on average.',
        source: 'https://www.forbes.com/pictures/ekhf45ffjkj/ipad-150-per-year/#7728644cb9ea',
        amount: 0.09
    },
    {
        id: ids.poundOfSteel,
        name: 'One pound of steel',
        description: 'Most of this comes from melting iron ore in a blast furnace (over 1000 C).',
        source: '/costs/steel',
        amount: amounts[ids.poundOfSteel]
    },
    {
        id: ids.oneShirt,
        name: 'One cotton shirt',
        description: 'This assumes the cotton is grown conventionally in the US and is not dyed.',
        source: '/costs/clothes',
        amount: amounts[ids.oneShirt]
    },
    {
        id: ids.oneJacket,
        name: 'One leather jacket',
        description: 'Emissions can vary widely by material.  Cows are carbon intesive.',
        source: '/costs/clothes',
        amount: amounts[ids.oneJacket]
    },
    {
        id: ids.oneJean,
        name: 'One pair of demin jeans',
        description: 'Demin is one of the most carbon intensive fabrics, but a very sturdy one.',
        source: '/costs/clothes',
        amount: amounts[ids.oneJean]
    },
    {
        id: ids.oneShort,
        name: 'One pair of shorts',
        description: '',
        source: '/costs/clothes',
        amount: amounts[ids.oneShort]
    },
    {
        id: ids.onePairOfBoots,
        name: 'One pair of leather boots',
        description: 'Leather is one of the most carbon intensive fabrics.',
        source: '/costs/clothes',
        amount: amounts[ids.onePairOfBoots]
    },
    {
        id: ids.onePairOfSneakers,
        name: 'One pair of sneakers.',
        description: 'Sneakers mix rubber with fabric.  The material\'s cost is low though they are labor intensive to make.',
        source: '/costs/clothes',
        amount: amounts[ids.onePairOfSneakers]
    },
    {
        id: ids.poundOfChicken,
        name: 'One pound of chicken',
        description: 'This is a combination of feed, manure, and processing.',
        amount: 5
    },
    {
        id: ids.poundOfPork,
        name: 'One pound of pork',
        description: 'This is a combination of feed, manure, and processing.',
        amount: 6.1
    },
    {
        id: ids.poundOfAluminum,
        name: 'One pound of aluminum',
        description: 'Making aluminum is very energy intensive at about 6 kWh per pound.  Emissions vary widely by energy source used.',
        source: '/costs/aluminum',
        amount: amounts[ids.poundOfAluminum]
    },
    {
        id: ids.largeCampfire,
        name: 'A large campfire',
        description: 'An average campfire burning ~20 pounds of wood',
        source: 'https://www.reddit.com/r/askscience/comments/h5tuq/how_much_carbon_dioxide_does_a_standard_campfire/?st=jef7sh2f&sh=7073ed92',
        amount: 20
    },
    {
        id: ids.thanksgivingDinner,
        name: 'Thanksgiving dinner for 10',
        description: 'This includes a 15 pound turkey, plenty of sides, and a hearty dessert.',
        amount: amounts[ids.thanksgivingDinner]
    },
    {
        id: ids.twelveOzSteak,
        name: 'A 12 oz steak',
        description: 'This is a mostly due to cow flatulence.',
        source: '/costs/steak',
        amount: 20
    },
    {
        id: ids.poundOfBeef ,
        name: 'One pound of beef',
        description: 'This is a mostly due to cow flatulence.',
        amount: 28
    },
    {
        id: ids.petHamster,
        name: 'A hamster',
        description: 'A vegetarian hamster will live for 3 years.',
        source: '/costs/hamster',
        amount: amounts[ids.petHamster]
    },
    {
        id: ids.treeSequester,
        name: 'Tree sequestering',
        description: 'This is how much CO2 a tree absorbs each year.',
        source: 'http://www.americanforests.org/explore-forests/forest-facts/',
        amount: 48
    },
    {
        id: ids.oneHundredTeaCandles,
        name: 'Using 100 tea candles',
        description: 'Each tea candle is 50g and is about 1in radius and 1in tall.',
        source: 'http://www.michaelsmithnews.com/2014/03/the-chemistry-of-earth-hour-1-candle-x-1-hour-8-x-the-co2-from-1-lightbulb-x-1-hour.html',
        amount: 69
    },
    {
        id: ids.kobeBeefSteak,
        name: 'An 8 oz kobe beef steak',
        description: 'One of the finest steaks in the world.',
        source: '/costs/steak',
        amount: 74
    },
    {
        id: ids.smallBbq ,
        name: 'Small BBQ',
        description: 'Most of this come from growing 6 pounds of meat (2 beef, 2 pork, 2 chicken).  ~20 pounds comes from fuel for the grill itself.',
        source: '/costs/bbq',
        amount: 100
    },
    {
        id: ids.ipad,
        name: 'An iPad',
        description: 'This includes materials, transportation, use, and disposal',
        source: '/costs/ipad',
        amount: 297
    },
    {
        id: ids.oneBookcase ,
        name: 'One bookcase' ,
        description: 'This is how much CO2 it takes to create a 7\' x 4\' bookcase of books',
        source: '/costs/books',
        amount: 400
    },
    {
        id: ids.exhalingOneYear ,
        name: 'Exhaling in one year',
        description: 'This is how much CO2 you inhale and exhale in one year.',
        source: 'http://www.slate.com/articles/news_and_politics/explainer/2009/08/7_billion_carbon_sinks.html',
        amount: 828
    },
    {
        id: ids.burnOilDrum ,
        name: 'Burning an oil drum',
        description: 'This is how much CO2 will be released if you burn a drum full of oil',
        amount: 880
    },
    {
        id: ids.burnTable ,
        name: 'Burning a table',
        description: 'This is how much CO2 will be released if you burned your dining room rable',
        amount: 1000
    },
    {
        id: ids.burnTubGasoline ,
        name: 'Burning a tub of gasoline',
        description: 'This is how much CO2 you\'d emit if you filled your bathtub with gasoline and lit it on fire',
        amount: 1568
    },
    {
        id: ids.flyAcrossAmerica ,
        name: 'Flying across America',
        description: 'This is how much a full 747 emits on a flight from LA to NY',
        amount: 2500 
    },
    {
        id: ids.petSmallDog ,
        name: 'Small dog',
        description: 'This is the lifetime CO2 of a small dog.  Most of it comes from a dog\'s food.',
        source: '/costs/dog',
        amount: amounts[ids.petSmallDog]
    },
    {
        id: ids.bigScreenTV ,
        name: 'Big Screen TV',
        description: 'This is watching an 80" TV for 8 years (average tv lifespan).  1,000 pounds come from manufacturing and transportation.',
        source: '/costs/tv',
        amount: 6850
    },
    {
        id: ids.petDog ,
        name: 'A dog',
        description: 'This is the lifetime CO2 of a mid-sized dog.  Most of it comes from a dog\'s food.',
        source: '/costs/dog',
        amount: amounts[ids.petDog]
    },
    {
        id: ids.driveTenThousandMiles ,
        name: 'Driving ten thousand miles',
        description: 'This is how much CO2 you\'ll release if you drive 10,000 miles in a car with 25mpg',
        amount: 8000
    },
    {
        id: ids.petCat ,
        name: 'A cat',
        description: 'This is the lifetime CO2 of a cat.  Most of it comes from a cat\'s food which is 95% meat.',
        source: '/costs/cat',
        amount: amounts[ids.petCat]
    },
    {
        id: ids.powerTwitterOneHour ,
        name: 'Powering Twitter for an hour',
        description: 'Twitter\'s servers use about 8MW of energy in Georgia.  GA utilities release 1.16 pounds of CO2 per kwh',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 9280
    },
    {
        id: ids.petTurtle ,
        name: 'A turtle',
        description: 'Pet turtles live for ~40 years.  Most of the CO2 comes from electricity for its tank.',
        source: '/costs/turtle',
        amount: amounts[ids.petTurtle]
    },
    {
        id: ids.cementDriveway ,
        name: 'Making a cement driveway',
        description: 'A standard 600 sqft driveway weighs almost 40,000 pounds of CO2 intensive concrete.',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 17512
    },
    {
        id: ids.petBigDog ,
        name: 'Big dog',
        description: 'This is the lifetime CO2 of a large dog.  Most of it comes from a dog\'s food.',
        source: '/costs/dog',
        amount: amounts[ids.petBigDog]
    },
    {
        id: ids.raiseOneCow ,
        name: 'Raising one cow',
        description: 'An average cow weighs 1,500 pounds and produces ~4,500 servings of meat.',
        amount: 19000
    },
    {
        id: ids.oneAcreForestSequester ,
        name: '1 acre of forest sequestering',
        description: 'One acre of mature oak trees will absorb this much CO2 each year',
        source: 'http://www.nytimes.com/2012/12/04/science/how-many-pounds-of-carbon-dioxide-does-our-forest-absorb.html',
        amount: 30000
    },
    {
        id: ids.midsizeCarCreation ,
        name: 'Building a midsized car',
        description: 'This comes from extracting the materials and assembling them in a factory. ',
        source: '/costs/car',
        amount: 32000
    },
    {
        id: ids.largeTruckCreation ,
        name: 'Building a large truck',
        description: 'This comes from extracting the materials and assembling them in a factory. ',
        source: '/costs/car',
        amount: 50000
    },
    {
        id: ids.twoBedroomApartment ,
        name: '2 Bedroom apartment',
        description: 'This is the building cost for a 1,000 square foot apartment.',
        source: '/costs/apartment',
        amount: 90000
    },
    {
        id: ids.burnHouse ,
        name: 'Burning down a house',
        description: 'This is a "standard" 2 story house made of wood',
        amount: 120000
    },
    {
        id: ids.showerEveryDay ,
        name: 'Showering every day',
        description: '15 minute shower every day for 80 years.  Varies largely by state',
        amount: 130000
    },
    {
        id: ids.acreOfForest ,
        name: '1 acre of forest',
        description: 'Total amount of CO2 stored in 1 acre of mature forest',
        source: 'http://www.arborenvironmentalalliance.com/carbon-tree-facts.asp',
        amount: 220462
    },
    {
        id: ids.powerGoogleOneHour ,
        name: 'Powering Google for an hour',
        description: 'Google uses 220 Mega Watts to power its servers.  This is the CO2 utilities emit to sustain them for 1 hour.',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 320000
    },
    {
        id: ids.buildSuburbanHome ,
        name: 'Suburban home',
        description: 'The building cost for a large suburb home',
        source: '/costs/home',
        amount: 400000
    },
    {
        id: ids.spaceLaunch ,
        name: 'A space launch',
        description: 'A Falcon 9 from SpaceX will burn 262,570 pounds of rocket propellant',
        source: 'https://space.stackexchange.com/questions/13082/calculate-falcon-9-co2-emissions',
        amount: 440000
    },
    {
        id: ids.generalSherman ,
        name: 'General Sherman',
        description: 'General Sherman, the world\'s largest tree (by volume) weighs an estimated 1.5 Million pounds and holds a ton of carbon.',
        source: 'https://www.dewharvest.com/carbon-dioxide-stored-by-general-sherman-giant-sequoia.html',
        amount: 3172213
    },
    {
        id: ids.oneMileRoad ,
        name: 'One mile of road',
        description: 'This come from the concrete and asphalt used to pave a standard 2 lane road (24\' wide).',
        source: '',
        amount: amounts[ids.oneMileRoad]
    },
    {
        id: ids.allUsRoads ,
        name: 'All paved roads in the US',
        description: 'The US has about 3 million miles of paved road (1 million unpaved).',
        source: '',
        amount: amounts[ids.allUsRoads]
    },
    {
        id: ids.oneMileHighway ,
        name: 'One mile of highway',
        description: 'The US has about 45,000 miles of highway.  Each is about 78 feet wide.',
        source: '',
        amount: amounts[ids.oneMileHighway]
    },
    {
        id: ids.hpFootprintYear,
        name: 'Running Hewlett Packard\'s (HP) in 2016',
        description: '45% came from creating products, 53% is from using and disposing products, and 2% comes from operations',
        source: 'http://www8.hp.com/us/en/hp-information/environment/footprint.html',
        amount: 79903680920
    },
    {
        id: ids.cementIndustryOneYear ,
        name: 'Cement industry in 1 Year',
        description: 'Gloabal cement emissions.  This industry alone contributes 3.4% to all CO2 emissions.',
        source: 'https://www3.epa.gov/ttnchie1/conference/ei13/ghg/hanle.pdf',
        amount: 1827632154000
    },
];
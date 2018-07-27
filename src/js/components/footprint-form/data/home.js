// Rooms by house size


// I looked at several house layouts and it tends to average out
    // https://www.houseplans.net/floorplans/850400009/mountain-rustic-plan-2379-square-feet-3-bedrooms-2.5-bathrooms
// Dining rooms tended to be larger while bedrooms were smaller
export const averageRoomSize = 200;


//  http://www.siliconvalleypower.com/for-residents/save-energy/appliance-energy-use-chart
export const applianceKwhPerHour = { //Units are kwh per hour
    speakers: 0.05,
    tv: 0.48,
    light: 0.06,
    energyEfficientLights: 0.01,
    gameConsole: 0.15,
    laptopComputer: 0.04,
    desktopComputer: 0.15,
    oven: 2.3,
    stoveTop: 1.25,
    
    toastOven: 0.75,
    coffeeMaker: 0.12
};

export const applianceKwhPerDay = {
    refrigerator: 7.17,
    energyEfficientRefrigerator: 2.3
};

export const applianceKwhPerUse = {
    laundry: 4,
    shower: 3.2,
};

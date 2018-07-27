
// From google searching how much for [X] weigh
// Also http://www.ewtaz.com/images/uploads/average-weight-furniture-2.pdf
export const furnitureWeights = {
    sofa: 170,
    diningTable: 140,
    diningChair: 25,
    cushyChair: 85,
    desk: 75,
    bookcase: 75,
    smallTable: 50,
    coffeeTable: 25,
    cabinet: 125,
    bed: 200,
    dresser: 100,
    toilet: 55,
    fridge: 200,
    oven: 125
};

export const roomWeights = {
    kitchen: 575,  // 2 cabinets, 1 fridge, 1 oven
    diningRoom:  415,  // 1 table, 6 chairs, 1 cabinet,
    livingRoom: 515,  // 2 coffeeTable, 1 smallTable, 1 sofa, 2 cushyChairs, 1 bookcase,
    bedroom: 475,  // 1 bed, 1 dresser, 1 desk, 1 chair, 1 bookcase
    bathroom: 180 ,  // 1 cabinet, 1 toilet,
    otherRooms: 325,  // 1 desk, 1 chair, 3 bookcases
}

// Average of above
export const furnitureWeightPerRoom = 415;
// From google sheet furniture
export const co2PerFurniturePound = 1.44;

// based on couch
// http://www.startribune.com/sofas-how-old-is-too-old/177662441/
export const furnitureLife = 8;


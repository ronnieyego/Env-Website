const DB_MAPPING = {
    distanceMiles: 'distance_miles',
    postalCode: 'postal_code',
    footprintId: 'footprint_id',
    monthyCo2: 'monthly_co2',
    questionName: 'question_name',
    questionId: 'question_id',
    plantId: 'plant_id',
    plantName: 'plant_name',
    entityId: 'entity_id',
    entityName: 'entity_name',
    utilityName: 'utility_name',
    plantCapacity: 'plant_capacity',
    naturalGas: 'natural_gas',
    nameplateCapaacity: 'nameplate_capacity',
    plantType: 'plant_type',
    primaryFuel: 'primary_fuel',

};

export default row => {
    if(!row) {
        console.log('Warning: No row returned from the DB');
        return {};
    }
    Object.keys(DB_MAPPING).forEach(mapping => {
        if(row.hasOwnProperty([DB_MAPPING[mapping]])) { // hasOwnProperty to protect against falsey values
            row[mapping] = row[DB_MAPPING[mapping]];
            delete row[DB_MAPPING[mapping]]
        }
    });
    return row;
}
import energyDao from '../daos/energy-source-dao';
import zipDao from '../daos/zip-dao';
import MAP_DB from '../daos/map-db';


export const getNearestEnergySourcesByZipAndDistance = async(req, res) => {
    const { zipCode, distance, onlyUtility } = req.body;
    if(!zipCode) {
        console.log('[ERROR] -  zip code required to find basic zip data.  Zip: ', zipCode);
        return res.status(200).send({ error: true, message: `Invalid input for zip code: ${zipCode}`});
    }
    if(!distance || typeof distance != 'number') {
        console.log('[ERROR] -  distance required to find power plants.  Zip: ', distance);
        return res.status(200).send({ error: true, message: `Invalid input for distance: ${distance}`});
    }
    const zipDataResults = await zipDao.getZipByCode(zipCode)
        .catch(e => ({ error: true, message: `There was an uncaught error getting zip data for zipCode ${zipCode}.  Error: ${e}.`}))
    if(zipDataResults.error) {
        console.log(`[ERROR] - ${zipDataResults.message}`)
        return res.status(200).send(zipDataResults);
    }

    const { lat, long } = zipDataResults.results;

    if(!lat || !long) {
        return res.status(200).send({ error: true, message: `No lat/long for zipCode ${zipCode}.`});
    }
    const powerPlantsResults  = await energyDao.getEnergySourcesWithinDistance({ lat, long, distance, onlyUtility })
        .catch(e => ({ error: true, message: `There was an uncaught error getting power plant data for lat/long ${lat}/${long} and distance ${distance}.  Error: ${e}.`}))

    if(powerPlantsResults.error) {
        console.log(`[ERROR] - ${powerPlantsResults.message}`)
    }
    return res.status(200).send(powerPlantsResults);
};

export const getAllEnergySources = async(req, res) => {
    const getAllEnergySources = await energyDao.getAllEnergySources()
        .then(sourcesResults => sourcesResults.results.map(source => MAP_DB(source)))
        .catch(e => ({ error: true, message: `There was an uncaught error getting energySourcesResults.  Error: ${e}.`}))
    if(getAllEnergySources.error) {
        console.log(`[ERROR] - ${getAllEnergySources.message}`)
    }
    return res.status(200).send(getAllEnergySources);
};
import energyDao from '../daos/energy-source-dao';
import zipDao from '../daos/zip-dao';


export const getNearestEnergySourcesByZipAndDistance = async(req, res) => {
    const { zipCode, distance } = req.body;
    if(!zipCode || typeof zipCode != 'number') {
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
    const powerPlantsResults  = await energyDao.getEnergySourcesWithinDistance({ lat, long, distance})
        .catch(e => ({ error: true, message: `There was an uncaught error getting power plant data for lat/long ${lat}/${long} and distance ${distance}.  Error: ${e}.`}))

    if(powerPlantsResults.error) {
        console.log(`[ERROR] - ${powerPlantsResults.message}`)
    }
    return res.status(200).send(powerPlantsResults);
}
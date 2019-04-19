import zipDao from '../daos/zip-dao';


export const getTemperatureDataForZip = async(req, res) => {
    const { zipCode } = req.params;
    if(!zipCode || zipCode.length !== 5) {
        console.log('[ERROR] -  zip code required to find basic zip data.  Zip: ', zipCode);
        return res.status(200).send({ error: true, message: `Invalid input for zip code: ${zipCode}`});
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
    const temperatureResults  = await zipDao.getNearesTemperatureData({ lat, long })
        .catch(e => ({ error: true, message: `There was an uncaught error getting temperature data for lat/long ${lat}/${long}.  Error: ${e}.`}))

    if(temperatureResults.error) {
        console.log(`[ERROR] - ${temperatureResults.message}`)
    }
    return res.status(200).send(temperatureResults);
}
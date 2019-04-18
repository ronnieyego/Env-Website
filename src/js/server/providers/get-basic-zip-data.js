import BASIC_ZIP_DATA  from '../../../../db/db-scripts/data/formatted/basic-zip-data.json';
import zipDao from '../daos/zip-dao';

const ALL_ZIP_CODES = Object.keys(BASIC_ZIP_DATA);

export default inputZip => {
    if(!inputZip) {
        console.log('ERROR --  zip code required to find basic zip data', inputZip);
        return -1;
    }
    const zip = inputZip.toString();
    if(!BASIC_ZIP_DATA[zip]) {
        console.log('ERROR --  could not find this zip code', inputZip);
        return -1;
    }
    return BASIC_ZIP_DATA[zip];
}

export const findZipByCode = async(req, res) => {
    const zipCode = req.params.zipCode;
    if(!zipCode || zipCode.length !== 5) {
        console.log('[ERROR] -  zip code required to find basic zip data.  Zip: ', zipCode);
        return res.status(200).send({ error: true, message: `Invalid input for zip code: ${zipCode}`});
    }
    const zipData = await zipDao.getZipByCode(zipCode)
        .catch(e => ({ error: true, message: `There was an uncaught error getting zip data for zipCode ${zipCode}.  Error: ${e}.`}))
    if(zipData.error) {
        console.log(`[ERROR] - ${zipData.message}`)
    }
    return res.status(200).send(zipData);
}
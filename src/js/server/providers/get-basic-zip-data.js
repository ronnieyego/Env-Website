import BASIC_ZIP_DATA  from '../../../../db/db-scripts/data/formatted/basic-zip-data.json';
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
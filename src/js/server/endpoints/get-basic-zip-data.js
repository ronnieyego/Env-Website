import ZIP_COORD_DATA from '../../data/zip-codes/all-zips-and-lat-long.json';

export default inputZip => {
    if(!ZIP_COORD_DATA[inputZip]) {
        console.log('ERROR --  could not find this zip code', inputZip);
        return -1;
    }
}
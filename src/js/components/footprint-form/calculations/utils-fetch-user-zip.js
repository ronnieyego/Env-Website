import 'isomorphic-fetch';
import getEnv from '../../../utils/get-env';
import stateTemps from '../data/average-temp-by-state';

export const fetchUserZipDataFromZip = zip => {
    const env = getEnv();
    return fetch(`${env.baseUrl}/api/get-nearest-zip-code-temperature-data/${zip}`)
        .then(res => res.json())
        .then(zipData => {
            if(zipData.error) {
                console.log('Failed to fetch zip data for zip', zip, ' Message: ', zipData.message);
                return null;
            }
            return zipData;
        })
        .catch(() => {
            console.log('Failed to fetch zip data for zip', zip);
            return null;
        });
};

export const getDifferenceInTemp = async({userZip, userZipData, state, summerTemp, winterTemp}) => {
    if(userZip && !userZipData) {
        console.log('fetching userZipData from zipcode', userZip);
        userZipData = await fetchUserZipDataFromZip(userZip);
    }
    if(!userZipData) {
        console.log(`WARNING -- Expected to find zip temperature data for zipData: ${userZipData} or userZip: ${userZip}`);
        console.log('Using state data instead');
        const stateTempWinter = stateTemps[state].winter;
        const stateTempSummer = stateTemps[state].summer;
        const summer = stateTempSummer > summerTemp ? 0 : Math.round(Math.abs(summerTemp - stateTempSummer));
        const winter = stateTempWinter > winterTemp ? 0 : Math.round(Math.abs(winterTemp - stateTempWinter));
        return { summer, winter };
    }
    const zipTempWinter = userZipData.winter;
    const zipTempSummer = userZipData.summer;
    const summer = zipTempSummer > summerTemp ? 0 : Math.round(Math.abs(summerTemp - zipTempSummer));
    const winter = zipTempWinter > winterTemp ? 0 : Math.round(Math.abs(winterTemp - zipTempWinter));
    return { summer, winter };
}